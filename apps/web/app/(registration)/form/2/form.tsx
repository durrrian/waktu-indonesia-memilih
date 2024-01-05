'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import cn from '@repo/tailwind-config/cn'
import {
  Button,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as ReactForm,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/web-ui/components'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { onSubmit } from './on-submit'
import { RentanUsia } from '@prisma/client'
import { ArrowRight, Terminal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Alert } from '../alert'

export const FormSchema = z.object({
  rentanUsia: z.string({ required_error: 'Wajib memilih rentang usia!' }),
})

export function Form() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const router = useRouter()

  const mapData = Object.values(RentanUsia).map((v) => ({
    db: v,
    name: (() => {
      if (v === 'UNDER_17') return 'dibawah 17 tahun'
      if (v === 'BETWEEN_17_AND_25') return '17 — 25 tahun'
      if (v === 'BETWEEN_26_AND_35') return '26 — 35 tahun'
      if (v === 'BETWEEN_36_AND_45') return '36 — 45 tahun'
      return 'diatas 45 tahun'
    })(),
  }))

  return (
    <ReactForm {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data)

          if (data.rentanUsia === 'UNDER_17') {
            router.push('/not-allowed')
            return
          }

          router.push('/vote')
        })}
        className='w-full grid gap-20'
      >
        <FormField
          control={form.control}
          name='rentanUsia'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rentan usia kamu</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih rentan usia kamu' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mapData.map((entry) => (
                    <SelectItem value={entry.db} key={entry.db}>
                      {entry.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Pilih rentan usia kamu yuk!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className={cn('w-full')}>
          Lanjut <ArrowRight className='ml-2 w-4 h-4' />
        </Button>
      </form>

      <Alert />
    </ReactForm>
  )
}
