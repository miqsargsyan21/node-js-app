const HttpService = require('./services/HttpService')
const Router = require('./routers')
const dotenv = require('dotenv')

let {
    HOST: host,
    PORT: port
} = dotenv.config().parsed
host -= 0
port -= 0

HttpService.getInstance(Router)

HttpService.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`)
})

console.log(HttpService.routeService.routes)