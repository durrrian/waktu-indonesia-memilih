'use client'

import { candidateParty } from '@/lib/candidate-party'
import { Header } from './header'
import { Candidate } from '@prisma/client'
import { Card } from './card'
import { useState } from 'react'
import cn from '@repo/tailwind-config/cn'
import { Drawer, DrawerTrigger, DrawerContent, Button, ScrollArea, LoadingSpinner } from '@repo/web-ui/components'
import { visiMisi } from './visi-misi'
import { handleClick } from './handle-click'
import { useServerAction } from '@/hooks/use-server-actions'

interface Props {
  candidates: Candidate[]
}

export const SuratSuara = ({ candidates }: Props) => {
  const candidatesWithParty = candidates.map((candidate, index) => ({
    ...candidate,
    party: candidateParty[index].party,
  }))

  const [isHover, setIsHover] = useState(false)

  const [runAction, isPending] = useServerAction(handleClick)

  return (
    <div
      className={cn('md:p-8 p-4 bg-white grid gap-10 w-full', isHover ? 'cursor-coblos' : '')}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Header />

      <div className='grid md:grid-cols-3 grid-cols-1 xl:gap-x-12 gap-x-4 gap-y-4'>
        {candidatesWithParty.map((candidate, i) => (
          <Drawer key={`${i}-${candidate.name}`}>
            <DrawerTrigger asChild>
              <Card
                candidate={candidate}
                className='cursor-coblos'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.05 }}
              />
            </DrawerTrigger>
            <DrawerContent className={cn('h-fit')}>
              <div className='w-full max-w-[1100px] mx-auto md:px-2 px-4 pt-10 pb-20'>
                <ScrollArea className={cn('w-full h-[70svh]')}>
                  <div className='grid md:grid-cols-2 gap-x-4 gap-y-8 grid-cols-1'>
                    <div className='w-full flex items-start h-full md:justify-start justify-center'>
                      <Card candidate={candidate} className='cursor-default max-w-[500px]' tabIndex={-1} />
                    </div>

                    <div className='grid gap-4'>
                      <h3 className='text-xl font-medium'>Visi Misi</h3>

                      <ol className='list-outside list-decimal ml-6 grid gap-2'>
                        {visiMisi[candidate.name].map((vismis, j) => (
                          <li key={`vismis-${j}`}>{vismis}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <Button
                    className={cn('w-full text-xl mt-10')}
                    size='lg'
                    type='button'
                    onClick={() => runAction(candidate.nomorUrut)}
                    disabled={isPending}
                  >
                    {isPending && <LoadingSpinner className='mr-2' />} Pilih pasangan nomor urut {candidate.nomorUrut}
                  </Button>
                </ScrollArea>
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  )
}
