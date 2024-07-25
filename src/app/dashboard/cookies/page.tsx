import { TabBar } from '@/components'
import { CookieForm } from '@/cookies'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Cookies Page',
  description: 'Cookies Page',
}

export default function CookiesPage() {
  const cookieStore = cookies()
  const cookieTab = Number(cookieStore.get('selectedTab')?.value ?? '1')

  const allCookies = cookieStore.getAll()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
      <span className="text-3xl">Cookie View</span>
        <CookieForm cookies={allCookies} />
      </div>
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={cookieTab} />
        {/* {JSON.stringify(allCookies)} */}
      </div>
    </div>
  )
}
