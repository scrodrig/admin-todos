//! ERROR this is not working as expected
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from '@/lib/prisma'
import { NewTodo, TodosGrid } from '@/todos'

export const metadata = {
  title: 'Server todos',
  description: 'Server todos page',
}

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      description: 'asc',
    },
  })

  console.log('contructed')

  //?INFO: useState and useEffect force client side rendering

  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full ml-5 mr-5 px-3 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  )
}
