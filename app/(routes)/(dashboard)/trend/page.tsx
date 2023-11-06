import EntryCard from '@/app/_components/EntryCard'
import NewEntryCard from '@/app/_components/NewEntryCard'
import Question from '@/app/_components/Question'
import { analyze } from '@/utils/ai'
import { getCurrentUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const monthInitials = 'JFMAMJJASOND';

const getEntries = async () => {
  const user = await getCurrentUser()
  const days = [
    Array(31).fill(null),
    Array(28).fill(null),
    Array(31).fill(null),
    Array(30).fill(null),
    Array(31).fill(null),
    Array(30).fill(null),
    Array(31).fill(null),
    Array(31).fill(null),
    Array(30).fill(null),
    Array(31).fill(null),
    Array(30).fill(null),
    Array(31).fill(null),
  ];

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
      createdAt: {
        gte: new Date(new Date().getFullYear(), 0, 1), // Get entries from this year only
      },
    },
    include: {
      analysis: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  
  const dayOfYear = (date: Date) => Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);

  entries.forEach((entry) => {
    console.log(entry.createdAt.getMonth(), entry.createdAt.getDate() - 1)
    days[entry.createdAt.getMonth()][entry.createdAt.getDate() - 1] = entry
  })

  return days;
}

export default async function MoodTrendPage() {
  const entries = await getEntries()

  return (
    <main className="p-10">
      <h2 className="text-4xl mb-8 font-semibold">Trend</h2>
      <div className="flex flex-col flex-wrap gap-1 w-fit">
        {entries.map((month, index) => (
          <div key={index} className="flex gap-2">
            <span className="font-semibold font-mono">{monthInitials.charAt(index)}</span>
            <div className="flex flex-wrap gap-1 w-fit">
              {month.map((entry, index) => 
                entry ? (
                  <Link key={entry.id} href={`/journal/${entry.id}`} className="rounded bg-stone-200 w-6 h-6" style={{backgroundColor: entry.analysis?.color ?? undefined}}/>
                  ) : <div key={index} className="rounded bg-stone-200 w-6 h-6" />
              )}
            </div>
          </div>))}
        
      </div>
    </main>
  )
}
