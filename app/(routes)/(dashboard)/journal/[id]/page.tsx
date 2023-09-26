import Editor from '@/app/_components/Editor'
import { getCurrentUser } from '@/utils/auth'
import { prisma } from '@/utils/db'

async function getEntry(entryId) {
  const user = await getCurrentUser()

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        id: entryId,
        userId: user.id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

export default async function EntryPage({ params }) {
  const entry = await getEntry(params.id)

  return <Editor entry={entry} />
}
