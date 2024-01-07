'use client'

import { useSocket } from '@/hooks/use-socket'
import useViewport from '@/hooks/use-viewport'
import { NO1_BAR_COLOR, NO2_BAR_COLOR, NO3_BAR_COLOR, namaKandidat } from '@/lib/recharts'
import { SocketMessage } from '@/provider/socket-provider'
import { useEffect, useState } from 'react'
import { BarChart, Bar, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Props {
  no1: number
  no2: number
  no3: number
}

const makePercentage = (
  incomingData: {
    no1: number
    no2: number
    no3: number
  }[],
) => {
  const data = incomingData[0]

  const total = data.no1 + data.no2 + data.no3

  return {
    data: [
      {
        no1: Math.round((data.no1 * 100) / total),
        no2: Math.round((data.no2 * 100) / total),
        no3: Math.round((data.no3 * 100) / total),
      },
    ],
    total,
  }
}

export const TotalVote = ({ no1, no2, no3 }: Props) => {
  const { xs, sm, md } = useViewport()
  const isMobile = xs || sm || md

  const initialData = [
    {
      no1,
      no2,
      no3,
    },
  ]

  const [data, setData] = useState(initialData)

  const { socket } = useSocket()

  useEffect(() => {
    if (!socket) return

    const handler = (message: SocketMessage) => {
      if (message.vote) {
        setData((prev) => {
          if (message.nomorUrut === 1) {
            const data = { ...prev[0] }

            data.no1 = data.no1 + 1

            return [data]
          }

          if (message.nomorUrut === 2) {
            const data = { ...prev[0] }

            data.no2 = data.no2 + 1

            return [data]
          }

          const data = { ...prev[0] }

          data.no3 = data.no3 + 1

          return [data]
        })
      }
    }

    socket.on('vote', handler)

    return () => {
      socket.off('vote', handler)
    }
  }, [socket])

  const { total, data: transformedData } = makePercentage(data)

  return (
    <section className='bg-background border border-border rounded-lg p-4 grid gap-8'>
      <h6 className='font-medium text-xl'>Pasangan yang unggul</h6>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart width={500} height={300} data={transformedData} barGap={isMobile ? 40 : 100}>
          <YAxis domain={[0, 50]} mirror={true} ticks={[0, 25, 50]} />

          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || (payload && !payload.length)) return null

              return (
                <div className='bg-secondary p-4 rounded-lg'>
                  {payload.map((entry, index) => (
                    <p key={`tooltip-${index}`}>
                      <span className='font-medium'>{namaKandidat[index]}</span>:{' '}
                      {Math.round((Number(entry.value) * total) / 100).toLocaleString()} vote
                    </p>
                  ))}
                </div>
              )
            }}
          />

          <Legend
            content={({ payload }) => (
              <ul className='flex items-center justify-center flex-wrap gap-x-8 gap-y-4 mt-4'>
                {payload?.map((entry, index) => {
                  return (
                    <li key={`item-${index}`} className='flex items-center justify-center gap-1'>
                      <div className='w-4 h-4 rounded-full' style={{ backgroundColor: entry.color }} />
                      {namaKandidat[index]}
                    </li>
                  )
                })}
              </ul>
            )}
          />

          <Bar dataKey='no1' fill={NO1_BAR_COLOR} radius={[10, 10, 0, 0]} />

          <Bar dataKey='no2' fill={NO2_BAR_COLOR} radius={[10, 10, 0, 0]} />

          <Bar dataKey='no3' fill={NO3_BAR_COLOR} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}
