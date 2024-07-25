'use client'

import * as apiTodos from '@/todos/helper/todos'

import { CiSaveDown1, CiSaveUp1 } from 'react-icons/ci'
import { FormEvent, useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { useNewTodo } from '../hooks/useNewTodo'
import { NewTodoForm } from './NewTodoForm'

// import { addTodo, deleteCompletedTodos } from '../actions/todo-actions'

export const NewTodo = () => {
  const router = useRouter()
  const today = new Date().toISOString().split('T')[0]
  const {
    description: { description, setDescription },
    title: { title, setTitle },
    date: { date, setDate },
    showNewTodoForm: { showNewTodoForm, setShowNewTodoForm },
    suggestions: { suggestions },
    handleChange,
    clean,
  } = useNewTodo()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (description.trim().length === 0) return

    const selectedSuggestions = suggestions
      .filter((suggestion) => suggestion.value)
      .map((suggestion) => suggestion.label)

    await apiTodos.createTodo({ title, description, date, activities: selectedSuggestions }) //Rest API
    // await addTodo(description) //#TODO: for server actions
    router.refresh()
    clean()
  }

  const onDeleteCompletedTodos = async () => {
    await apiTodos.deleteCompletedTodos()
    router.refresh()
  }

  const renderNewTodoForm = () => {
    return (
      <dialog className="fixed left-0 top-0 w-10/12 h-full bg-black bg-opacity-0 z-50 overflow-auto flex justify-center items-center">
        <NewTodoForm
          {...{
            onSubmit,
            onClose: clean,
            title,
            setTitle,
            description,
            setDescription,
            date,
            setDate,
            suggestions,
            handleChange,
          }}
        />
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
