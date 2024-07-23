import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/dashboard')
  return (
    <div className="grid gap-6">
      <span className="text-5xl">Hello world</span>
    </div>
  )
}
