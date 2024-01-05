'use server'

import * as z from 'zod'
import { FormSchema } from './form'
import { db } from '@repo/database'
import { currentUser } from '@/lib/current-user'
import { Provinsi } from '@prisma/client'

export const onSubmit = async (data: z.infer<typeof FormSchema>) => {
  const user = await currentUser()

  if (!user) return

  await db.user.update({ where: { id: user.id }, data: { provinsi: data.provinsi as Provinsi } })
}
