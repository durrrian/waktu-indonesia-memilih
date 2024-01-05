'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import cn from '@repo/tailwind-config/cn'
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  LoadingSpinner,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Form as ReactForm,
} from '@repo/web-ui/components'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { onSubmit } from './on-submit'
import { Provinsi } from '@prisma/client'
import { ChevronsUpDown, ArrowRight, Terminal } from 'lucide-react'
import { useState } from 'react'
import { handleClickOtomatis } from './handle-click-otomatis'
import { useRouter } from 'next/navigation'
import { Alert } from '../alert'

export const FormSchema = z.object({
  provinsi: z.string({ required_error: 'Wajib memilih domisili provinsi!' }),
})

export function Form() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const router = useRouter()

  const [open, setOpen] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')

  const [loadingGeoloc, setLoadingGeoloc] = useState(false)

  return (
    <ReactForm {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data)
          router.push('/form/2')
        })}
        className='w-full grid gap-20'
      >
        <div className='grid gap-4'>
          <FormField
            control={form.control}
            name='provinsi'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel>Pilih domisili kamu</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                      >
                        {field.value
                          ? Object.values(Provinsi)
                              .find((provinsi) => provinsi === field.value)
                              ?.replaceAll('_', ' ')
                          : 'Pilih provinsi'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0'>
                    <Command>
                      <CommandInput placeholder='Cari provinsi...' />
                      <CommandEmpty>Provinsi tidak ditemukan.</CommandEmpty>
                      <CommandGroup className={cn('max-h-96 h-fit overflow-y-auto')}>
                        {Object.values(Provinsi)
                          .sort()
                          .map((provinsi) => (
                            <CommandItem
                              value={provinsi}
                              key={provinsi}
                              onSelect={() => {
                                form.setValue('provinsi', provinsi)
                                setOpen(false)
                              }}
                            >
                              {provinsi.replaceAll('_', ' ')}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Pilih provinsi domisili kamu.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>atau</span>
            </div>
          </div>

          <Button
            variant='outline'
            type='button'
            className={cn('mx-auto w-fit')}
            onClick={() => {
              handleClickOtomatis(setLoadingGeoloc, setErrorMsg, form)
            }}
            disabled={loadingGeoloc}
          >
            {loadingGeoloc && <LoadingSpinner className='mr-2' />} Pilih otomatis
          </Button>

          {errorMsg && <p className='text-destructive text-sm'>{errorMsg}</p>}
        </div>

        <Button
          type='submit'
          className={cn('w-full')}
          disabled={loadingGeoloc || form.formState.isSubmitting || form.formState.isLoading}
        >
          Lanjut <ArrowRight className='ml-2 w-4 h-4' />
        </Button>
      </form>

      <Alert />
    </ReactForm>
  )
}
