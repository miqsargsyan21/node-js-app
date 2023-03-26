const fs = require('fs')

function readDataFromFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject({
                    statusCode: 400,
                    data: err,
                })
            } else {
                resolve({
                    statusCode: 200,
                    data,
                })
            }
        })
    })
}

module.exports = readDataFromFile