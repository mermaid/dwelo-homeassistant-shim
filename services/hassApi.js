const request = require('request-promise');
const url = require('url');
const YAML = require('json-to-pretty-yaml');
const deviceController = require('../hardware/deviceController');
const config = require('../config/config')

if (!config.hass || !config.hass.baseUrl) {
    console.log('Improprer config! Cannot find config.hass.baseUrl')
    throw new Error('ConfigError')
}

const baseUrl = config.hass.baseUrl;

module.exports = {
    switch: {
        update: async (id, state) => {
            let headers = {}

            if (config.hass.token) {
                headers['x-ha-access'] = config.hass.token
            }

            let switchState = state.switchOn == 'on' ? 'turn_on' : 'turn_off'

            console.log('switchState: ', switchState)
            try {
                return await request.post({
                    method: 'POST',
                    uri: url.resolve(baseUrl, `/api/services/switch/${switchState}`),
                    headers,
                    body: {entity_id: `switch.dwelo_${id}`},
                    json: true
                })
            } catch (err) {
                console.error(`failed to update switch ${id}`, err);
            }
        }
    },
    lock: {
        update: async (id, state) => {
            let headers = {}

            if (config.hass.token) {
                headers['x-ha-access'] = config.hass.token
            }

            let switchState = state.lock == '255' ? 'turn_on' : 'turn_off'

            console.log('lock: ', switchState)
            try {
                return await request.post({
                    method: 'POST',
                    uri: url.resolve(baseUrl, `/api/services/switch/${switchState}`),
                    headers,
                    body: {entity_id: `switch.dwelo_lock_${id}`},
                    json: true
                })
            } catch (err) {
                console.error(`failed to update lock ${id}`, err);
            }
        }
    },
    generateConfig: (devices) => {
        deviceConfig = {}

        for (let id of Object.keys(devices)) {
            let device = devices[id]
            if (device.type == 'switch') {
                if (!deviceConfig.switch) {
                    deviceConfig.switch = {
                        platform: 'command_line',
                        switches: {}
                    }
                }

                deviceConfig.switch.switches[`dwelo_${id}`] = {
                    command_on: `curl ${config.baseUrl}:${config.port}/dwelo-proxy/device/${id}/command/binary/on/`,
                    command_off: `curl ${config.baseUrl}:${config.port}/dwelo-proxy/device/${id}/command/binary/off/`,
                    friendly_name: device.name
                }
            }
            if (device.type == 'lock') {
                let switchLockId = `dwelo_lock_${id}`
                if (!deviceConfig.switch) {
                    deviceConfig.switch = {
                        platform: 'command_line',
                        switches: {}
                    }
                }

                if (!deviceConfig.customize) {
                    deviceConfig.customize = {}
                }

                deviceConfig.switch.switches[switchLockId] = {
                    command_on: `curl ${config.baseUrl}:${config.port}/dwelo-proxy/device/${id}/command/door/lock/close/`,
                    command_off: `curl ${config.baseUrl}:${config.port}/dwelo-proxy/device/${id}/command/door/lock/open/`,
                    friendly_name: device.name,
                }

                deviceConfig.customize[`switch.${switchLockId}`] = {
                    hidden: true,
                    homebridge_hidden: true
                }

                if (!deviceConfig.lock) {
                    deviceConfig.lock = [{
                        platform: 'template',
                        name: device.name,
                        value_template: `{{ is_state('switch.${switchLockId}', 'on') }}`,
                        lock: {
                            service: 'switch.turn_on',
                            data: {
                                'entity_id': `switch.${switchLockId}`
                            }
                        },
                        unlock: {
                            service: 'switch.turn_off',
                            data: {
                                'entity_id': `switch.${switchLockId}`
                            }
                        }
                    }]
                }
            }
        } 

        return YAML.stringify(deviceConfig)
    }
}
