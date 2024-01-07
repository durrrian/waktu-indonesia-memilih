'use client'

import { Vote, Candidate, User } from '@prisma/client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import JSConfetti from 'js-confetti'
import { Button, Carousel, CarouselApi, CarouselContent, CarouselItem, LoadingSpinner } from '@repo/web-ui/components'
import { Card } from './card'
import LogoWIM from './svg/logo.svg'
import Nomor1 from './svg/no_1.svg'
import Nomor2 from './svg/no_2.svg'
import Nomor3 from './svg/no_3.svg'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import cn from '@repo/tailwind-config/cn'
import { Check, Download, Link } from 'lucide-react'
import satori from 'satori'

interface Props {
  vote: Vote & { candidate: Candidate }
  user: User
}

export const AfterVote = ({ vote, user }: Props) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const [successCopy, setSuccessCopy] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    new JSConfetti({ canvas: canvasRef.current as HTMLCanvasElement }).addConfetti({
      confettiRadius: 5,
      confettiNumber: 300,
    })
  }, [])

  const copyLink = async (text: string) => {
    await navigator.clipboard.writeText(text)

    setSuccessCopy(true)

    setTimeout(() => {
      setSuccessCopy(false)
    }, 3000)

    return
  }

  return (
    <section className='w-full grid gap-20'>
      <canvas className='fixed w-full h-[100svh] z-[-1] inset-0 transform-gpu' ref={canvasRef} />

      <section className='grid md:grid-cols-[3fr_1fr] grid-cols-1 gap-4'>
        <section className='flex flex-col items-start justify-center gap-2'>
          <h3 className='md:text-5xl text-3xl font-semibold'>Terimakasih udah voting!</h3>

          <p className='text-lg font-light'>
            Berhubung gabisa nyelupin jari ke tinta, jadi kamu dapet tanda ini aja ya 😁
          </p>
        </section>

        <section className='w-fit h-fit mx-auto flex flex-col gap-6'>
          <Carousel
            className={cn('w-full max-w-sm')}
            setApi={setApi}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent className='p-0 m-0'>
              <CarouselItem className='p-4'>
                <Card vote={vote} logo={LogoWIM} />
              </CarouselItem>

              <CarouselItem className='p-4'>
                <Card
                  vote={vote}
                  logo={(() => {
                    if (vote.candidate.nomorUrut === 1) return Nomor1
                    if (vote.candidate.nomorUrut === 2) return Nomor2

                    return Nomor3
                  })()}
                />
              </CarouselItem>
            </CarouselContent>

            <div className='w-full flex items-center justify-center gap-4'>
              {Array.from({ length: count }).map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    'w-4 h-4 rounded-full',
                    current === i + 1 ? 'bg-primary' : 'dark:bg-gray-300 bg-gray-700',
                  )}
                  animate={{ scale: current === i + 1 ? 1.3 : 1 }}
                />
              ))}
            </div>
          </Carousel>

          <section className='flex flex-col gap-4'>
            <Button
              size='sm'
              variant='outline'
              onClick={async () => {
                setLoading(true)

                const response = await fetch(`/api/download-image?showImage=${current === 1 ? 'false' : 'true'}`)
                const blob = await response.blob()
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'Waktu Indonesia Memilih.png' // or any other filename you want
                a.style.display = 'none'
                document.body.appendChild(a)
                a.click()
                window.URL.revokeObjectURL(url)
                document.body.removeChild(a)

                setLoading(false)
              }}
              disabled={loading}
            >
              {loading && <LoadingSpinner className='mr-2' />} Download gambar <Download className='w-4 h-4 ml-2' />
            </Button>

            <Button
              size='sm'
              onClick={async () => {
                if (current === 1) {
                  await copyLink(
                    `https://waktuindonesiamemilih.id?ref=${encodeURIComponent(user.email)}&showImage=false`,
                  )
                } else {
                  await copyLink(
                    `https://waktuindonesiamemilih.id?ref=${encodeURIComponent(user.email)}&showImage=true`,
                  )
                }
              }}
              disabled={successCopy}
            >
              {!successCopy ? (
                <>
                  Bagikan link
                  <Link className='w-4 h-4 ml-2' />
                </>
              ) : (
                <>
                  <Check className='w-4 h-4 mr-2' />
                  Sukses copy link
                </>
              )}
            </Button>
          </section>
        </section>
      </section>

      <section className='bg-background border border-border flex flex-col items-center justify-center rounded-xl pt-6 gap-12 text-center'>
        <section className='grid gap-2'>
          <h4 className='text-muted-foreground'>Kandidat pilihanmu</h4>
          <h4 className='font-bold text-xl'>{vote.candidate.name}</h4>
        </section>

        <div className='relative'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='61'
            height='60'
            viewBox='0 0 61 60'
            fill='none'
            className='absolute top-0 right-0'
          >
            <path
              d='M59.9907 34.7962C59.6641 36.6824 56.7703 37.8533 56.1069 39.5697C55.4173 41.3452 56.7797 44.1449 55.7896 45.725C54.7786 47.3335 51.6654 47.2881 50.3645 48.6393C49.061 50.006 49.2401 53.1103 47.7139 54.1996C46.1722 55.2862 43.3115 54.0584 41.5861 54.8266C39.8789 55.582 38.8595 58.5265 37.0176 58.9561C35.1965 59.3573 33.0307 57.1511 31.1139 57.1855C29.2589 57.2306 27.1987 59.565 25.3125 59.2384C23.4263 58.9118 22.2554 56.018 20.539 55.3546C18.7635 54.665 15.9638 56.0274 14.3836 55.0373C12.7752 54.0263 12.8206 50.9131 11.4694 49.6122C10.1027 48.3087 6.99837 48.4878 5.90908 46.9616C4.82248 45.42 6.05028 42.5592 5.28211 40.8339C4.52673 39.1266 1.58215 38.1072 1.15264 36.2653C0.751366 34.4442 2.95759 32.2784 2.92322 30.3616C2.87814 28.5066 0.543719 26.4464 0.870285 24.5602C1.19685 22.674 4.09072 21.5031 4.75413 19.7867C5.44372 18.0112 4.08128 15.2115 5.07144 13.6314C6.08241 12.0229 9.19563 12.0683 10.4965 10.7171C11.8 9.35038 11.6209 6.24608 13.1471 5.1568C14.6887 4.07019 17.5495 5.29799 19.2748 4.52982C20.9821 3.77444 22.0015 0.829863 23.8434 0.400348C25.6645 -0.000922382 27.8303 2.2053 29.7471 2.17093C31.6021 2.12584 33.6623 -0.20857 35.5485 0.117997C37.4347 0.444564 38.6056 3.33842 40.322 4.00184C42.0975 4.69143 44.8972 3.32899 46.4773 4.31915C48.0858 5.33013 48.0404 8.44334 49.3916 9.74418C50.7583 11.0477 53.8626 10.8686 54.9519 12.3948C56.0385 13.9365 54.8107 16.7972 55.5789 18.5226C56.3343 20.2298 59.2788 21.2492 59.7084 23.0911C60.1096 24.9122 57.9034 27.078 57.9378 28.9948C57.9829 30.8498 60.3173 32.91 59.9907 34.7962Z'
              fill={(() => {
                if (vote.candidate.nomorUrut === 1) return '#749C75'
                if (vote.candidate.nomorUrut === 2) return '#FFB449'
                return '#FF5A5F'
              })()}
            />
            <text
              x='50%'
              y='50%'
              textAnchor='middle'
              dominantBaseline='middle'
              fill='#fff'
              fontSize={20}
              transform='rotate(15, 30.5, 30)'
              fontWeight={600}
            >
              {vote.candidate.nomorUrut}
            </text>
          </svg>
          <Image
            src={`/candidate/no_${vote.candidate.nomorUrut}.png`}
            alt={`Foto pasangan nomor urut ${vote.candidate.nomorUrut}`}
            width={350}
            height={350}
            draggable={false}
            quality={100}
          />
        </div>
      </section>
    </section>
  )
}
