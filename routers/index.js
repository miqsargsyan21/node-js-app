const RouteService = require('../services/RouteService')
const {
    deleteItem,
    updateItem,
    addItem,
    getById,
    getAll
} = require("../controllers")

const Router = new RouteService()

Router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello, World!')
})

Router.delete('/delete/:id', deleteItem)
Router.put('/update/:id', updateItem)
Router.get('/get/:id', getById)
Router.post('/add', addItem)
Router.get('/get', getAll)

module.exports = Router