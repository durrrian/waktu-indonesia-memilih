'use client'

import useViewport from '@/hooks/use-viewport'
import { NO1_BAR_COLOR, NO2_BAR_COLOR, NO3_BAR_COLOR, namaKandidat } from '@/lib/recharts'
import { BarChart, Bar, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Props {
  no1: number
  no2: number
  no3: number
}

export const TotalVote = ({ no1, no2, no3 }: Props) => {
  const { xs, sm, md } = useViewport()
  const isMobile = xs || sm || md

  const total = no1 + no2 + no3

  const data = [
    {
      no1: (no1 / total) * 100,
      no2: (no2 / total) * 100,
      no3: (no3 / total) * 100,
    },
  ]

  return (
    <section className='bg-background border border-border rounded-lg p-4 grid gap-8'>
      <h6 className='font-medium text-xl'>Pasangan yang unggul</h6>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart width={500} height={300} data={data} barGap={isMobile ? 40 : 100}>
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
