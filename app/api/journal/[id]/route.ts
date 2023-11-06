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


  revalidatePath(`/journal/${updatedEntry.id}`)
  revalidatePath(`/journal`)
  revalidatePath(`/trend`)

  return NextResponse.json({
    data: { ...updatedEntry },
  })
}
