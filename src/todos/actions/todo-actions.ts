'use server'

import { getUserServerSession } from '@/auth/actions/auth-actions'
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
  const user = await getUserServerSession()
  if (!user) {
    throw new Error('Unauthorized')
  }
  try {
    const todo = await prisma.todo.create({
      data: {
        ...{ description, userId: user.id, title: '' },
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
  const user = await getUserServerSession()
  if (!user) {
    throw new Error('Unauthorized')
  }
  await prisma.todo.deleteMany({
    where: {
      completed: true,
      userId: user.id,
    },
  })

  revalidatePath('/dashboard/server-todos')
}
