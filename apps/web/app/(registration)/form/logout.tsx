'use client'

import { useClerk } from '@clerk/nextjs'
import { Skeleton } from '@repo/web-ui/components'
import { useRouter } from 'next/navigation'

export const Logout = () => {
  const { signOut, user, loaded } = useClerk()

  const router = useRouter()

  return (
    <div className='flex items-center justify-center text-center flex-col gap-2'>
      <div className='flex items-center justify-center text-center flex-wrap gap-x-1 gap-y-0'>
        <p>Kamu masuk dengan akun:</p>
        {(() => {
          if (!user || !loaded || !user.primaryEmailAddress) {
            return <Skeleton className='bg-muted-foreground h-[10px] w-[150px]' />
          }
          return <p className='font-semibold'>{user.primaryEmailAddress.emailAddress}</p>
        })()}
      </div>

      <p>
        Bukan akun kamu?{' '}
        <button
          className='underline'
          type='button'
          onClick={async () => {
            await signOut()

            router.push('/login')
          }}
        >
          Keluar
        </button>
      </p>
    </div>
  )
}
