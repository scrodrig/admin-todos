'use server'

import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const sleep = (ms: number): Promise<Boolean> =>
  new Promise((resolve) => setTimeout(resolve, ms * 1000))

export const toggleTodo = async (id: string, completed: boolean): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } })
  if (!todo) {
    throw new Error(`Todo with id ${id} not found`)
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed },
  })

  revalidatePath('/dashboard/server-todos')

  return updatedTodo
}

export const addTodo = async (description: string): Promise<Todo | { message: string }> => {
  try {
    const todo = await prisma.todo.create({
      data: {
        ...{ description },
      },
    })

    revalidatePath('/dashboard/server-todos')

    return todo
  } catch (error) {
    return {
      message: 'Error creating todo',
    }
  }
}

export const deleteCompletedTodos = async (): Promise<void> => {
  await prisma.todo.deleteMany({
    where: {
      completed: true,
    },
  })

  revalidatePath('/dashboard/server-todos')
}
