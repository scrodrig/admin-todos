import { CiBookmarkCheck, CiShoppingBasket, CiUser } from 'react-icons/ci'

import { Avatar } from '../avatar/Avatar'
import { FaCookieBite } from 'react-icons/fa'
import Image from 'next/image'
import { IoServer } from 'react-icons/io5'
import Link from 'next/link'
import { LogoutButton } from './LogoutButton'
import { MdDashboardCustomize } from 'react-icons/md'
import React from 'react'
import SidebarItem from './SidebarItem'

const menuItems = [
  {
    path: '/dashboard',
    icon: <MdDashboardCustomize  size={30} />,
    title: 'Dashboard',
  },
  {
    path: '/dashboard/rest-todos',
    icon: <CiBookmarkCheck size={30} />,
    title: 'Rest TODOS',
  },
  {
    path: '/dashboard/server-todos',
    icon: <IoServer  size={30} />,
    title: 'Server actions',
  },
  {
    path: '/dashboard/cookies',
    icon: <FaCookieBite  size={30} />,
    title: 'Cookies',
  },
  {
    path: '/dashboard/products',
    icon: <CiShoppingBasket size={30} />,
    title: 'Products',
  },

  {
    path: '/dashboard/profile',
    icon: <CiUser size={30} />,
    title: 'Profile',
  },
]

export const Sidebar = async () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="page logo"
              width={32}
              height={32}
            />
          </Link>
        </div>

        <Avatar />

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  )
}
