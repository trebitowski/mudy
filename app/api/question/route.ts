import { qa } from '@/utils/ai'
import { getCurrentUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  const { question } = await req.json()
  const user = await getCurrentUser()

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries)

  return NextResponse.json({
    data: answer,
  })
}
