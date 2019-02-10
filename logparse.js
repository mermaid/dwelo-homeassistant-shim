const config = require('./config')
const deviceController = require('./hardware/deviceController')
const Tail = require('tail').Tail

module.exports = () => {
    tail = new Tail(config.tailfile)
    let devices = config.devices
    let currentDevice = null
    const deviceNumberRegex = /Received Sensor Feedback for device (\d*)/
    const deviceDataRegex = /data: (\{.*\})$/
    
    tail.on("line", function(data) {
        let deviceNumber = data.match(deviceNumberRegex);
        let deviceData = data.match(deviceDataRegex);

        if (typeof currentDevice == 'number' && deviceData) {
            try {
                let dataString = deviceData[1].replace(/: u'/g, ': \'').replace(/: None,/g, ': null,')
                let data = eval(`(${dataString})`)
                console.log('received data: ', data)
                if (deviceController.exists(currentDevice)) {
                    console.log(`device ${currentDevice} does exist!`)
                    deviceController.getDevice(currentDevice).setState(data);
                }
            } catch(e) {
                console.log(e)
            } finally {
                console.log()
                currentDevice = null;
            }
        } else if (deviceNumber) {
            currentDevice = parseInt(deviceNumber[1]);
            console.log('current device: ', currentDevice)
        }
    })
     
    tail.on("error", function(error) {
        //todo: re-tail file
        console.log('error tailing file: ', error)
    })
}