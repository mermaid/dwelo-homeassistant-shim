 let _ = require('lodash')
 let localConfig = require('../local-config')
 
 module.exports = _.merge({
    "port": "9090",
    "baseUrl": "localhost", // baseURL used by others (hass) to hit you
    "tailfile": "/home/dwelo/logs/api.log",

    "services": {
        "local": "dwelo",
        "remote": "hass"
    },

    "hass": {
        "baseUrl": "http://dwelo-hub.local:8123",
        "token": ""
    },

    "dwelo": {
        "baseUrl": "http://localhost:5000",
        "publicBaseUrl": "http://localhost:9001",
        "urls": {
            "lock": {
                "set": {
                    "lock": "/device/${id}/command/door/lock/close/",
                    "unlock": "/device/${id}/command/door/lock/open/"
                },
                "get": {
                    "status": "/device/${id}/command/door/lock/open/"
                }
            },
            "switch": {
                "set": {
                    "off": "/device/${id}/command/binary/off/",
                    "on": "/device/${id}/command/binary/on/",
                },
                "get": {
                    "status": "/device/${id}/command/binary/"
                }
            },
            "thermostat": {
                "set": {
                    "mode": "/device/${id}/command/thermostat/mode/${mode}/",
                    "setpoint": "/device/${id}/command/thermostat/setpoint/${mode}/${temperature}/"
                },
                "get": {
                    "setmode": "/device/${id}/command/thermostat/mode/", //1 = heat, 2 = cool, 0 = off
                    // "humidity": "thermostat/humidity/",
                    "setpoint": "/device/${id}/command/thermostat/setpoint/${mode}/",
                    "state": "/device/${id}/command/thermostat/state/"
                }
                
            }
        }
    }
}, localConfig)
