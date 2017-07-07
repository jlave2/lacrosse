import Chart from 'chart.js'

export default class Plot {
  constructor (data) {
    this.data = data
    this.timeFormat = 'M/D/YYYY h:mm A'
    this.color = Chart.helpers.color
    this.chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(0, 128, 0)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
    }
    this.options = {
      type: 'line',
      data: {
        labels: this.data.dates,
        datasets: [
          {
            label: 'Ambient temperature',
            backgroundColor: this.color(this.chartColors.red).alpha(0.5).rgbString(),
            borderColor: this.chartColors.red,
            fill: false,
            yAxisID: 'temp-axis',
            data: this.data.ambientTemps
          },
          {
            label: 'Probe temperature',
            backgroundColor: this.color(this.chartColors.blue).alpha(0.5).rgbString(),
            borderColor: this.chartColors.blue,
            fill: false,
            yAxisID: 'temp-axis',
            data: this.data.probeTemps
          },
          {
            label: 'Humidity',
            backgroundColor: this.color(this.chartColors.green).alpha(0.5).rgbString(),
            borderColor: this.chartColors.green,
            fill: false,
            yAxisID: 'humid-axis',
            data: this.data.humidities
          }
        ]
      },
      options: {
        title: {
          text: 'Sensor Data'
        },
        tooltips: {
          mode: 'label'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              format: this.timeFormat,
              tooltipFormat: this.timeFormat
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

    return this
  }

  draw (id) {
    return new Chart(id, this.options)
  }

  updateData (data) {
    this.data = data
    return null
  }
}
