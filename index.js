const app = require('express')()
const proxy = require('express-http-proxy')
const config = require('./config')
const deviceController = require('./hardware/deviceController')

app.use('/dwelo-proxy', proxy(config.dwelo.baseUrl))

for(let id of Object.keys(config.devices)) {
    deviceController.addDevice(id, config.devices[id])
}

require('./logparse')();
