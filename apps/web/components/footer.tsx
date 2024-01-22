'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Footer = () => {
  const pathname = usePathname()

  const disabled = ['/kebijakan-privasi', '/terms-of-service']

  if (disabled.includes(pathname)) return null

  return (
    <footer className='w-full bg-gradient-to-br from-[#A22085] to-[#600F97] py-10 mt-20 md:px-2 px-4 text-white'>
      <section className='max-w-[1100px] mx-auto grid gap-4'>
        <p>Siapa yang buat tools ini?</p>

        <p className='text-justify'>
          Tools ini dibuat oleh{' '}
          <Link href='https://durrrian.com' target='_blank' className='underline'>
            Durrrian
          </Link>
          , software agency dari DKI Jakarta. Kami harap bisa mewakili voting rakyat secara independen.
        </p>

        <p>
          Oiya, codingannya kami buat open-source, jadi kamu bisa cek{' '}
          <Link href='https://github.com/durrrian/waktu-indonesia-memilih' className='underline' target='_blank'>
            Github
          </Link>{' '}
          repository ini ya!
        </p>

        <section className='flex items-center justify-between gap-x-4 flex-wrap pt-10'>
          <section className='flex items-center justify-center w-fit h-fit flex-wrap gap-x-2 md:gap-x-6'>
            <Link href='/kebijakan-privasi' className='underline text-sm' target='_blank'>
              Kebijakan Privasi
            </Link>
            <Link href='/terms-of-service' className='underline text-sm' target='_blank'>
              Terms of Service
            </Link>
          </section>

          <p className='text-sm'>Durrrian {new Date().getFullYear()}</p>
        </section>
      </section>
    </footer>
  )
}
