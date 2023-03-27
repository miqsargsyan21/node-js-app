const fs = require('fs')

function writeDataToFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject({
                    statusCode: 400,
                    data: err,
                })
            } else {
                resolve({
                    statusCode: 200,
                    data: {message: 'Done successfully'},
                })
            }
        })
    })
}

module.exports = writeDataToFile