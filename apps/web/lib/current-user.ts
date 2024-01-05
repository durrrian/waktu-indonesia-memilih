import { auth } from '@clerk/nextjs'
import { db } from '@repo/database'
import { currentUser as clerkCurrentUser } from '@clerk/nextjs'

export const currentUser = async () => {
  const clerkUser = await clerkCurrentUser()

  if (!clerkUser) {
    return null
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: clerkUser.id },
    include: { vote: true },
  })

  return user
}
