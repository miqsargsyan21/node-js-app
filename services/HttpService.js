const RouteService = require('./RouteService')
const http = require('http')
const url = require('url')

class HttpService {
    static instance = null
    static routeService = null

    static getInstance(routeService){
        if (!this.instance) {
            if (routeService && !(routeService instanceof RouteService)) {
                throw new Error('RouteService instance is required')
            }

            this.routeService = routeService
            this.instance = this.createServer()
            console.log({routeServiceIn: this.routeService.routes})
        }
        return this.instance
    }

    static createServer() {
        return http.createServer(this.#handleRequest.bind(this))
    }

    static listen(port, callback) {
        this.instance.listen(port, callback);
    }

    static #getRequestBody(req) {
        return new Promise((resolve, reject) => {
            try {
                let requestBody = ''
                req.on('data', chunk => {
                    requestBody += chunk.toString()
                })
                req.on('end', () => {
                    resolve(requestBody)
                })
            } catch (e) {
                reject(e)
            }
        })
    }

    static #next(middlewareList, handler, ...rest) {
        if (middlewareList.length) {
            middlewareList[0](...rest, () => {
                middlewareList.shift()
                this.#next(middlewareList, handler, ...rest)
            })
        } else {
            handler(...rest)
        }
    }

    static async #handleRequest(req, res) {
        const {method} = req
        let {pathname: path} = url.parse(req.url, true)
        let handler = null

        Object.keys(this.routeService.routes).forEach(key => {
            if (this.routeService.routes[key].regexp.test(path)) {
                handler = this.routeService.routes[key].handleRoute
                path = key
            }
        })

        if (handler && method === this.routeService.routes[path]?.method) {
            const requestBody = await this.#getRequestBody(req)

            const reqData = {
                ...req,
                body: JSON.parse(requestBody ? requestBody.toString() : '{}'),
            }

            if (this.routeService.routes[path].middlewareList.length) {
                this.#next(this.routeService.routes[path].middlewareList, handler, reqData, res)
            } else {
                handler(reqData, res)
            }
        } else {
            res.writeHead(404)
            res.end('Not Found')
        }
    }
}

module.exports = HttpService