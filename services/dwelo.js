const urls = {
    "lock": {
        "set": {
            "lock": "/device/${id}/command/door/lock/close/",
            "unlock": "/device/${id}/command/door/lock/open/"
        },
        "refresh": {
            "status": "/device/${id}/command/door/lock/"
        }
    },
    "switch": {
        "set": {
            "off": "/device/${id}/command/binary/off/",
            "on": "/device/${id}/command/binary/on/",
        },
        "refresh": {
            "status": "/device/${id}/command/binary/"
        }
    },
    "thermostat": {
        "set": {
            "mode": "/device/${id}/command/thermostat/mode/${mode}/",
            "setpoint": "/device/${id}/command/thermostat/setpoint/${mode}/${temperature}/"
        },
        "refresh": {
            "setmode": "/device/${id}/command/thermostat/mode/", //1 = heat, 2 = cool, 0 = off
            // "humidity": "thermostat/humidity/",
            "setpoint": "/device/${id}/command/thermostat/setpoint/${mode}/",
            "state": "/device/${id}/command/thermostat/state/"
        }
        
    }
}
const _ = require('lodash')
const request = require('request-promise')
const Promise = require('bluebird')
const config = require('../config/config')
const baseUrl = config.dwelo.baseUrl

module.exports = {
    refresh: async device => {
        let refresh = _.get(urls, `${device.type}.${refresh}`)
        let ret = []

        for(let key of Object.keys(refresh)) {
            ret.push(request(refresh[key]))
        }

        return await Promise.all(ret)
    }
}