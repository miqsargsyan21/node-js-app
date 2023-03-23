const getterRoutes = require('./getterRoutes')

function handleRoutes(req, res) {
    const {url, method} = req

    if (url.startsWith('/get') && method === 'GET') {
        getterRoutes(url, res)
    }
    
}

module.exports = handleRoutes