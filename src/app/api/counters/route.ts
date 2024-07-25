import { NextResponse } from 'next/server'
import { getUserServerSession } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  const user = await getUserServerSession()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {

    const todo = await prisma.todo.count({
      where: {
        userId: user.id,
      },
    })

    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
