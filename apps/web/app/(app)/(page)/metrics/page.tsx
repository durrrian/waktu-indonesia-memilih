// import { currentUser } from '@/lib/current-user'
import { Pen } from 'lucide-react'
import { Metadata } from 'next'
// import { redirect } from 'next/navigation'
import { TotalVote } from './total-vote'
import { VotesGroupbyAge } from './votes-groupby-age'
import { VotesGroupbyProvince } from './votes-groupby-province'
import { db } from '@repo/database'
// import parseUrl from '@/lib/parse-url'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'WIM — Metrics',
  }
}

export default async function Page() {
  // const user = await currentUser()

  // if (!user) return redirect(parseUrl('/login').href)

  // if (!user.vote) return redirect(parseUrl('/vote').href)

  const vote = await db.vote.findMany({ include: { user: true, candidate: true } })

  return (
    <section className='grid w-full gap-10'>
      <section className='grid gap-4'>
        <div className='from-primary to-background flex h-fit w-fit items-center justify-center rounded-lg bg-gradient-to-br p-2 md:p-4'>
          <Pen className='h-8 w-8 md:h-10 md:w-10' />
        </div>
        <h3 className='text-3xl font-medium md:text-5xl'>Hasil voting sampai saat ini</h3>
        <p className='text-muted-foreground'>Hasil voting nggak dibuat-buat dan selalu update secara realtime!</p>
      </section>

      <section className='relative grid gap-8'>
        <TotalVote
          no1={vote.filter((val) => val.candidate.nomorUrut === 1).length}
          no2={vote.filter((val) => val.candidate.nomorUrut === 2).length}
          no3={vote.filter((val) => val.candidate.nomorUrut === 3).length}
        />

        <VotesGroupbyAge vote={vote} />

        <VotesGroupbyProvince vote={vote} />
      </section>
    </section>
  )
}
