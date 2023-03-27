const readDataFromFile = require("../helpers/readDataFromFile");
const writeDataToFile = require("../helpers/writeDataToFile");
exports.deleteItem = async (req, res) => {
    const {
        data: readData,
        statusCode: readStatusCode,
    } = await readDataFromFile('./data.json')

    if (readStatusCode === 400) {
        res.statusCode = readStatusCode
        res.setHeader("Content-Type", "application/json")
        res.end(readData)
        return
    }

    const id = Number(req.url.split('/')[2])

    if (!id) {
        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({message: 'There is no data with that id'}))
        return
    }

    const newData = JSON.parse(readData).map(item => item.id !== id ? item : null).filter(item => item !== null)

    const {
        statusCode: statusCodeResponse,
        data: dataResponse,
    } = await writeDataToFile('./data.json', JSON.stringify(newData))

    res.statusCode = statusCodeResponse
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(dataResponse))
}