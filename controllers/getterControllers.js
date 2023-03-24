const fs = require('fs')

exports.getAll = function (res) {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({message: err}))
            return
        }
        const parsedData = JSON.parse(data)

        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: 'ok', data: parsedData}))
    })
}

exports.getById = function(id, res) {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({message: err}))
            return
        }
        const parsedData = JSON.parse(data)

        const itemById = parsedData.filter(item => item.id === id)[0]

        if (itemById) {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({message: 'ok', data: itemById}))
            return
        }

        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: 'There is no data with that id'}))
    })
}