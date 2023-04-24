const fs = require('fs').promises

exports.updateItem = async (req, res) => {
    try {
        const data = await fs.readFile('./data.json', 'utf8')
        const id = Number(req.url.split('/')[2])
        const parsedData = JSON.parse(data)
        const itemById = parsedData.filter(item => item.id === id)[0]

        if (!itemById) {
            throw new Error('There is no data with that id')
        }

        const newData = parsedData.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    ...req.body,
                }
            }

            return item
        })

        await fs.writeFile('./data.json', JSON.stringify(newData))

        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: 'Done successfully'}))
    } catch (e) {
        console.log(e)
        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: e.message}))
    }
}

exports.getAll = async (req, res) => {
    try {
        const data = await fs.readFile('./data.json', 'utf8')
        const parsedData = JSON.parse(data)

        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: 'ok', data: parsedData}))
    } catch (e) {
        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: e.message}))
    }
}

exports.getById = async (req, res) => {
    try {
        const id = Number(req.url.split('/')[2])

        const data = await fs.readFile('./data.json', 'utf8')
        const parsedData = JSON.parse(data)

        const itemById = parsedData.filter(item => item.id === id)[0]

        if (!itemById) {
            throw new Error('There is no data with that id')
        }

        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: 'ok', data: itemById}))
    } catch (e) {
        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: e.message}))
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const data = await fs.readFile('./data.json', 'utf8')
        const id = Number(req.url.split('/')[2])

        if (!id) {
            throw new Error('There is no data with that id')
        }

        const newData = JSON.parse(data).map(item => item.id !== id ? item : null).filter(item => item !== null)
        await fs.writeFile('./data.json', JSON.stringify(newData))

        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: 'Done successfully'}))
    } catch (e) {
        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: e.message}))
    }
}

exports.addItem = async (req, res) => {
    try {
        const {
            body: {
                name,
                author
            }
        } = req

        const data = await fs.readFile('./data.json', 'utf8')
        const modifiedData = JSON.parse(data)

        const lastId = modifiedData[modifiedData.length - 1].id
        const newItem = {id: lastId + 1, name, author}
        modifiedData.push(newItem)

        await fs.writeFile('./data.json', JSON.stringify(modifiedData))

        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: 'Done successfully'}))
    } catch (e) {
        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: e.message}))
    }
}