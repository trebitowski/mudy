import { UserButton } from '@clerk/nextjs'
import type { Metadata } from 'next'
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
    { href: '/', label: 'Home' },
    { href: '/journal', label: 'Journal' },
  ]

  return (
    <div className="h-screen w-screen relative bg-stone-50 text-black">
      <aside className="absolute top-0 left-0 h-full w-52 bg-white border-r border-black/10">
        <div className="w-full flex p-6">
          <p className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-cyan-600 inline-block text-transparent bg-clip-text">
            Moodle
          </p>
        </div>
        <ul>
          {links.map((link) => (
            <li key={link.href} className="px-6 py-2 text-xl">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="ml-52 flex flex-col h-screen">
        <header className="h-12 bg-white border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="grow">{children}</div>
      </div>
    </div>
  )
}
