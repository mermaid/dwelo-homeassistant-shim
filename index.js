const app = require('express')()
const http = require('http')
const proxy = require('express-http-proxy')
const config = require('./config')
const deviceController = require('./hardware/deviceController')

app.get('/refresh-devices', (req, res) => {
    fetchState()
    res.status = 204
    res.send()
})

app.use('/dwelo-proxy', proxy(config.dwelo.baseUrl))

let fetchState = function() {
    let fetchAllDevicesInterval = setInterval(async function() {
        await deviceController.fetchAllDevices()
        clearInterval(fetchAllDevicesInterval)
    }, 20000)
}

http.createServer(app).listen(config.port || 9090)

require('./logparse')()
fetchState()
