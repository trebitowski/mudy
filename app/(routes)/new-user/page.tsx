import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()

  if (user == null) {
    redirect('/')
  }

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  })

  if (!match) {
    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress

    const firstEmail = user.emailAddresses[0].emailAddress

    const email = primaryEmail ?? firstEmail

    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email,
      },
    })
  }

  redirect('/journal')
}
export default async function NewUser() {
  await createNewUser()
}
