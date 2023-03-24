const {getAll, getById} = require('./../controllers/getterControllers')

function getterRoutes (url, res) {
    if (url === '/get') {
        getAll(res)
    } else {
        const id = Number(url.split('/')[2])

        if (id) {
            getById(id, res)
            return
        }

        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: 'This route is not handled'}))
    }
}

module.exports = getterRoutes