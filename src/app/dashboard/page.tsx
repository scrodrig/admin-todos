import { WidgetItem } from '@/components'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  console.log({ session })

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:griad-cols-2 lg:grid-cols-3">
      <WidgetItem title="Conected user server side">
        <div className="flex flex-col">
          <span className="text-2xl">{session.user?.name}</span>
          <span className="text-lg">{session.user?.email}</span>
          <span className="font-thin">{session.user?.image}</span>
        </div>
        <div className="flex flex-col">{JSON.stringify(session)}</div>
      </WidgetItem>
    </div>
  )
}
