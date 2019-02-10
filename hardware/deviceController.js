const Switch = require('./switch')
// const Lock = require('./lock')
// const Thermostat = require('./thermostat')

let devices = {};
let deviceClasses = {
    switch: Switch,
    // lock: Lock,
    // thermostat: Thermostat
}

module.exports = {
    addDevice: function(id, type) {
        devices[id] = new deviceClasses[type](id, type)
        devices[id].triggerRefresh()
    },
    getDevice: function(id) {
        return devices[id]
    },
    exists: function(id) {
        return !!devices[id]
    }
}