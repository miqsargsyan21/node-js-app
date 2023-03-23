exports.getAll = function (res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({message: 'pppp'}))
}

exports.getById = function(id, res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({message: id}))
}