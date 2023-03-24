function updaterRoutes (req, res) {
    const {url} = req
    const id = Number(url.split('/')[2])

    if (id) {
        console.log(id)
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: id}))
        return
    }

    res.statusCode = 400
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({message: 'This route is not handled'}))
}

module.exports = updaterRoutes