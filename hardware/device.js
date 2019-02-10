const _ = require('lodash')
const url = require('url')
const request = require('request-promise')
const config = require('../config')
const hass = require('./hassApi')
const Promise = require('bluebird')
const dweloBaseUrl = config.hooks.dwelo.baseUrl
const mirrorBaseUrl = config.hooks.mirror.baseUrl

module.exports = class Device {
    constructor(id, type, name) {
        this.id = id
        this.type = type
        this.name = name
        this.dweloHooks = config.hooks.dwelo[type]
        this.mirrorHooks = config.hooks.mirror[type]
        this.state = {};
        console.log(`creating device: ${type} ${id}`)
    }

    async triggerRefresh() {
        console.log(this.dweloHooks.get)

        let ret = []

        for (let requestType of Object.keys(this.dweloHooks.get)) {
            let base = dweloBaseUrl.replace(/\$\{id\}/g, this.id) 
            let path = this.dweloHooks.get[requestType].replace(/\$\{id\}/g, this.id)
            ret.push(request(url.resolve(base, path)))
        }

        return Promise.all(ret).catch(err => {
            console.error(`failed to trigger device refresh ${this.type} ${this.id}`, err);
        });
    }

    async setState(state) {
        let newState = this.parseDweloState(state)
        console.log('this.state: ', this.state);
        console.log('parsedState: ', newState);
        if (this.stateChanged(newState)) {
            //call hass to update
            // console.log('calling hass: ', newState);
            this.state = newState;
            console.log('calling update')
            return hass[this.type].update(this.id, newState);
        }

        // return await request(path.join(mirrorBaseUrl, path)).replaceAll('${id}', this.id)        
    }

    parseDweloState(state) {
        let newState = _.cloneDeep(this.state);
        newState[state.type] = state.value;
        return newState
    }

    stateChanged(newState) {
        return !_.isEqual(newState, this.state)
    }

    // parseDweloState(state) {
    //     throw Error('OverrideThis')
    // }
}