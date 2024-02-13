'use client'

import { NO1_BAR_COLOR, NO2_BAR_COLOR, NO3_BAR_COLOR, makePercentage, namaKandidat } from '@/lib/recharts'
import cn from '@repo/tailwind-config/cn'
import { Badge } from '@repo/web-ui/components'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Vote, Candidate, User, Provinsi } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useSocket } from '@/hooks/use-socket'
import { SocketMessage } from '@/provider/socket-provider'

interface Props {
  vote: (Vote & { candidate: Candidate } & { user: User })[]
}

export const VotesGroupbyProvince = ({ vote }: Props) => {
  const filterData = vote.map((val) => {
    return {
      provinsi: val.user.provinsi ?? 'DKI_JAKARTA',
      nomorUrut: val.candidate.nomorUrut as 1 | 2 | 3,
    }
  })

  const initialData = filterData.reduce(
    (
      acc: {
        name: Provinsi
        no1: number
        no2: number
        no3: number
        [key: string]: any
      }[],
      val,
    ) => {
      const index = acc.findIndex((item) => item.name === val.provinsi)
      if (index !== -1) {
        acc[index]['no' + val.nomorUrut]++
      }
      return acc
    },
    Object.values(Provinsi)
      .map((val) => {
        return {
          name: val,
          no1: 0,
          no2: 0,
          no3: 0,
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name)),
  )

  const [data, setData] = useState(initialData)

  const { socket } = useSocket()

  useEffect(() => {
    if (!socket) return

    const handler = (message: SocketMessage) => {
      if (!message.vote) return

      setData((prev) => {
        const prevData = [...prev]

        const index = prevData.findIndex((val) => val.name === message.provinsi)

        if (message.nomorUrut === 1) {
          prevData[index].no1 = prevData[index].no1 + 1
        }

        if (message.nomorUrut === 2) {
          prevData[index].no2 = prevData[index].no2 + 1
        }

        if (message.nomorUrut === 3) {
          prevData[index].no3 = prevData[index].no3 + 1
        }

        return prevData
      })
    }

    socket.on('vote', handler)

    return () => {
      socket.off('vote', handler)
    }
  }, [socket])

  return (
    <section className='bg-background border-border grid gap-8 rounded-lg border p-4'>
      <h6 className='text-xl font-medium'>Hasil berdasarkan lokasi</h6>
      <ResponsiveContainer width='100%' height={2000}>
        <BarChart width={500} height={300} data={makePercentage(data)} layout='vertical'>
          <XAxis type='number' domain={[0, 100]} ticks={[0, 50, 100]} />

          <YAxis type='category' dataKey='name' mirror={true} />

          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || (payload && !payload.length)) return null

              const maxValue = Math.max(...payload.map((entry) => Number(entry.value)))

              return (
                <div className='bg-secondary grid gap-4 rounded-lg p-4'>
                  <Badge className={cn('w-fit')}>{label.split('_').join(' ')}</Badge>

                  <section>
                    {payload.map((entry, index) => {
                      const isMaxValue = Number(entry.value) === maxValue && Number(entry.value) !== 0

                      return (
                        <p key={`tooltip-${index}`}>
                          <span className={cn(isMaxValue ? 'text-primary' : 'text-foreground', 'font-medium')}>
                            {namaKandidat[index]}:{' '}
                          </span>

                          <strong className={cn(isMaxValue ? 'text-primary' : 'text-foreground')}>
                            {Math.round(Number(entry.value))}%
                          </strong>
                        </p>
                      )
                    })}
                  </section>
                </div>
              )
            }}
          />

          <Legend
            content={({ payload }) => (
              <ul className='mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4'>
                {payload?.map((entry, index) => {
                  return (
                    <li key={`item-${index}`} className='flex items-center justify-center gap-1'>
                      <div className='h-4 w-4 rounded-full' style={{ backgroundColor: entry.color }} />
                      {namaKandidat[index]}
                    </li>
                  )
                })}
              </ul>
            )}
          />

          <Bar dataKey='no1' fill={NO1_BAR_COLOR} stackId='a' radius={[0, 0, 0, 0]} opacity={0.5} />

          <Bar dataKey='no2' fill={NO2_BAR_COLOR} stackId='a' radius={[0, 0, 0, 0]} opacity={0.5} />

          <Bar dataKey='no3' fill={NO3_BAR_COLOR} stackId='a' radius={[0, 10, 10, 0]} opacity={0.5} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}
