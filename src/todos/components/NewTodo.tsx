'use client'

import { FormEvent, useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import * as apiTodos from '@/todos/helper/todos'
import { useRouter } from 'next/navigation'
import { addTodo, deleteCompletedTodos } from '../actions/todo-actions'
import { CiSaveDown1, CiSaveUp1 } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'

export const NewTodo = () => {
  const router = useRouter()
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [showNewTodoForm, setShowNewTodoForm] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (description.trim().length === 0) return
    await apiTodos.createTodo({ title, description }) //Rest API
    // await addTodo(description) //#TODO: for server actions
    router.refresh()
    setDescription('')
    setTitle('')
    setShowNewTodoForm(false)
    // return newTodo
  }

  const onDeleteCompletedTodos = async () => {
    await apiTodos.deleteCompletedTodos()
    router.refresh()
  }

  const renderNewTodoForm = () => {
    return (
      <form onSubmit={onSubmit} className="flex flex-col w-full bg-gray-100">
        <div className="flex flex-col-2">
          <h2 className="w-10/12 text-2xl font-semibold text-center mt-5">New Todo</h2>
          <div
            className="w-2/12 items-end justify-end mr-5 mt-5 text-gray-500"
            onClick={() => setShowNewTodoForm(false)}>
            <IoMdClose size={50} />
          </div>
        </div>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="w-10/12 ml-10 pl-3 mt-8 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
          placeholder="What is done?"
        />

        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          maxLength={200}
          className="w-10/12 ml-10 mt-5 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
          placeholder="Provide a description"
        />

        <div className="flex flex-col-2 items-center justify-center mt-8 mb-5">
          <button
            type="submit"
            className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
            <CiSaveUp1 />
            Crear
          </button>

          <button
            onClick={() => onDeleteCompletedTodos()}
            type="button"
            className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
            <IoTrashOutline />
            <span className="ml-2">Delete completed</span>
          </button>
        </div>

        {/* <button
          onClick={() => onDeleteCompletedTodos()}
          type="button"
          className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
          <IoTrashOutline />
          <span className="ml-2">Delete completed</span>
        </button> */}
      </form>
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
    </div>
  )
}
