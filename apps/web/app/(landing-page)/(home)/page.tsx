import { Button, Card } from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { ToggleTheme } from '@/components/toggle-theme'
import { CandidatesCard } from './candidates-card'
import { ExternalLink, Pen, Vote } from 'lucide-react'
import { TotalVote } from './total-vote'
import { VotesGroupbyAge } from './votes-groupby-age'
import { VotesGroupbyProvince } from './votes-groupby-province'
// import { PemiluCountdown } from './pemilu-countdown'
import { Logo } from '@/components/logo'
// import { currentUser } from '@/lib/current-user'
// import Image from 'next/image'
import Link from 'next/link'
import { Counter } from './counter'
import { db } from '@repo/database'

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: Props) {
  const ref = searchParams.ref ? decodeURIComponent(searchParams.ref.toString()) : undefined

  const invitedUser = ref ? await db.user.findFirst({ where: { email: ref } }) : null

  // const user = await currentUser()

  const vote = await db.vote.findMany({ include: { user: true, candidate: true } })

  return (
    <>
      {invitedUser && (
        <div className='bg-primary absolute inset-0 h-fit w-[100vw] px-4 py-2 md:px-2'>
          <div className='mx-auto flex w-full max-w-[1100px] items-center justify-center text-center'>
            <p>
              Kamu diinvite untuk vote sama <strong>{invitedUser.name}</strong>
            </p>
          </div>
        </div>
      )}

      <section className={cn('grid gap-y-32', invitedUser ? 'mt-14' : '')}>
        <section className='grid gap-x-8 gap-y-4 md:grid-cols-[1fr_1.5fr_1fr]'>
          <section className='bg-background border-border flex flex-col gap-4 rounded-lg border p-6 shadow-sm'>
            <section className='flex items-center justify-between gap-x-4'>
              <Logo size={78} />

              <ToggleTheme />
            </section>
            <h1 className='text-4xl font-medium md:text-5xl'>Waktu Indonesia Memilih</h1>
          </section>

          <section className='bg-background border-border flex flex-col items-center justify-end rounded-lg border p-6 shadow-sm'>
            <h2 className='text-justify text-lg'>
              <span className='text-primary'>Waktu Indonesia Memilih</span> adalah online tools untuk voting calon
              presiden dan wakil presiden 2024. Kami harap bisa mewakili voting rakyat secara independen. Seluruh hasil
              voting akan ter-update secara real-time untuk menjadi benchmark masing-masing kandidat.
            </h2>
          </section>

          <Counter initialData={vote.length} />
        </section>

        {/* <section className='text-foreground flex flex-col items-center justify-center gap-10 text-2xl font-bold md:text-4xl'>
          <h3 className='flex items-center justify-center gap-4'>
            <Vote className='h-10 w-10' />
            Pilih pasangan unggulanmu
          </h3>
          <CandidatesCard />
        </section> */}

        <section className='grid gap-10'>
          <section className='grid gap-4'>
            <div className='from-primary to-background flex h-fit w-fit items-center justify-center rounded-lg bg-gradient-to-br p-2 md:p-4'>
              <Pen className='h-8 w-8 md:h-10 md:w-10' />
            </div>
            <h3 className='text-3xl font-medium md:text-5xl'>Hasil voting sampai saat ini</h3>
            <p className='text-muted-foreground'>Hasil voting nggak dibuat-buat dan selalu update secara realtime!</p>
          </section>

          <section className='relative grid gap-4'>
            {/* {(!user || !user.vote) && (
              <div className='absolute inset-0 z-50 rounded-xl flex items-center justify-center backdrop-blur-md'>
                <Card className={cn('w-fit flex items-center justify-center flex-col p-4 gap-8 max-w-[300px]')}>
                  <Image src='/coblos.png' alt='' quality={100} draggable={false} width={128} height={128} />

                  <section className='grid gap-4 text-center'>
                    <section className='grid gap-2'>
                      <p className='text-lg font-medium'>👀 Voting dulu buat liat hasilnya.</p>
                      <p>Tenang, data kamu dijamin aman.</p>
                      <p className='text-xs'>Data voting di update secara real-time.</p>
                    </section>

                    <Link href='/vote' className='w-full'>
                      <Button className={cn('w-full')} type='button' tabIndex={-1}>
                        Ikutan voting{' '}
                      </Button>
                    </Link>
                  </section>
                </Card>
              </div>
            )} */}

            <TotalVote
              no1={vote.filter((val) => val.candidate.nomorUrut === 1).length}
              no2={vote.filter((val) => val.candidate.nomorUrut === 2).length}
              no3={vote.filter((val) => val.candidate.nomorUrut === 3).length}
            />

            <section className='grid gap-4 md:grid-cols-2'>
              <VotesGroupbyAge vote={vote} />
              <VotesGroupbyProvince vote={vote} />
            </section>

            <Link href='/metrics' className='mx-auto w-fit'>
              <Button className={cn('mt-6 w-fit')} type='button' tabIndex={-1}>
                Lihat seluruh metrics <ExternalLink className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </section>
        </section>

        {/* <PemiluCountdown /> */}
      </section>
    </>
  )
}
