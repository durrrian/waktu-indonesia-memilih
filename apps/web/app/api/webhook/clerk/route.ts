import type { WebhookEvent } from '@clerk/clerk-sdk-node'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { db } from '@repo/database'

export async function POST(request: Request) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET

    if (!WEBHOOK_SECRET) {
      throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
        status: 400,
      })
    }

    // Get the body
    const payload = await request.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    const evt: WebhookEvent = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent

    if (evt.type === 'user.updated') {
      const { data: clerkData } = evt

      const user = await db.user.findFirstOrThrow({ where: { clerkUserId: clerkData.id } })

      const emailFind = clerkData.email_addresses.find(({ id }) => id === clerkData.primary_email_address_id)

      //it is impossible that a user can have no email
      if (!emailFind) return NextResponse.json({ error: 'No primary email address found!' }, { status: 401 })

      const email = emailFind.email_address
      const photoUrl = clerkData.image_url
      const firstName = clerkData.first_name.trim()
      const lastName = clerkData.last_name.trim()

      const response = await db.user.update({
        where: { id: user.id },
        data: { email, name: `${firstName} ${lastName}`, photoUrl },
      })

      return NextResponse.json(response)
    }

    if (evt.type === 'user.deleted') {
      const { data: clerkData } = evt

      const user = await db.user.findFirst({ where: { clerkUserId: clerkData.id } })

      if (!user) return NextResponse.json({ message: 'User already did not exist!' })

      //voting data
      await db.vote.deleteMany({ where: { userId: user.id } })

      const response = await db.user.delete({ where: { id: user.id } })

      return NextResponse.json(response)
    }

    return NextResponse.json({ error: 'Type of request is not suitable' }, { status: 402 })
  } catch (error) {
    console.error(JSON.stringify(error, null, 2))
    return NextResponse.json({ error }, { status: 500 })
  }
}
