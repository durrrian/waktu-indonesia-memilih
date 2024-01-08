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
  Input,
  LoadingSpinner,
  Form as ReactForm,
} from '@repo/web-ui/components'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { onSubmit } from './on-submit'
import { Search } from 'lucide-react'
import { useServerAction } from '@/hooks/use-server-actions'

export const FormSchema = z.object({
  noKtp: z
    .string({ required_error: 'Silahkan input No. KTP kamu!' })
    .min(16, { message: 'No. KTP harus 16 digit!' })
    .max(16, { message: 'No. KTP harus 16 digit!' })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: 'No. KTP harus berisi angka saja!',
    }),
})

export function Form() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
  })

  const [handleSubmit, isPending] = useServerAction(onSubmit)

  return (
    <ReactForm {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data)
        })}
        className='w-full grid gap-8 my-16'
      >
        <FormField
          control={form.control}
          name='noKtp'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn('text-card-foreground md:text-xl text-lg')}>No. KTP (NIK)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='3812980912349999'
                  className={cn('bg-card text-card-foreground text-lg px-4 py-6 placeholder:text-card-foreground/50')}
                />
              </FormControl>
              <FormDescription className={cn('text-card-foreground')}>
                Silahkan input No. KTP yang berisikan 16 angka!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          size='lg'
          className={cn('w-full text-md')}
          disabled={form.formState.isSubmitting || form.formState.isLoading || isPending}
        >
          {isPending && <LoadingSpinner className='mr-2' />} Pencarian <Search className='ml-2 w-4 h-4' />
        </Button>
      </form>
    </ReactForm>
  )
}
