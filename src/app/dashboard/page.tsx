import { Avatar, WidgetItem } from '@/components'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Image from 'next/image'
import { roles } from '@/auth'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  // console.log({ session })
  if (!session) {
    redirect('/api/auth/signin')
  }

  const { user } = session
  const userRoles = user?.roles ?? ['client']

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1">
      <WidgetItem title="Profile area">
        <div className="mt-8 text-center">
          <Image
            src={
              user?.image ?? 'https://viniferavn.com/wp-content/uploads/2019/11/Schubert-Logo-1.png'
            }
            alt=""
            width={100}
            height={100}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h3 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block ">{user?.name}</h3>
          <span className="flex flex-col-2  mt-4 text-gray-400 items-center justify-center capitalize gap-2">
            {userRoles.map((role:string) => {
              return (
                <span key={role} className="flex items-center justify-center gap-2">
                  {roles[role]}
                  {role}
                </span>
              )
            })}
          </span>
        </div>

        {/* <div className="flex flex-col">{JSON.stringify(session)}</div> */}
      </WidgetItem>
    </div>
  )
}

{
  /* <span classNameName="text-2xl">{session.user?.name}</span>
          <span classNameName="text-lg">{session.user?.email}</span>
          <span classNameName="font-thin">{session.user?.image}</span> */
}
