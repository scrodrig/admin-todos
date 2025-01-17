import { Todo } from '@prisma/client'

const sleep = (ms: number): Promise<Boolean> =>
  new Promise((resolve) => setTimeout(resolve, ms * 1000))

export const updateTodo = async (id: string, completed: boolean): Promise<Todo> => {
  const body = {
    completed: completed,
  }

  const todo = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json())

  return todo
}

interface UpdateTodo {
  title: string
  description: string
  date?: string
  activities?: string[]
}

export const createTodo = async ({
  title,
  description,
  date,
  activities,
}: UpdateTodo): Promise<Todo> => {
  const body = {
    title,
    description,
    date,
    activities,
  }

  const todo = await fetch(`/api/todos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json())

  return todo
}

export const deleteCompletedTodos = async () => {
  await fetch(`/api/todos/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())

  return { deleted: true }
}

export const getTotalTodos = async () => {
  const counter = await fetch(`/api/counters/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
  return counter
}
