import React, { useState } from 'react'
import { Suggestion, suggestions as suggestionsList } from '@/activities/suggestions'

export const useNewTodo = () => {
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [showNewTodoForm, setShowNewTodoForm] = useState(false)

  const [suggestions, setSuggestionList] = useState(suggestionsList())

  const handleChange = (sug: Suggestion) => {
    const updatedSuggestions = suggestions.map((suggestion) => {
      if (suggestion.label === sug.label) {
        return { ...suggestion, value: !sug.value }
      }
      return suggestion
    })
    setSuggestionList(updatedSuggestions)
  }

  const clean = ()=>{
    setDescription('')
    setTitle('')
    setDate(today)
    setShowNewTodoForm(false)
    setSuggestionList(suggestionsList())
  }

  return {
    description: { description, setDescription },
    title: { title, setTitle },
    date: { date, setDate },
    showNewTodoForm: { showNewTodoForm, setShowNewTodoForm },
    suggestions: { suggestions, setSuggestionList },
    handleChange,
    clean,
  }
}
