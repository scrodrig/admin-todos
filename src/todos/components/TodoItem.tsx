'use client'

import React, { startTransition } from 'react'
import { Todo } from '@prisma/client'
import { useOptimistic } from 'react'

import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'

interface TodoItemProps {
  todo: Todo
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompletedValue: boolean) => ({
      ...state,
      completed: newCompletedValue,
    })
  )

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed))
      await toggleTodo(todoOptimistic.id, !todoOptimistic.completed)
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed))
    }
  }

  return (
    <div className={todoOptimistic.completed ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.completed)}
          onClick={() => onToggleTodo()}
          className={`flex p-2 rounded-me cursor-pointer hover:bg-opacity-60 ${
            todoOptimistic.completed ? 'bg-blue-100' : 'bg-red-100'
          }`}>
          {todoOptimistic.completed ? (
            <IoCheckboxOutline className="text-3xl text-green-500" />
          ) : (
            <IoSquareOutline className="text-3xl text-gray-500" />
          )}
        </div>
        <div className='grid sm:grid-cols-1'>
          <div className="text-center font-bold sm:text-left">{todoOptimistic.title}</div>
          <div className="text-center sm:text-left">{todoOptimistic.description}</div>
        </div>
      </div>
    </div>
  )
}
