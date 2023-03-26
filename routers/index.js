const RouteService = require('../services/RouteService')
const UpdaterRouter = require('./updaterRouter')
const DeleterRouter = require('./deleterRouter')
const GetterRouter = require('./getterRouter')
const AdderRouter = require('./adderRouter')

const Router = new RouteService()

Router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello, World!')
})

Router.use(UpdaterRouter)
Router.use(DeleterRouter)
Router.use(GetterRouter)
Router.use(AdderRouter)

module.exports = Router