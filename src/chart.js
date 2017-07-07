import { getObservations, processData } from './api'
import Chart from 'chart.js'

const timeFormat = 'M/D/YYYY h:mm A'
const color = Chart.helpers.color
const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(0, 128, 0)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
}

export async function drawChart () {
  let data = await getObservations()
  let processedData = processData(data)
  let config = {
    type: 'line',
    data: {
      labels: processedData.dates,
      datasets: [
        {
          label: 'Ambient temperature',
          backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
          borderColor: chartColors.red,
          fill: false,
          yAxisID: 'temp-axis',
          data: processedData.ambientTemps
        },
        {
          label: 'Probe temperature',
          backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
          borderColor: chartColors.blue,
          fill: false,
          yAxisID: 'temp-axis',
          data: processedData.probeTemps
        },
        {
          label: 'Humidity',
          backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
          borderColor: chartColors.green,
          fill: false,
          yAxisID: 'humid-axis',
          data: processedData.humidities
        }
      ]
    },
    options: {
      // elements: {
      //   point: {
      //     radius: 0
      //   }
      // },
      tooltips: {
        mode: 'label'
      },
      title: {
        text: 'Sensor Data'
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            format: timeFormat,
            // round: 'day',
            tooltipFormat: timeFormat
          },
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }],
        yAxes: [
          {
            position: 'left',
            'id': 'temp-axis',
            scaleLabel: {
              display: true,
              labelString: 'Temperature (°F)'
            }
          },
          {
            position: 'right',
            'id': 'humid-axis',
            scaleLabel: {
              display: true,
              labelString: 'Humidity (%)'
            }
          }
        ]
      }
    }
  }

  let myChart = new Chart('myChart', config)
}
