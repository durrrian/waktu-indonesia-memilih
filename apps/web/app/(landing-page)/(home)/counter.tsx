'use client'

import { useSocket } from '@/hooks/use-socket'
import { SocketMessage } from '@/provider/socket-provider'
import cn from '@repo/tailwind-config/cn'
import { Button } from '@repo/web-ui/components'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props {
  initialData: number
}

export const Counter = ({ initialData }: Props) => {
  const [voteCount, setVoteCount] = useState(initialData)

  const { socket } = useSocket()

  useEffect(() => {
    if (!socket) return

    const handler = (data: SocketMessage) => {
      if (data.vote) {
        setVoteCount((prev) => prev + 1)
      }
    }

    socket.on('vote', handler)

    return () => {
      socket.off('vote', handler)
    }
  }, [socket])

  return (
    <section className='bg-background border-border flex flex-col items-center justify-between gap-y-4 rounded-lg border p-6 shadow-sm'>
      <section className='w-full'>
        <div className='flex items-center justify-start'>
          {voteCount
            .toLocaleString()
            .split('')
            .map((str, i) => (
              <motion.div
                className='grid place-items-start'
                key={`${str}-${i}`}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className='from-primary to-foreground bg-gradient-to-r bg-clip-text text-4xl font-medium text-transparent'>
                  {str}
                </h3>
              </motion.div>
            ))}
        </div>

        <p className='text-muted-foreground'>Orang sudah voting pilihan mereka. Hasil voting sudah ditutup.</p>
      </section>

      <p>Semoga Indonesia maju!</p>

      {/* <Link href='/vote' className='w-full'>
        <Button className={cn('w-full')} type='button' tabIndex={-1}>
          Ikutan voting
        </Button>
      </Link> */}
    </section>
  )
}
