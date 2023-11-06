import { analyze } from '@/utils/ai'
import { getCurrentUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
  const user = await getCurrentUser()

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
  })

  if (entry == null) {
    return
  }

  const analysis = await analyze(entry.content)

  if (analysis == null) {
    return
  }

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: entry.id,
    },
    create: {
      entryId: entry.id,
      ...analysis,
    },
    update: analysis,
  })

  revalidatePath(`/journal/${entry.id}`)
  revalidatePath(`/trend/`)
  revalidatePath(`/journal`)

  return NextResponse.json({
    data: { ...entry, analysis: updatedAnalysis },
  })
}
