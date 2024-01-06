import { Metadata } from 'next'
import { SuratSuara } from './surat-suara'
import { db } from '@repo/database'
import { currentUser } from '@/lib/current-user'
import { redirect } from 'next/navigation'
import { Counter } from './counter'
import { AfterVote } from './after-vote'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'WIM — Vote',
  }
}

export default async function Page() {
  const user = await currentUser()

  if (!user) return redirect('/login')

  const vote = user.vote

  const candidates = await db.candidate.findMany({ orderBy: [{ nomorUrut: 'asc' }] })

  return (
    <div className='w-full h-fit flex flex-col items-center justify-center gap-20'>
      {(() => {
        if (!vote) return <SuratSuara candidates={candidates} />

        return <AfterVote vote={vote} />
      })()}

      <Counter />
    </div>
  )
}
