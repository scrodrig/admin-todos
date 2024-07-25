'use client'

import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'

const data = {
  type: 'doughnut',
  labels: ['Done', 'Pending'],
  datasets: [
    {
      label: 'Tasks',
      data: [0, 20],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 255, 132)'],
      borderColor: 'black',
      borderWidth: 1,
      hoverOffset: 4,
      cutout: '50%',
      radius: '100%',
    },
  ],
}

const options: any = {
  responsive: true,

  plugins: {
    title: {
      display: true,
      text: 'Completition rate',
      font: {
        size: 20,
      }
    },
    legend: {
      display: true,
      position: 'bottom',
      padding: 90,
      labels: {
        color: 'black',
        boxWidth: 20,
        padding: 30,
        boxHeight: 20,
      },
    },
  },
}

export const Donut = () => {
  return (
    <div className="flex align-middle justify-center items-center">
      <div className="w-1/2">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}
