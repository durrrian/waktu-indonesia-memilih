'use server'

import * as z from 'zod'
import { FormSchema } from './form'
import { currentUser } from '@/lib/current-user'
import getDpt from 'defer/src/getDpt'
import { redirect } from 'next/navigation'

export const onSubmit = async (data: z.infer<typeof FormSchema>) => {
  const user = await currentUser()

  if (!user) return

  await getDpt(user.id, data.noKtp)

  return redirect('/dpt')
}
