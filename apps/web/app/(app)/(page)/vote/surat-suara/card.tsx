'use client'

import { Candidate } from '@prisma/client'
import cn from '@repo/tailwind-config/cn'
import { HTMLMotionProps, motion } from 'framer-motion'
import Image from 'next/image'

interface Props extends HTMLMotionProps<'button'> {
  className?: string
  candidate: Candidate & { party: string[] }
}

export const Card = ({ candidate, className, ...prop }: Props) => {
  return (
    <motion.button
      className={cn(
        'border-2 border-black text-black bg-white flex flex-col gap-8 items-center justify-center py-8',
        className,
      )}
      {...prop}
    >
      <p className='text-3xl font-extrabold'>{candidate.nomorUrut}</p>

      <div className='bg-red-500 w-full h-32 relative'>
        <Image
          key={`${candidate.nomorUrut}-image`}
          src={`/candidate/no_${candidate.nomorUrut}.png`}
          alt={`Foto pasangan nomor urut ${candidate.nomorUrut}`}
          fill={true}
          draggable={false}
          className='w-full h-full object-contain'
        />
      </div>

      <div className='grid grid-cols-2 text-center'>
        <div className='max-w-[200px]'>
          <p className='text-gray-400 text-sm'>CALON PRESIDEN</p>
          <p className='font-bold'>{candidate.president}</p>
        </div>

        <div className='max-w-[200px]'>
          <p className='text-gray-400 text-sm'>CALON WAKIL PRESIDEN</p>
          <p className='font-bold'>{candidate.vicePresident}</p>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-sm font-bold'>GABUNGAN PARTAI POLITIK PENGUSUL</p>

        <div className='flex items-center justify-center gap-2'>
          {candidate.party.map((party) => (
            <Image
              src={`/party/${party}.png`}
              alt={`Logo partai politik ${party}`}
              width={24}
              height={24}
              quality={100}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </motion.button>
  )
}
