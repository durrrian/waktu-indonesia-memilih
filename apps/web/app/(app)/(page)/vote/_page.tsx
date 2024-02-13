import { Metadata } from 'next'
import { SuratSuara } from './surat-suara'
import { db } from '@repo/database'
import { currentUser } from '@/lib/current-user'
import { redirect } from 'next/navigation'
import { AfterVote } from './after-vote'
import parseUrl from '@/lib/parse-url'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'WIM — Vote',
  }
}

export default async function Page() {
  const user = await currentUser()

  if (!user) return redirect(parseUrl('/login').href)

  const vote = user.vote

  const candidates = await db.candidate.findMany({ orderBy: [{ nomorUrut: 'asc' }] })

  return (
    <div className='w-full h-fit flex flex-col items-center justify-center gap-20'>
      {(() => {
        if (!vote) return <SuratSuara candidates={candidates} user={user} />

        return <AfterVote vote={vote} user={user} />
      })()}
    </div>
  )
}
