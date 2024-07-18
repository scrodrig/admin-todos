'use client'

import { useState } from 'react'

interface TabBarProps {
  currentTab: number
  tabOptions?: number[]
}

export const TabBar = ({ tabOptions = [1, 2, 3, 4], currentTab = 1 }: TabBarProps) => {
  const [selected, setSelected] = useState(currentTab)

  const onTabSelected = (tab: number) => {
    setSelected(tab)
  }

  return (
    <div
      className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${
        'grid-cols-' + tabOptions.length
      }`}>
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            type="radio"
            id={tab.toString()}
            className="peer hidden"
            checked={selected === tab}
            onChange={() => {}}
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
            {tab}
          </label>
        </div>
      ))}
    </div>
  )
}
