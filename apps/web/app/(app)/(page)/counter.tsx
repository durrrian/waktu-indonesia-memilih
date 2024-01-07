'use client'

import { useSocket } from '@/hooks/use-socket'
import { SocketMessage } from '@/provider/socket-provider'
import { motion } from 'framer-motion'
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
    <div className='bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 p-1 rounded-3xl w-fit h-fit'>
      <div className='bg-background rounded-3xl w-fit h-fit p-4 grid gap-4'>
        <div className='grid gap-2'>
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
                  <h3 className='md:text-6xl text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500'>
                    {str}
                  </h3>
                </motion.div>
              ))}
          </div>

          <p className='md:text-2xl text-xl'>Sudah menentukan pilihan mereka</p>
        </div>

        <small>Hasil diupdate secara realtime loh!</small>
      </div>
    </div>
  )
}
