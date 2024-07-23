import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const Avatar = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  const { user } = session

  const userRoles = user?.roles ?? ['client']

  return (
    <div className="mt-8 text-center">
      <Image
        src={user?.image ?? 'https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg'}
        alt=""
        width={100}
        height={100}
        className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
      />
      <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{user?.name}</h5>
      <span className="hidden text-gray-400 lg:block capitalize">{userRoles.join(',')}</span>
    </div>
  )
}
