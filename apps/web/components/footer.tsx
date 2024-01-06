'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Footer = () => {
  const pathname = usePathname()

  if (pathname === '/kebijakan-privasi') return null

  return (
    <footer className='w-full bg-gradient-to-br from-[#A22085] to-[#600F97] py-10 mt-20 md:px-2 px-4 text-white'>
      <section className='max-w-[1100px] mx-auto grid gap-4'>
        <p>Siapa yang buat tools ini?</p>

        <p className='text-justify'>
          Tools ini dibuat oleh{' '}
          <Link href='https://durrrian.com' target='_blank' className='underline'>
            Durrrian
          </Link>
          , software agency dari DKI Jakarta. Kami harap bisa mewakili voting rakyat secara independen. Project software
          juga lagi pada selesai jadi kami ada waktu 😁.
        </p>

        <p>
          Oiya, codingannya kita buat open-source, jadi cek{' '}
          <Link href='https://github.com/durrrian/waktu-indonesia-memilih' className='underline' target='_blank'>
            Github
          </Link>{' '}
          kita yaa!
        </p>
      </section>
    </footer>
  )
}
