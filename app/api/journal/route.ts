import { analyze } from '@/utils/ai'
import { getCurrentUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

const options = {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
} as const;

export async function POST() {
  const user = await getCurrentUser()

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day...',
    },
  })

  const event = new Date();

  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      mood: "",
      color: "#e7e5e4",
      summary: "",
      subject: event.toLocaleDateString('en-US', options),
      negative: false
    },
  })

  revalidatePath('/journal')
  revalidatePath(`/trend`)

  return NextResponse.json({ data: entry })
}
