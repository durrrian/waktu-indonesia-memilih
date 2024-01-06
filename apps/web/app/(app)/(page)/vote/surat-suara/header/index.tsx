'use client'

import Image from 'next/image'
import { Divider } from './divider'
import KPU from './image/logo_kpu.png'
import PSIB from './image/logo_pemilu_sarana_integrasi_bangsa.png'
import useViewport from '@/hooks/use-viewport'

export const Header = () => {
  const { xs, sm, md } = useViewport()

  const isMobile = xs || sm || md

  const size = isMobile ? 70 : 140

  return (
    <div>
      <div className='bg-[#F31C19] text-white flex items-center justify-between text-center w-full h-fit p-4'>
        <Image src={KPU} alt='logo KPU' height={size} draggable={false} quality={100} />

        <h1 className='md:text-5xl text-2xl font-bold'>SURAT SUARA</h1>

        <Image src={PSIB} alt='logo PSIB' height={size} draggable={false} quality={100} />
      </div>

      <div className='relative bg-[#F31C19]'>
        <Divider />
      </div>

      <div className='bg-[#F5F5F5] text-black flex flex-col items-center justify-center text-center font-bold md:text-4xl text-xl gap-3 pt-20 pb-10'>
        <h6>PEMILIHAN UMUM</h6>

        <h6>PRESIDEN DAN WAKIL PRESIDEN</h6>

        <h6>REPUBLIK INDONESIA</h6>

        <h6>TAHUN 2024</h6>
      </div>
    </div>
  )
}
