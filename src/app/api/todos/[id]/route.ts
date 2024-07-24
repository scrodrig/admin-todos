import { getUserServerSession } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

interface Segments {
  params: {
    id: string
  }
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserServerSession()
  if (!user) {
    return null
  }
  const todo = await prisma.todo.findFirst({ where: { id, userId: user.id } })

  if (todo?.userId !== user.id) {
    return null
  }

  return todo
}

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id)
  if (!todo) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
  }
  return NextResponse.json({ todo })
}

const putSchema = yup.object({
  description: yup.string().optional(),
  completed: yup.boolean().optional(),
})

export async function PUT(req: Request, { params }: Segments) {
  const { id } = params
  const todo = await getTodo(id)
  if (!todo) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
  }

  try {
    const { completed, description } = await putSchema.validate(await req.json())

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed, description },
    })

    return NextResponse.json({ updatedTodo })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
