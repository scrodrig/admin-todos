'use client'

import * as apiTodos from '@/todos/helper/todos'

import { CiSaveDown1, CiSaveUp1 } from 'react-icons/ci'
import { FormEvent, useState } from 'react'
import { Suggestion, suggestions as suggestionsList } from '@/activities/suggestions'
import { Checkbox } from './Checkbox'
import { IoMdClose } from 'react-icons/io'
import { IoTrashOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

// import { addTodo, deleteCompletedTodos } from '../actions/todo-actions'

export const NewTodo = () => {
  const router = useRouter()
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (description.trim().length === 0) return

    const selectedSuggestions = suggestions
      .filter((suggestion) => suggestion.value)
      .map((suggestion) => suggestion.label)

    await apiTodos.createTodo({ title, description, date, activities: selectedSuggestions }) //Rest API
    // await addTodo(description) //#TODO: for server actions
    router.refresh()
    setDescription('')
    setTitle('')
    setDate(today)
    setShowNewTodoForm(false)
    setSuggestionList(suggestionsList())
    // return newTodo
  }

  const onClose = () => {
    setDescription('')
    setTitle('')
    setDate(today)
    setShowNewTodoForm(false)
    setSuggestionList(suggestionsList())
  }

  const onDeleteCompletedTodos = async () => {
    await apiTodos.deleteCompletedTodos()
    router.refresh()
  }

  const renderNewTodoForm = () => {
    const maxDate = new Date().toISOString().split('T')[0]
    return (
      <dialog className="fixed left-0 top-0 w-10/12 h-full bg-black bg-opacity-0 z-50 overflow-auto flex justify-center items-center">
        <form onSubmit={onSubmit} className="flex flex-col w-full bg-gray-100 shadow-sm p-5 border-dashed border border-gray-500">
          <div className="flex flex-col-2">
            <h2 className="w-11/12 text-2xl align-middle font-semibold text-gray-700 text-center mt-5">
              New Todo
            </h2>
            <div
              className="flex w-1/12 items-end justify-end mr-5 mt-5 text-gray-500"
              onClick={() => onClose()}>
              <IoMdClose size={50} />
            </div>
          </div>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            className="w-12/12 ml-10 mr-10 pl-3 mt-8 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
            placeholder="What is done?"
          />

          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            maxLength={200}
            className="w-12/12 ml-10 mr-10 mt-5 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
            placeholder="Provide a description"
          />

          <input
            type="date"
            id="start"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            className="w-12/12 ml-10 mr-10 mt-5 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
            min={`2024-01-01`}
            max={maxDate}
          />

          <div className="flex flex-col ml-10 mr-10 mt-5 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all">
            <div className="grid sm:grid-cols-2 sm:text-left mt-3">
              {suggestions.map((suggestion) => (
                <Checkbox
                  key={suggestion.label}
                  label={suggestion.label}
                  value={suggestion.value}
                  onChange={() => {
                    handleChange(suggestion)
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col-2 items-center justify-center mt-8 mb-5">
            <button
              type="submit"
              className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
              <CiSaveUp1 />
              <span className="ml-2">Create</span>
            </button>

            <button
              onClick={() => onClose()}
              type="button"
              className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
              <IoMdClose />
              <span className="ml-2">Cancel</span>
            </button>
          </div>
        </form>
      </dialog>
    )
  }

  return showNewTodoForm ? (
    renderNewTodoForm()
  ) : (
    <div className="flex items-center justify-center mt-8 mb-5">
      <button
        onClick={() => setShowNewTodoForm(true)}
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        <CiSaveDown1 />
        Add new todo
      </button>
      <button
        onClick={() => onDeleteCompletedTodos()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        <span className="ml-2">Delete completed</span>
      </button>
    </div>
  )
}
