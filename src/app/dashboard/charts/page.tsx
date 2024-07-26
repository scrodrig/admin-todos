import { getUserServerSession } from '@/auth/actions/auth-actions'
import { Donut } from '@/charts'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function ChartPage() {
  const user = await getUserServerSession()

  if (!user) {
    redirect('/api/auth/signin')
  }
  //! ERROR, this invokes fetch from node.js and not from window
  // const onGetTotalTodos = async () => {
  //   const total = await apiTodos.getTotalTodos()
  //   console.log('total', total)
  //   return { total }
  // }

  const [pending, done] = await prisma.$transaction([
    prisma.todo.count({
      where: {
        userId: user.id,
        completed: false,
      },
    }),
    prisma.todo.count({
      where: {
        userId: user.id,
        completed: true,
      },
    }),
  ])

  return (
    <div>
      <h1 className='text-3xl'>Chart Page</h1>
      <div>
        <Donut done={done} pending={pending} />
      </div>
    </div>
  )
}
