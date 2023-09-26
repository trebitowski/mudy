import Link from 'next/link'
import { auth } from '@clerk/nextjs'

export default function Home() {
  const { userId } = auth()
  const href = userId !== null ? '/journal' : 'new-user'

  return (
    <main className="w-screen h-screen bg-black text-white flex justify-center items-center">
      <div className="w-full max-w-2xl space-y-4">
        <h1 className="text-6xl">The Best Journal App</h1>
        <p className="text-2xl text-white/60">
          This is the best app for tracking your mood through journal entries.
          All you have to do is be honest.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-emerald-600 text-lg px-4 py-2.5 rounded-lg">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
