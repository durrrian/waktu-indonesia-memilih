import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

interface Prop {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ searchParams }: Prop) {
  const redirectUrlParam = searchParams.redirect_url ? searchParams.redirect_url.toString() : undefined

  const redirectUrl = redirectUrlParam ? `/login/check-user?redirect_url=${redirectUrlParam}` : '/login/check-user'

  return (
    <AuthenticateWithRedirectCallback
      afterSignInUrl={redirectUrl}
      continueSignUpUrl={redirectUrl}
      afterSignUpUrl={redirectUrl}
      redirectUrl={redirectUrl}
    />
  )
}
