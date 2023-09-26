import EntryCard from '@/app/_components/EntryCard'
import NewEntryCard from '@/app/_components/NewEntryCard'
import Question from '@/app/_components/Question'
import { analyze } from '@/utils/ai'
import { getCurrentUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getCurrentUser()

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}

export default async function JournalPage() {
  const entries = await getEntries()

  return (
    <main className="p-10">
      <h2 className="text-3xl mb-8">Journal</h2>
      <Question />
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </main>
  )
}
