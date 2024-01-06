import Link from 'next/link'
import cn from '@repo/tailwind-config/cn'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@repo/web-ui/components'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { SigninWithGoogle } from './signin-with-google'
import { Logo } from '@/components/logo'
import { currentUser } from '@/lib/current-user'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'WIM — Login',
  }
}

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: Props) {
  const user = await currentUser()

  if (user) return redirect('/vote')

  return (
    <Card className={cn('w-fit mx-auto max-w-[400px] h-96', 'bg-background text-foreground')}>
      <CardHeader className={cn('grid gap-4')}>
        <Link href='/' className='w-fit h-fit'>
          <Logo size={60} />
        </Link>

        <div>
          <CardTitle>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Masuk</h1>
            </div>
          </CardTitle>
          <CardDescription className={cn('text-left')}>Untuk lanjut ke Waktu Indonesia Memilih</CardDescription>
        </div>
      </CardHeader>

      <CardContent className={cn('flex flex-col gap-8 my-10')}>
        <SigninWithGoogle
          redirectUrlParam={searchParams.redirect_url ? searchParams.redirect_url.toString() : undefined}
        />
      </CardContent>
      <CardFooter>
        <p className='text-xs text-justify select-none'>
          Dengan mengklik "Continue with Google" di atas, Anda menyatakan bahwa Anda telah membaca dan memahami, serta
          menyetujui{' '}
          <Link href={'/kebijakan-privasi'} className='hover:text-primary' prefetch={true} target='_blank'>
            Kebijakan Privasi
          </Link>{' '}
          Waktu Indonesia Memilih.
        </p>
      </CardFooter>
    </Card>
  )
}
