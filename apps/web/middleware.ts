import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import parseUrl from '@/lib/parse-url'
import { db } from '@repo/database'

export default authMiddleware({
  publicRoutes: [
    '/login(.*)',
    '/',
    '/kebijakan-privasi',
    '/terms-of-service',
    '/form(.*)',
    '/not-allowed',
    '/api/webhook/clerk',
    '/invite(.*)',
    '/metrics',
  ],

  async afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      try {
        const user = await db.user.findUnique({ where: { clerkUserId: auth.userId }, include: { vote: true } })

        if (user) {
          const provinsi = user.provinsi
          if (!provinsi) return NextResponse.redirect(parseUrl('/form/1'))

          const rentanUsia = user.rentanUsia
          if (!rentanUsia) return NextResponse.redirect(parseUrl('/form/2'))

          if (rentanUsia === 'UNDER_17') return NextResponse.redirect(parseUrl('/not-allowed'))
        }

        return NextResponse.next()
      } catch (error) {
        console.error(error)
      }
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
