import { currentUser } from '@clerk/nextjs'
import { db } from '@repo/database'
import { notFound, redirect } from 'next/navigation'

interface Prop {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: Prop) {
  const redirectUrlParam = searchParams.redirect_url ? searchParams.redirect_url.toString() : undefined

  const clerkUser = await currentUser()

  if (!clerkUser) return notFound()

  const clerkUserId = clerkUser.id
  const emailAddress = clerkUser.emailAddresses.find((v) => v.id === clerkUser.primaryEmailAddressId)
  const name = (() => {
    if (clerkUser.firstName && clerkUser.lastName) {
      return `${clerkUser.firstName} ${clerkUser.lastName}`
    }

    return clerkUser.firstName
  })()
  const photoUrl = clerkUser.hasImage ? clerkUser.imageUrl : null

  if (!name || !emailAddress) return notFound

  const user = await db.user.findUnique({ where: { clerkUserId: clerkUser.id } })

  const form1 = redirectUrlParam ? `/form/1?redirect_url=${redirectUrlParam}` : '/form/1'
  const form2 = redirectUrlParam ? `/form/2?redirect_url=${redirectUrlParam}` : '/form/2'

  if (!user) {
    await db.user.create({ data: { clerkUserId, email: emailAddress.emailAddress, name, photoUrl } })

    return redirect(form1)
  }

  const provinsi = user.provinsi
  if (!provinsi) return redirect(form1)

  const rentanUsia = user.rentanUsia
  if (!rentanUsia) return redirect(form2)

  return redirect(redirectUrlParam ? decodeURIComponent(redirectUrlParam) : '/vote')
}
