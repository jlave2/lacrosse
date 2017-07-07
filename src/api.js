const url = 'http://decent-destiny-704.appspot.com/laxservices/device_info.php?deviceid=0001E529E85CCB26&limit=2016&timezone=2&metric=0'

/* eslint no-unused-vars: 0 */
/* global fetch */

export async function getObservations () {
  let res = await fetch(url)
  let json = await res.json()
  let obs = json.device0.obs
  return obs
}

export function processData (data) {
  let dates = []
  let ambientTemps = []
  let probeTemps = []
  let humidities = []
  let n = data.length
  for (let i = 0; i < data.length; i += 50) {
    dates.push(data[i].timestamp)
    ambientTemps.push(data[i].ambient_temp)
    probeTemps.push(data[i].probe_temp)
    humidities.push(data[i].humidity)
  }
  let processedData = {
    dates,
    ambientTemps,
    probeTemps,
    humidities
  }
  return processedData
}
