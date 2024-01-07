'use server'

import { currentUser } from '@/lib/current-user'
import { db } from '@repo/database'
import { redirect } from 'next/navigation'
import sendAfterVoteEmail from 'defer/src/sendAfterVoteEmail'

export const handleClick = async (nomorUrut: number) => {
  const user = await currentUser()

  if (!user) return

  const candidate = await db.candidate.findFirst({ where: { nomorUrut } })

  if (!candidate) return

  const lastVote = await db.vote.findFirst({ orderBy: [{ voteNumber: 'desc' }] })

  await db.vote.create({
    data: { userId: user.id, candidateId: candidate.id, voteNumber: lastVote ? lastVote.voteNumber + 1 : 1 },
  })

  await sendAfterVoteEmail(user.email, user.name, candidate.nomorUrut as 1 | 2 | 3)

  redirect('/vote')
}
