'use client'

import useViewport from '@/hooks/use-viewport'
import cn from '@repo/tailwind-config/cn'
import { Card, CardContent, CardHeader, Badge } from '@repo/web-ui/components'
import Image from 'next/image'
import { useEffect } from 'react'

const candidates = [
  {
    president: 'Anies Rasyid Baswedan',
    vicePresident: 'Muhaimin Iskandar',
    party: ['PKS', 'PKB', 'NASDEM'],
  },
  {
    president: 'Prabowo Subianto',
    vicePresident: 'Gibran Rakabuming Raka',
    party: ['PSI', 'PAN', 'DEMOKRAT', 'GOLKAR', 'GERINDRA'],
  },
  {
    president: 'Ganjar Pranowo',
    vicePresident: 'Mahfud MD',
    party: ['HANURA', 'PERINDO', 'PPP', 'PDIP'],
  },
]

export const CandidatesCard = () => {
  const { md, sm, xs } = useViewport()

  const isMobile = md || sm || xs

  useEffect(() => {
    console.log('isMobile', isMobile)
    console.log('md', md)
    console.log('sm', sm)
    console.log('xs', xs)
  }, [isMobile, md, sm, xs])

  return (
    <section
      className={cn(
        // isMobile ? (md ? 'grid grid-cols-3 gap-x-2' : 'w-full h-fit grid gap-y-4') : 'w-[1000px] h-80 relative mx-auto',
        isMobile && !md ? 'w-full h-fit grid gap-y-4' : '',
        isMobile && md ? 'grid grid-cols-3 gap-x-2' : '',
        !isMobile ? 'w-[1000px] h-80 relative mx-auto' : '',
      )}
    >
      {candidates.map((candidate, i) => (
        <Card
          key={i}
          className={cn('bg-background text-foreground w-full p-0 h-fit', isMobile ? '' : 'absolute max-w-[350px]')}
          style={{
            transform: isMobile
              ? undefined
              : `translateX(${i * 320}px) translateY(${Math.abs(i - 1) * 10}px) rotate(${(i - 1) * 5}deg)`,
          }}
        >
          <CardHeader className={cn('font-medium flex flex-row items-center justify-between w-full')}>
            <Badge className={cn('w-fit')}>No. {i + 1}</Badge>

            <div className='flex items-center justify-end relative w-fit min-w-[120px] h-full'>
              {candidate.party.map((party, j) => (
                <div
                  className={cn('w-fit h-fit absolute')}
                  key={j}
                  style={{ transform: `translate(${-j * 15}px, -3px` }}
                >
                  <Image
                    src={`/party/${party}.png`}
                    alt={`Logo partai ${party}`}
                    width={24}
                    height={24}
                    quality={100}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className={cn('flex flex-col items-center justify-center gap-y-4 p-0 h-full')}>
            <section className='flex flex-col items-center justify-center gap-y-2 text-lg font-bold'>
              <p>{candidate.president}</p>
              <p>{candidate.vicePresident}</p>
            </section>

            <Image
              src={`/candidate/no_${i + 1}.png`}
              alt={`Calon pasangan no. ${i + 1}`}
              width={320}
              height={320}
              draggable={false}
              quality={100}
            />
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
