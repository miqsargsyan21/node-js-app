const dotenv = require('dotenv')
const http = require('http')
const handleRoutes = require('./routes/index')

const {
    HOST: host,
    PORT: port
} = dotenv.config().parsed

const server = http.createServer((req, res) => {
    handleRoutes(req, res)
})

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`)
})