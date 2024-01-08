import { Card, CardContent, CardFooter, CardHeader } from '@repo/web-ui/components'
import { Metadata } from 'next'
import Link from 'next/link'
import { Form } from './form'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'WIM — Daftar Pemilih Tetap',
  }
}

export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <h1 className='md:text-3xl text-2xl font-semibold'>Pencarian Data Pemilih Pemilu 2024</h1>
        <p className='md:text-xl text-lg'>Data Hasil Penetapan DPT oleh KPU Kabupaten/Kota</p>
      </CardHeader>

      <CardContent>
        <Form />
      </CardContent>

      <CardFooter>
        <small>
          Data diambil dari website resmi{' '}
          <Link href='https://cekdptonline.kpu.go.id' target='_blank' className='underline'>
            KPU
          </Link>
          .
        </small>
      </CardFooter>
    </Card>
  )
}
