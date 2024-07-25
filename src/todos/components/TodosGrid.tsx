// 'use client'

import React from 'react'
import { Todo } from '@prisma/client'
import { TodoItem } from './TodoItem'
import { toggleTodo } from '../actions/todo-actions'
// import { useRouter } from 'next/navigation'

interface TodosGridProps {
  todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: TodosGridProps) => {
  // const router = useRouter()

  //! Not needed for actions
  // const toggleTodo = async (id: string, completed: boolean) => {
  //   const updatedTodo = await todosApi.updateTodo(id, completed)
  //   router.refresh()
  //   return updatedTodo
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
