import { currentUser } from '@/lib/current-user'
import { Pen } from 'lucide-react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { TotalVote } from './total-vote'
import { VotesGroupbyAge } from './votes-groupby-age'
import { VotesGroupbyProvince } from './votes-groupby-province'
import { Counter } from '../counter'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'WIM — Metrics',
  }
}

export default async function Page() {
  const user = await currentUser()

  if (!user) return redirect('/login')

  if (!user.vote) return redirect('/vote')

  return (
    <section className='grid gap-10 w-full'>
      <section className='grid gap-4'>
        <div className='flex items-center justify-center bg-gradient-to-br from-primary to-background w-fit h-fit md:p-4 p-2 rounded-lg'>
          <Pen className='md:w-10 w-8 md:h-10 h-8' />
        </div>
        <h3 className='md:text-5xl text-3xl font-medium'>Hasil voting sampai saat ini</h3>
        <p className='text-muted-foreground'>Hasil voting nggak dibuat-buat dan selalu update secara realtime!</p>
      </section>

      <section className='grid gap-8 relative'>
        <TotalVote no1={10000} no2={8000} no3={6000} />

        <VotesGroupbyAge no1={10000} no2={8000} no3={6000} />

        <VotesGroupbyProvince no1={10000} no2={8000} no3={6000} />
      </section>
    </section>
  )
}
