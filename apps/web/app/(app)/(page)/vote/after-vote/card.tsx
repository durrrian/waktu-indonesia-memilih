import { Logo } from '@/components/logo'
import cn from '@repo/tailwind-config/cn'
import { Card as CardComponent } from '@repo/web-ui/components'
import Image from 'next/image'
import { Vote, Candidate } from '@prisma/client'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface Props {
  vote: Vote & { candidate: Candidate }
  logo: string | StaticImport
}

export const Card = ({ vote, logo }: Props) => {
  return (
    <CardComponent
      className={cn('p-8 rounded-xl border-none max-w-sm flex flex-col items-center justify-center gap-14 shadow-xl')}
    >
      <section className='flex flex-col gap-2'>
        <Image src={logo} alt='' width={300} height={300} draggable={false} quality={100} />
        <p className='text-gray-500 max-w-[300px] font-extralight text-lg'>
          Peserta voting ke <strong>{vote.voteNumber}</strong> di Waktu Indonesia Memilih
        </p>
      </section>

      <section className='max-w-[300px] flex items-center justify-between w-full'>
        <p className='w-fit h-fit px-2 py-1 rounded-md border border-border text-gray-500 text-sm'>
          {new Date(vote.createdAt).toLocaleString('id-ID', { dateStyle: 'long' })}
        </p>

        <Logo theme='light' size={50} />
      </section>
    </CardComponent>
  )
}
