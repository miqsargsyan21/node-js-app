const {getAll, getById} = require('./../controllers/getterControllers')

function getterRoutes (url, res) {
    if (url === '/get') {
        getAll(res)
    } else {
        const id = Number(url.split('/')[2])

        getById(id, res)
    }
}

module.exports = getterRoutes