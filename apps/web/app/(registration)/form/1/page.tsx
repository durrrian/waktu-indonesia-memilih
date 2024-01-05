import { Logo } from '@/components/logo'
import cn from '@repo/tailwind-config/cn'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@repo/web-ui/components'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { currentUser } from '@/lib/current-user'
import { Form } from './form'
import { redirectToSignIn } from '@clerk/nextjs'

export default async function Page() {
  const user = await currentUser()

  if (!user) return redirectToSignIn()

  const provinsi = user.provinsi
  const rentanUsia = user.rentanUsia

  if (provinsi && !rentanUsia) return redirect('/form/2')
  if (!user.vote) return redirect('/form/3')
  if (provinsi && rentanUsia && user.vote) return redirect('/vote')

  return (
    <Card className={cn('w-full mx-auto max-w-[400px] h-fit', 'bg-background text-foreground')}>
      <CardHeader className={cn('grid gap-4')}>
        <Link href='/' className='w-fit h-fit'>
          <Logo size={60} />
        </Link>

        <div className='grid gap-2'>
          <CardTitle>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Selamat datang di WIM</h1>
            </div>
          </CardTitle>
          <CardDescription className={cn('text-left')}>
            Sebelum lanjut, yuk isi data kamu terlebih dahulu, {user.name}.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className={cn('flex flex-col gap-8 my-10')}>
        <Form />
      </CardContent>
    </Card>
  )
}
