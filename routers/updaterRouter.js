const {updateItem} = require('./../controllers/updaterController')
const Router = require('./../services/RouteService')

const router = new Router()

router.put('/update', updateItem)

module.exports = router