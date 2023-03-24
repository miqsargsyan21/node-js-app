function adderRoutes (req, res) {
    const {url} = req
    const id = Number(url.split('/')[2])
    console.log({req})
    if (id) {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: id}))
        return
    }

    res.statusCode = 400
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({message: 'This route is not handled'}))
}

module.exports = adderRoutes