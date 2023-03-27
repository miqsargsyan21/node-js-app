const {addItem} = require('./../controllers/adderControllers')
const Router = require('./../services/RouteService')

const router = new Router()

router.post('/add', addItem)

module.exports = router