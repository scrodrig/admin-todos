'use client'

import { WidgetItem } from '@/components'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Image from 'next/image'
import { roles } from '@/auth'
// import { roles } from '@/auth'

export default function ProfilePage() {
  const { data: session } = useSession()
  const user = session?.user
  const userRoles = user?.roles ?? ['client']

  useEffect(() => {
    console.log('client side')
  }, [])

  return (
    <div>
      <h1>Profile Page</h1>
      <hr />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1">
        <div className="lg:col-span-1">
          <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-blue-200 bg-gradient-to-r from-sky-200 to-cyan-50">
            <div className="flex flex-col">
              <h5 className="text-xl text-gray-600 text-center font-bold">Client side cookies</h5>
              <div className="mt-2 flex flex-col justify-center gap-4">
                <div className="mt-8 text-center">
                  <Image
                    src={
                      user?.image ??
                      'https://viniferavn.com/wp-content/uploads/2019/11/Schubert-Logo-1.png'
                    }
                    alt=""
                    width={100}
                    height={100}
                    className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                  />
                  <h3 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block ">
                    {user?.name}
                  </h3>
                  <span className="flex flex-col-2  mt-4 text-gray-400 items-center justify-center capitalize gap-2">
                    {userRoles.map((role: string) => {
                      return (
                        <span key={role} className="flex items-center justify-center gap-2 text-red-400">
                          {roles[role]}
                          {role}
                        </span>
                      )
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
