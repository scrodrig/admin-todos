import { MdFamilyRestroom, MdOutlineHealthAndSafety } from 'react-icons/md'

import { BsPersonWorkspace } from 'react-icons/bs'
import { CiShoppingCart } from 'react-icons/ci'
import { FaHome } from 'react-icons/fa'
import { FaPerson } from 'react-icons/fa6'
import { GiThreeFriends } from 'react-icons/gi'
import React from 'react'

export interface Suggestion {
  label: string
  value: boolean
}

interface IconographyItem { icon: React.JSX.Element; tag: string }

interface Iconography 
  { [key: string]: IconographyItem }


const suggestedActivities = ['Work', 'Personal', 'Shopping', 'Health', 'Family', 'Friends', 'Home']

export const suggestions = (activities?: string[]): Suggestion[] => {
  let finalSuggestions: Suggestion[] = []
  if (activities && activities.length === 0) {
    finalSuggestions = suggestedActivities
      .filter((activity) => activities?.includes(activity))
      .map((activity) => ({ label: activity, value: true }))
  }

  if (finalSuggestions.length === 0) {
    finalSuggestions = suggestedActivities.map((activity) => {
      return { label: activity, value: false }
    })
  }

  return finalSuggestions
}

export const getIcon = (key: string): IconographyItem => {
  const icons: Iconography = {
    Work: { icon: <BsPersonWorkspace />, tag: 'bg-red-200' },
    Personal: { icon: <FaPerson />, tag: 'bg-blue-200' },
    Shopping: { icon: <CiShoppingCart />, tag: 'bg-green-200' },
    Health: { icon: <MdOutlineHealthAndSafety />, tag: 'bg-orange-200' },
    Family: { icon: <MdFamilyRestroom />, tag: 'bg-gray-200' },
    Friends: { icon: <GiThreeFriends />, tag: 'bg-yellow-200' },
    Home: { icon: <FaHome />, tag: 'bg-purple-200' },
  }
  return icons[key] ?? icons['Work']
}
