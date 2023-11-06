import { auth } from '@clerk/nextjs'
import { prisma } from '@/utils/db'

export async function getCurrentUser() {
  const { userId } = auth()

  const user = prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId || undefined,
    },
  })

  return user
}
