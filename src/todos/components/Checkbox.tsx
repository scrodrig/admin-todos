import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'

import React from 'react'
import { RiFolderUnknowFill } from 'react-icons/ri'
import { getIcon } from '@/activities/suggestions'

interface CheckboxProps {
  label: string
  value: boolean
  onChange: () => void
}

export const Checkbox = ({ label, value, onChange }: CheckboxProps) => {
  const icon = getIcon(label)
  return (
    <label className="gap-2">
      {/* <input type="checkbox" className="mr-2" checked={value} onChange={onChange} /> */}

      <div
        onClick={onChange}
        className={`flex p-2 rounded-me cursor-pointer hover:bg-opacity-60 ${
          value ? icon.tag : 'bg-gray-100'
        }`}>
        {value ? (
          <IoCheckboxOutline className="text-3xl text-green-500" />
        ) : (
          <IoSquareOutline className="text-3xl text-gray-500" />
        )}
        <span className="ml-2 flex items-center text-1xl">
          {icon.icon ? icon.icon : <RiFolderUnknowFill />}
        </span>
        <span className="ml-2 flex items-center text-1xl">{label}</span>
      </div>
    </label>
  )
}
