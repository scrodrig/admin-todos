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
          { title: '1 stone', description: 'Space stone', completed: true },
          { title: '2 stone', description: 'Mind stone' },
          { title: '3 stone', description: 'Reality stone' },
          { title: '4 stone', description: 'Power stone' },
          { title: '5 stone', description: 'Time stone' },
          { title: '6 stone', description: 'Soul stone' },
        ],
      },
    },
  }) // Seed user

  return NextResponse.json({ message: 'Seed executed!' })
}
