const readDataFromFile = require('../helpers/readDataFromFile')
const writeDataToFile = require('../helpers/writeDataToFile')

exports.updateItem = async (req, res) => {
    const {
        data,
        statusCode,
    } = await readDataFromFile('./data.json')

    if (statusCode === 400) {
        res.statusCode = statusCode
        res.setHeader("Content-Type", "application/json")
        res.end(data)
        return
    }

    const id = Number(req.url.split('/')[2])
    const parsedData = JSON.parse(data)
    const itemById = parsedData.filter(item => item.id === id)[0]

    if (!itemById) {
        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: 'There is no data with that id'}))
        return
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

    const {
        statusCode: statusCodeResponse,
        data: dataResponse,
    } = await writeDataToFile('./data.json', JSON.stringify(newData))

    res.statusCode = statusCodeResponse
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(dataResponse))
}