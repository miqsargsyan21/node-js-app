const {deleteItem} = require('../controllers/deleterControllers')
const Router = require('../services/RouteService')

const router = new Router()

router.delete('/delete/:id', deleteItem)

module.exports = router