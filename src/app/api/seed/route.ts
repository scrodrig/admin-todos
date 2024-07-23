import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'

export async function GET(request: Request) {
  await prisma.todo.deleteMany({}) // Delete all todos
  await prisma.user.deleteMany({}) // Delete all users

  const user = await prisma.user.create({
    data: {
      email: 'test1@usermail.com',
      password: bcrypt.hashSync('123456', 10),
      name: 'Test User',
      roles: ['admin', 'user'],
      todos: {
        create: [
          { description: 'Space stone', completed: true },
          { description: 'Mind stone' },
          { description: 'Reality stone' },
          { description: 'Power stone' },
          { description: 'Time stone' },
          { description: 'Soul stone' },
        ],
      },
    },
  }) // Seed user

  return NextResponse.json({ message: 'Seed executed!' })
}
