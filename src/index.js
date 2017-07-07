import moment from 'moment'
import Store from './store'
import Plot from './plot'
// import { processData } from './api'

let store = new Store()
let plot = null

store.onLoaded(data => {
  plot = new Plot(data)
  plot.draw('sensor-plot')
})

store.update()
