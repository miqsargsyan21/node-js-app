const dotenv = require('dotenv')
const http = require('http')
const handleRoutes = require('./routes/index')

let {
    HOST: host,
    PORT: port
} = dotenv.config().parsed
host += 0
port += 0

const server = http.createServer((req, res) => {
    handleRoutes(req, res)
})

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`)
})