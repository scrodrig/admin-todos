//! ERROR this is not working as expected
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getUserServerSession } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'
import { NewTodo, TodosGrid } from '@/todos'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Rest todos',
  description: 'Rest todos page',
}

export default async function RestTodosPage() {
  const user = await getUserServerSession()

  if (!user) {
    redirect('/api/auth/signin')
  }

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: {
      description: 'asc',
    },
  })

  //?INFO: useState and useEffect force client side rendering

  return (
    <div>
      <div className="w-full ml-5 mr-5 px-3 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  )
}
