const request = require('request-promise')
const url = require('url')
const config = require('../config')
const Device = require('./device')
// const Thermostat = require('./thermostat')
const supportedDevices = ['switch']
let devices = {};

async function fetchAllDevices() {
    console.log(url.resolve(config.dwelo.publicBaseUrl, '/api/devices/'))
    let data = JSON.parse(await request(url.resolve(config.dwelo.publicBaseUrl, '/api/devices/')))
    
    if(data && data.devices) {
        data.devices.forEach(device => {
            if (supportedDevices.includes(device.deviceType)) {
                addDevice(device.localId, device.deviceType, device.givenName)
            }
        })
    } else {
        throw new Error()
    }
}
function addDevice(id, type, name) {
    console.log('addDevice: ', arguments)
    devices[id] = new Device(id, type, name)
    devices[id].triggerRefresh()
}
function getDevice(id) {
    return devices[id]
}
function getAllDevices() {
    return devices
}
function exists(id) {
    return !!devices[id]
}

module.exports = {
    fetchAllDevices,
    addDevice,
    getDevice,
    getAllDevices,
    exists
}