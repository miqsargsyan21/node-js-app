const dotenv = require('dotenv')
const RouteService = require('./services/RouteService')
const HttpService = require('./services/HttpService')
const Router = require('./routers')
const {
    userAuth,
    userSecondAuth
} = require('./middlewares/index')

let {
    HOST: host,
    PORT: port
} = dotenv.config().parsed
port -= 0

const mainRouteService = new RouteService()
mainRouteService.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello, World!')
})
mainRouteService.use('/api', userAuth, userSecondAuth, Router)

HttpService.getInstance(mainRouteService)

HttpService.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`)
})

console.log(HttpService.routeService.routes)