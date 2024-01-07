import { Logo } from '@/components/logo'
import { currentUser } from '@/lib/current-user'
import { redirectToSignIn } from '@clerk/nextjs'
import cn from '@repo/tailwind-config/cn'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '@repo/web-ui/components'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()

  if (!user) return redirectToSignIn()

  if (!user.provinsi) return redirect('/form/1')

  if (!user.rentanUsia) return redirect('/form/2')

  if (user.rentanUsia === 'UNDER_17') return redirect('/not-allowed')

  if (user.vote) return redirect('/vote')

  return (
    <Card className={cn('w-full mx-auto max-w-[500px] h-fit', 'bg-background text-foreground select-none')}>
      <CardHeader className={cn('grid gap-4')}>
        <Link href='/' className='w-fit h-fit'>
          <Logo size={60} />
        </Link>

        <div className='grid gap-2'>
          <CardTitle>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-xl font-semibold tracking-tight'>Kamu sudah bisa voting!</h1>
            </div>
          </CardTitle>
          <CardDescription className={cn('text-left')}>Ada sedikit kata dari yang ngebuat tools ini.</CardDescription>
        </div>
      </CardHeader>

      <CardContent className={cn('flex flex-col items-center justify-center gap-8')}>
        <p className='text-justify'>
          Sebelum kamu voting, kamu harus tau bahwa kamu hanya bisa voting sekali. Waktu Indonesia Memilih tidak bisa
          dijadikan patokan utama untuk hasil voting calon pasangan presiden dan wakil presiden 2024.
        </p>

        <p className='text-justify'>
          Kami membuat ini dengan harapan bisa mewakili voting rakyat secara independen. Data yang kamu gunakan untuk
          mendaftar akan aman.
        </p>

        <Link href='/vote' className='w-full'>
          <Button className={cn('w-full')} tabIndex={-1}>
            Voting sekarang!
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
