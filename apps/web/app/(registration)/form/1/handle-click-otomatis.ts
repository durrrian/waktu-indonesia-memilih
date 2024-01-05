import { Dispatch, SetStateAction } from 'react'
import { Provinsi } from '@prisma/client'
import { FormSchema } from './form'
import * as z from 'zod'
import { UseFormReturn } from 'react-hook-form'

const geoSurfData = [
  { id: 'AC', nama_provinsi: 'ACEH' },
  { id: 'SU', nama_provinsi: 'SUMATERA_UTARA' },
  { id: 'SB', nama_provinsi: 'SUMATERA_BARAT' },
  { id: 'RI', nama_provinsi: 'RIAU' },
  { id: 'JA', nama_provinsi: 'JAMBI' },
  { id: 'SL', nama_provinsi: 'SUMATERA_SELATAN' },
  { id: 'BE', nama_provinsi: 'BENGKULU' },
  { id: '1024', nama_provinsi: 'LAMPUNG' },
  { id: 'BB', nama_provinsi: 'KEPULAUAN_BANGKA_BELITUNG' },
  { id: 'KR', nama_provinsi: 'KEPULAUAN_RIAU' },
  { id: 'JK', nama_provinsi: 'DKI_JAKARTA' },
  { id: 'JR', nama_provinsi: 'JAWA_BARAT' },
  { id: 'JT', nama_provinsi: 'JAWA_TENGAH' },
  { id: 'YO', nama_provinsi: 'DI_YOGYAKARTA' },
  { id: 'JI', nama_provinsi: 'JAWA_TIMUR' },
  { id: 'BT', nama_provinsi: 'BANTEN' },
  { id: 'BA', nama_provinsi: 'BALI' },
  { id: 'NB', nama_provinsi: 'NUSA_TENGGARA_BARAT' },
  { id: 'NT', nama_provinsi: 'NUSA_TENGGARA_TIMUR' },
  { id: 'KB', nama_provinsi: 'KALIMANTAN_BARAT' },
  { id: 'KT', nama_provinsi: 'KALIMANTAN_TENGAH' },
  { id: 'KS', nama_provinsi: 'KALIMANTAN_SELATAN' },
  { id: 'KI', nama_provinsi: 'KALIMANTAN_TIMUR' },
  { id: 'KU', nama_provinsi: 'KALIMANTAN_UTARA' },
  { id: 'SW', nama_provinsi: 'SULAWESI_UTARA' },
  { id: 'ST', nama_provinsi: 'SULAWESI_TENGAH' },
  { id: 'SE', nama_provinsi: 'SULAWESI_SELATAN' },
  { id: 'SG', nama_provinsi: 'SULAWESI_TENGGARA' },
  { id: 'GO', nama_provinsi: 'GORONTALO' },
  { id: 'SR', nama_provinsi: 'SULAWESI_BARAT' },
  { id: 'MA', nama_provinsi: 'MALUKU' },
  { id: 'LA', nama_provinsi: 'MALUKU_UTARA' },
  { id: 'PA', nama_provinsi: 'PAPUA' },
  { id: 'IB', nama_provinsi: 'PAPUA_BARAT' },
]

export const handleClickOtomatis = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setErrorMsg: Dispatch<SetStateAction<string>>,
  form: UseFormReturn<z.infer<typeof FormSchema>>,
) => {
  try {
    setLoading(true)
    setErrorMsg('')

    const fetchResponse = await fetch(`https://geo.geosurf.io/`)

    if (!fetchResponse.ok) {
      setErrorMsg('Error mendeteksi lokasimu secara otomatis!')
      return
    }

    const data = await fetchResponse.json()

    const searchData = geoSurfData.find((v) => v.id === data.state)

    if (!searchData) {
      setErrorMsg('Error mendeteksi lokasimu secara otomatis!')
      return
    }

    const searchWithDb = Object.values(Provinsi).find((v) => v === searchData.nama_provinsi)

    if (!searchWithDb) {
      setErrorMsg('Error mendeteksi lokasimu secara otomatis!')
      return
    }

    form.setValue('provinsi', searchWithDb)
  } catch (error) {
    console.error(error)
    setErrorMsg('Error mendeteksi lokasimu secara otomatis!')
  } finally {
    setLoading(false)
  }
}
