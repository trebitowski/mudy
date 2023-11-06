import Link from 'next/link'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'

export default function Home() {
  const { userId } = auth()
  const href = userId !== null ? '/journal' : 'new-user'

  return (
    <main className="w-screen h-screen text-stone-900 bg-white flex justify-center items-center p-16">
      <div className="w-full max-w-2xl space-y-4">
      <Image src="/mudy.png" height={128} width={128} className="w-32 h-32 mb-12 -mt-[168px]" alt="Mudy logo" />
        <h1 className="text-6xl font-black">Müdy - Mood&nbsp;Journal</h1>
        <p className="text-2xl text-stone-900/60 pb-4">
          Discover your emotional journey with Müdy, your personal mood journal.
        </p>
        <div>
          <Link href={href} className="bg-violet-600 text-white text-lg px-4 py-3 rounded-lg hover:bg-violet-500 transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 outline-violet-600 outline-0">
              Get started
          </Link>
        </div>
      </div>
    </main>
  )
}
