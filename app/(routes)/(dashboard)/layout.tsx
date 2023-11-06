import { UserButton } from '@clerk/nextjs'
import { LucideBook, LucideCalendarDays } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Müdy',
  description: 'Mood journal that works for you',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const links = [
    { href: '/journal', label: 'Journal', Icon: LucideBook },
    { href: '/trend', label: 'Trend', Icon: LucideCalendarDays },
  ]

  return (
    <div className="h-screen w-screen relative bg-stone-50 text-black">
      <aside className="absolute top-0 left-0 h-full bg-white border-r border-black/10">
        <ul className="flex flex-col items-center">
          <li className="p-6">
            <Link href={"/"} className="rounded-full focus-visible:outline-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2">
              <Image src="/mudy.png" height={64} width={64} className="w-16 h-16" alt="Mudy logo" />
            </Link>
          </li>
          {links.map(({href, label, Icon}) => (
            <li key={href} className="py-2">
              <Link href={href} className="w-16 h-16 p-2 rounded-full grid justify-center items-center hover:bg-stone-100 focus-visible:bg-stone-100 focus-visible:text-black text-stone-700 hover:text-black transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500">
                <Icon size={36}/>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center items-center absolute bottom-0 p-6 w-full">
        <UserButton appearance={{
              elements: {
                userButtonAvatarBox: "w-12 h-12"
              }
        }}/>
        </div>

      </aside>
      <div className="ml-28 flex flex-col h-screen">
        <div className="grow">{children}</div>
      </div>
    </div>
  )
}
