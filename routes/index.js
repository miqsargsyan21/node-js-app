const updaterRoutes = require('./updaterRoutes')
const getterRoutes = require('./getterRoutes')
const adderRoutes = require('./adderRoutes')

function handleRoutes(req, res) {
    const {url, method} = req

    if (url === '/') {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: 'Hello'}))
    }

    if (url.startsWith('/get') && method === 'GET') {
        getterRoutes(url, res)
    }

    if (url.startsWith('/add') && method === 'POST') {
        adderRoutes(req, res)
    }

    if (url.startsWith('/update') && method === 'PUT') {
        updaterRoutes(req, res)
    }
}

module.exports = handleRoutes