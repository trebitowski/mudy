import { analyze } from '@/utils/ai'
import { getCurrentUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST() {
  const user = await getCurrentUser()

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day...',
    },
  })

  const analysis = await analyze(entry.content)
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      ...analysis,
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
