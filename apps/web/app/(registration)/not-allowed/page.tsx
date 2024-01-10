import { Logo } from '@/components/logo'
import { currentUser } from '@/lib/current-user'
import { redirectToSignIn } from '@clerk/nextjs'
import cn from '@repo/tailwind-config/cn'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@repo/web-ui/components'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { CopyButton } from './copy-button'
import { Metadata } from 'next'
import parseUrl from '@/lib/parse-url'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'WIM — Belum bisa vote',
  }
}

export default async function Page() {
  const user = await currentUser()

  if (!user) return redirectToSignIn()

  if (!user.provinsi) return redirect(parseUrl('/form/1').href)

  if (!user.rentanUsia) return redirect(parseUrl('/form/2').href)

  if (user.rentanUsia !== 'UNDER_17') return notFound()

  return (
    <Card className={cn('w-full mx-auto max-w-[500px] h-fit', 'bg-background text-foreground select-none')}>
      <CardHeader className={cn('grid gap-4')}>
        <Link href='/' className='w-fit h-fit'>
          <Logo size={60} />
        </Link>

        <div className='grid gap-2'>
          <CardTitle>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-xl font-semibold tracking-tight'>
                Sorry, kamu masih belum cukup umur untuk ikutan voting 😥
              </h1>
            </div>
          </CardTitle>
          <CardDescription className={cn('text-left')}>Ada sedikit kata dari yang ngebuat tools ini.</CardDescription>
        </div>
      </CardHeader>

      <CardContent className={cn('flex flex-col items-center justify-center gap-8')}>
        <p className='text-justify'>
          Supaya hasil voting ini tetap objectif, yang bisa voting hanya warga Indonesia yang sudah mempunyai hak suara.
          Kalau kamu suka sama WIM, kamu bisa kasih tau ke temen dan keluarga kamu yang sudah punya hak suara 😉
        </p>

        <CopyButton email={user.email} />
      </CardContent>
    </Card>
  )
}
