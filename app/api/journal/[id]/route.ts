import { analyze } from '@/utils/ai'
import { getCurrentUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function PATCH(request, { params }) {
  const { content } = await request.json()

  const user = await getCurrentUser()

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  const analysis = await analyze(content)
  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      entryId: updatedEntry.id,
      ...analysis,
    },
    update: analysis,
  })

  revalidatePath(`/journal/${updatedEntry.id}`)

  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  })
}
