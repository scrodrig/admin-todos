import * as yup from 'yup'

import { NextResponse } from 'next/server'
import { getUserServerSession } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get('take') ?? '10')
  const skip = Number(searchParams.get('skip') ?? '0')

  if (isNaN(take)) {
    return NextResponse.json({ error: 'Invalid take parameter is not a number' }, { status: 400 })
  }

  if (isNaN(skip)) {
    return NextResponse.json({ error: 'Invalid skip parameter is not a number' }, { status: 400 })
  }

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  }) // Fetch all todos

  return NextResponse.json(todos)
}

const postSchema = yup.object({
  title: yup.string().required().default('No title'),
  description: yup.string().required(),
  date: yup.string().required(),
  completed: yup.boolean().optional().default(false),
  activities: yup.array().of(yup.string()).optional().default([]),
})

export async function POST(req: Request) {
  const user = await getUserServerSession()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, description, date, completed, activities } = await postSchema.validate(
      await req.json()
    )

    const todo = await prisma.todo.create({
      data: {
        ...{
          title,
          description,
          date,
          completed,
          userId: user.id,
          activities: activities.filter((a) => a !== undefined),
        },
      },
    })

    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}

export async function DELETE(req: Request) {
  const user = await getUserServerSession()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await prisma.todo.deleteMany({
      where: {
        completed: true,
        userId: user.id,
      },
    })
    return NextResponse.json({ message: 'Deleted completed todos' })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
