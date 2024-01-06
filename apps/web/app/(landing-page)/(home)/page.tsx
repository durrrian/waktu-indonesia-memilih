import { Button, Card, CardContent } from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { ToggleTheme } from '@/components/toggle-theme'
import { CandidatesCard } from './candidates-card'
import { ExternalLink, Pen, Vote } from 'lucide-react'
import { TotalVote } from './total-vote'
import { VotesGroupbyAge } from './votes-groupby-age'
import { VotesGroupbyProvince } from './votes-groupby-province'
import { PemiluCountdown } from './pemilu-countdown'
import { Logo } from '@/components/logo'
import { currentUser } from '@/lib/current-user'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
  const user = await currentUser()

  return (
    <section className='grid gap-y-32'>
      <section className='grid md:grid-cols-[1fr_1.5fr_1fr] gap-x-8 gap-y-4'>
        <section className='bg-background rounded-lg shadow-sm p-6 border-border border flex flex-col gap-4'>
          <section className='flex items-center justify-between gap-x-4'>
            <Logo size={78} />

            <ToggleTheme />
          </section>
          <h1 className='font-medium md:text-5xl text-4xl'>Waktu Indonesia Memilih</h1>
        </section>

        <section className='flex items-center justify-end flex-col bg-background rounded-lg shadow-sm p-6 border border-border'>
          <h2 className='text-justify text-lg'>
            <span className='text-primary'>Waktu Indonesia Memilih</span> adalah online tools untuk voting calon
            presiden dan wakil presiden 2024. Seluruh hasil voting akan ter-update secara real-time untuk menjadi
            benchmark masing-masing kandidat.
          </h2>
        </section>

        <section className='flex flex-col items-center justify-between bg-background rounded-lg shadow-sm p-6 border border-border gap-y-4'>
          <section className='w-full'>
            <div className='grid place-items-start'>
              <h3 className='text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground'>
                12,500
              </h3>
            </div>
            <p className='text-muted-foreground'>Orang sudah voting pilihan mereka. Seluruh data dijamin aman.</p>
          </section>

          <Link href='/vote' className='w-full'>
            <Button className={cn('w-full')} type='button' tabIndex={-1}>
              Ikutan voting
            </Button>
          </Link>
        </section>
      </section>

      <section className='flex items-center justify-center flex-col gap-10 text-foreground font-bold md:text-4xl text-2xl'>
        <h3 className='flex items-center gap-4 justify-center'>
          <Vote className='w-10 h-10' />
          Pilih pasangan unggulanmu
        </h3>
        <CandidatesCard />
      </section>

      <section className='grid gap-10'>
        <section className='grid gap-4'>
          <div className='flex items-center justify-center bg-gradient-to-br from-primary to-background w-fit h-fit md:p-4 p-2 rounded-lg'>
            <Pen className='md:w-10 w-8 md:h-10 h-8' />
          </div>
          <h3 className='md:text-5xl text-3xl font-medium'>Hasil voting sampai saat ini</h3>
          <p className='text-muted-foreground'>Hasil voting nggak dibuat-buat dan selalu update secara realtime!</p>
        </section>

        <section className='grid gap-4 relative'>
          {(!user || !user.vote) && (
            <div className='absolute inset-0 z-50 rounded-xl flex items-center justify-center backdrop-blur-md'>
              <Card className={cn('w-fit flex items-center justify-center flex-col p-4 gap-8 max-w-[300px]')}>
                <Image src='/coblos.png' alt='' quality={100} draggable={false} width={128} height={128} />

                <section className='grid gap-4 text-center'>
                  <section className='grid gap-2'>
                    <p className='text-lg font-medium'>👀 Voting dulu buat liat hasilnya.</p>
                    <p>Tenang, data kamu dijamin aman.</p>
                  </section>

                  <Link href='/vote' className='w-full'>
                    <Button className={cn('w-full')} type='button' tabIndex={-1}>
                      Ikutan voting{' '}
                    </Button>
                  </Link>
                </section>
              </Card>
            </div>
          )}

          <TotalVote no1={10000} no2={8000} no3={6000} />

          <section className='grid md:grid-cols-2 gap-4'>
            <VotesGroupbyAge no1={10000} no2={8000} no3={6000} />
            <VotesGroupbyProvince no1={10000} no2={8000} no3={6000} />
          </section>

          <Link href='/metrics' className='w-fit mx-auto'>
            <Button className={cn('w-fit mt-6')} type='button' tabIndex={-1}>
              Lihat seluruh metrics <ExternalLink className='w-4 h-4 ml-2' />
            </Button>
          </Link>
        </section>
      </section>

      <PemiluCountdown />
    </section>
  )
}
