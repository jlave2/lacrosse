import { EventEmitter } from 'events'
import config from '../config'

/* global fetch */

export default class Store {
  constructor () {
    // pull url from config file
    this.url = config.url
    this.emitter = new EventEmitter()
    this.data = {}
  }

  async update () {
    this.isUpdating = true
    let res = await fetch(this.url)
    let json = await res.json()
    let formattedData = this.format(json.device0.obs)
    this.setData(formattedData)
    this.emitter.emit('loaded', formattedData)
    return null
  }

  format (data) {
    let n = data.length
    let newData = {
      dates: [],
      ambientTemps: [],
      probeTemps: [],
      humidities: []
    }
    for (let i = 0; i < n; i += 50) {
      newData.dates.push(data[i].timestamp)
      newData.ambientTemps.push(data[i].ambient_temp)
      newData.probeTemps.push(data[i].probe_temp)
      newData.humidities.push(data[i].humidity)
    }
    return newData
  }

  getData () {
    return this.data
  }

  setData (data) {
    this.data = data
    return null
  }

  onLoaded (callback) {
    this.emitter.on('loaded', callback)
  }
}
