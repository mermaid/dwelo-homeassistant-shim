 module.exports = {
    "port": "9090",
    "tailfile": "/home/dwelo/logs/api.log",
    "baseUrl": "localhost",

    // the device types needs to match the type of the hooks below, 'lock', 'switch', 'thermostat'
    //TODO: I can maybe just use APIs to find out what all devices are on the network
    "devices": {
        // "10": "lock",
        "11": "switch",
        "12": "switch",
        "13": "switch",
        // "14": "thermostat"
    },

    "dwelo": {
        "baseUrl": "http://localhost:5000",
        "publicBaseUrl": "http://localhost:9001/"
    },

    "hass": {
        "baseUrl": "http://192.168.11.27:8123"
    },

    "hooks": {
        "mirror": {
            "baseUrl": "localhost:8123/",
            "lock": {
                "state": ""
            },
            "switch": {
                "state": ""
            },
            "thermostat": {
                "state": ""
            }
        },

        "dwelo": {
            "baseUrl": "http://localhost:5000/device/${id}/",
            "lock": {
                "set": {
                    "lock": "command/door/lock/close/",
                    "unlock": "command/door/lock/open/"
                },
                "get": {
                    "status": "command/door/lock/open/"
                }
            },
            "switch": {
                "set": {
                    "off": "command/binary/off/",
                    "on": "command/binary/on/",
                },
                "get": {
                    "status": "command/binary/"
                }
            },
            "thermostat": {
                "set": {
                    "mode": "thermostat/mode/${mode}/",
                    "setpoint": "thermostat/setpoint/${mode}/${temperature}/"
                },
                "get": {
                    "setmode": "thermostat/mode/", //1 = heat, 2 = cool, 0 = off
                    // "humidity": "thermostat/humidity/",
                    "setpoint": "thermostat/setpoint/${mode}/",
                    "state": "thermostat/state/"
                }
                
            }
        }
        
    }
}