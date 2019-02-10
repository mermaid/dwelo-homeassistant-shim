(async function() {
    const config = require('./config')
    const deviceController = require('./hardware/deviceController')
    const hassApi = require('./hardware/hassApi')

    console.log(deviceController)
    
    await deviceController.fetchAllDevices()
    
    console.log('Here are the configs to enter into HomeAssistant:')
    console.log(hassApi.generateConfig(deviceController.getAllDevices()))
})();