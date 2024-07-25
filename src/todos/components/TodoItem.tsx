'use client'

import { IoCalendar, IoCalendarOutline, IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'
import React, { startTransition } from 'react'

import { Todo } from '@prisma/client'
import { getIcon } from '@/activities/suggestions'
import styles from './TodoItem.module.css'
import { useOptimistic } from 'react'

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
            todoOptimistic.completed ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
          {todoOptimistic.completed ? (
            <IoCheckboxOutline className="text-3xl text-green-500" />
          ) : (
            <IoSquareOutline className="text-3xl text-gray-500" />
          )}
        </div>
        <div className="grid sm:grid-cols-1">
          <div className="text-center font-bold sm:text-left sm:text-xl text-gray-500">
            {todoOptimistic.title}
          </div>
          <div className="text-center sm:text-left">{todoOptimistic.description}</div>
          <div className="text-center sm:text-left">
            <div className="flex flex-col-2 items-center">
              <IoCalendarOutline className="text-gray-500 mr-2" />
              {todoOptimistic.date}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 sm:text-left mt-3">
            {todoOptimistic.activities.map((activity) => (
              <div key={activity} className="flex items-center">
                <span className="mr-2">{getIcon(activity)?.icon}</span>
                <span className={`${getIcon(activity)?.tag} rounded pr-1 pl-1`}>{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
