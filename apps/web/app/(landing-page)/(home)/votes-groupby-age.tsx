'use client'

import useViewport from '@/hooks/use-viewport'
import { NO1_BAR_COLOR, NO2_BAR_COLOR, NO3_BAR_COLOR, makePercentage, namaKandidat } from '@/lib/recharts'
import cn from '@repo/tailwind-config/cn'
import { Badge } from '@repo/web-ui/components'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Vote, Candidate, User } from '@prisma/client'

interface Props {
  vote: (Vote & { candidate: Candidate } & { user: User })[]
}

export const VotesGroupbyAge = ({ vote }: Props) => {
  const { xs, sm, md } = useViewport()
  const isMobile = xs || sm || md

  const filterData: { rentanUsia: '17—25' | '26—35' | '36—45' | '45>'; nomorUrut: 1 | 2 | 3 }[] = vote.map((val) => {
    const rentanUsia = (() => {
      if (val.user.rentanUsia === 'BETWEEN_17_AND_25') return '17—25'
      if (val.user.rentanUsia === 'BETWEEN_26_AND_35') return '26—35'
      if (val.user.rentanUsia === 'BETWEEN_36_AND_45') return '36—45'
      if (val.user.rentanUsia === 'OVER_45') return '45>'

      return '17—25'
    })()

    return {
      rentanUsia,
      nomorUrut: val.candidate.nomorUrut as 1 | 2 | 3,
    }
  })

  const data = filterData.reduce(
    (
      acc: { name: '17—25' | '26—35' | '36—45' | '45>'; no1: number; no2: number; no3: number; [key: string]: any }[],
      val,
    ) => {
      const index = acc.findIndex((item) => item.name === val.rentanUsia)
      if (index !== -1) {
        acc[index]['no' + val.nomorUrut]++
      }
      return acc
    },
    [
      { name: '17—25', no1: 0, no2: 0, no3: 0 },
      { name: '26—35', no1: 0, no2: 0, no3: 0 },
      { name: '36—45', no1: 0, no2: 0, no3: 0 },
      { name: '45>', no1: 0, no2: 0, no3: 0 },
    ],
  )

  const percentageData = makePercentage(data)

  return (
    <section className='bg-background border border-border rounded-lg p-4 grid gap-8'>
      <h6 className='font-medium text-xl'>Hasil berdasarkan usia</h6>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart width={500} height={300} data={percentageData} layout='vertical'>
          <XAxis type='number' />

          <YAxis type='category' dataKey='name' tick={{ fontSize: isMobile ? 12 : 15 }} />

          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || (payload && !payload.length)) return null

              const maxValue = Math.max(...payload.map((entry) => Number(entry.value)))

              return (
                <div className='bg-secondary p-4 rounded-lg grid gap-4'>
                  <Badge className={cn('w-fit')}>{label} tahun</Badge>

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

          <Bar dataKey='no1' fill={NO1_BAR_COLOR} stackId='a' radius={[0, 0, 0, 0]} />

          <Bar dataKey='no2' fill={NO2_BAR_COLOR} stackId='a' radius={[0, 0, 0, 0]} />

          <Bar dataKey='no3' fill={NO3_BAR_COLOR} stackId='a' radius={[0, 10, 10, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}
