const readDataFromFile = require("../helpers/readDataFromFile")
const writeDataToFile = require("../helpers/writeDataToFile")

exports.addItem = async (req, res) => {
    try {
        const {
            body: {
                name,
                author
            }
        } = req

        let {
            data,
            statusCode
        } = await readDataFromFile('./data.json')

        if (statusCode === 400) {
            res.statusCode = statusCode
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(data))
            return
        }

        data = JSON.parse(data)

        const lastId = data[data.length - 1].id
        const newItem = {id: lastId + 1, name, author}
        data.push(newItem)

        const {
            statusCode: writeStatusCode,
            data: writeData
        } = await writeDataToFile('./data.json', JSON.stringify(data))

        res.statusCode = writeStatusCode
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(writeData))
    } catch (e) {
        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: e.message}))
    }
}