'use client'

import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'
import { useDonut } from '../hooks/useDonut'

interface DonutProps {
  done: number
  pending: number
}

export const Donut = ({ done, pending }: DonutProps) => {
  const { data, options } = useDonut()
  return (
    <div className="flex align-middle justify-center items-center">
      <div className="w-1/2">
        <Doughnut data={data(done, pending)} options={options()} />
      </div>
    </div>
  )
}
