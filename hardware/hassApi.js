const config = require('../config')
const url = require('url');
const request = require('request-promise');

if (!config.hass || !config.hass.baseUrl) {
    console.log('Improprer config! Cannot find config.hass.baseUrl')
    throw new Error('ConfigError')
}

const baseUrl = config.hass.baseUrl;

module.exports = {
    switch: {
        update: async (id, state) => {
            let headers = {}

            if (config.hass.password) {
                headers['x-ha-access'] = config.hass.password
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
    }
}
