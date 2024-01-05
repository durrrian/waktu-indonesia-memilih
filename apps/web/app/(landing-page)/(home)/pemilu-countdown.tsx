'use client'

import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const PemiluCountdown = () => {
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' })

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const fetchResponse = await fetch('http://worldtimeapi.org/api/ip')
      const data = await fetchResponse.json()

      const now = new Date(data.datetime)
      const offsetParts = data.utc_offset.split(':')
      const offsetHours = parseInt(offsetParts[0], 10)
      const offsetMinutes = parseInt(offsetParts[1], 10)
      const utcOffsetInMilliseconds = (offsetHours * 60 + offsetMinutes) * 60 * 1000

      const pemilu = new Date(Date.UTC(2024, 1, 14, 0, 0, 0, 0))
      pemilu.setTime(pemilu.getTime() - utcOffsetInMilliseconds)

      const difference = pemilu.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({
        days: days.toString(),
        hours: hours.toString(),
        minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
        seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
      })
    }, 1000)

    return () => clearInterval(intervalId) // Clear interval on component unmount
  }, [])

  const countdownArr = [
    { val: countdown.days, name: 'hari' },
    { val: countdown.hours, name: 'jam' },
    { val: countdown.minutes, name: 'menit' },
    { val: countdown.seconds, name: 'detik' },
  ]

  return (
    <section className='bg-primary text-primary-foreground md:p-10 p-6 rounded-3xl shadow-2xl flex items-center justify-center flex-col gap-y-10'>
      <h6 className='md:text-5xl text-3xl font-medium max-w-[800px] text-center md:leading-[1.5] leading-[1.2]'>
        Jangan lupa gunakan hak pilihmu di Pemilu 2024 ✊!
      </h6>

      <section className='bg-white text-black md:p-10 p-6 rounded-2xl grid gap-10' style={{ boxShadow: '10px 10px' }}>
        <section className='flex items-center justify-center bg-primary/50 rounded-full gap-2 px-4 py-2 font-medium w-fit mx-auto'>
          <Calendar />
          <p>14 Februari 2024</p>
        </section>

        <h6 className='text-primary font-medium md:text-2xl text-xl text-center'>Countdown sampe pemilu 2024!</h6>

        <section className='flex items-center justify-between'>
          {countdownArr.map((entry, i) => (
            <section key={i} className='flex flex-col items-center justify-center gap-2'>
              <p className='text-4xl font-bold'>{entry.val}</p>
              <p className='text-xl font-medium'>{entry.name}</p>
            </section>
          ))}
        </section>
      </section>

      <div className='w-full h-fit flex items-start'>
        <small className='text-xs text-white'>
          Design terinspirasi oleh{' '}
          <Link href={'https://bijakmemilih.id'} target='_blank' className='underline'>
            bijakmemilih.id
          </Link>
          . Btw, kalo dari tim bijak memilih melihat website ini, kita sampe mikirin kalo user gonta ganti kalendar masa
          keganti? Hire kita yaa haha.
        </small>
      </div>
    </section>
  )
}
