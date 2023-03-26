const {getAll, getById} = require('./../controllers/getterControllers')
const Router = require('./../services/RouteService')

const router = new Router()

router.get('/get', getAll)

router.get('/get/:id', getById)

module.exports = router