'use client'

import { useSignIn } from '@clerk/nextjs'
import cn from '@repo/tailwind-config/cn'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Props {
  redirectUrlParam: string | undefined
}

export const SigninWithGoogle = ({ redirectUrlParam }: Props) => {
  const { isLoaded, signIn } = useSignIn()

  if (!isLoaded) return null

  const redirectUrl = redirectUrlParam ? `/login/sso-callback?redirect_url=${redirectUrlParam}` : '/login/sso-callback'

  const redirectUrlComplete = redirectUrlParam
    ? `/login/check-user?redirect_url=${redirectUrlParam}`
    : '/login/check-user'

  return (
    <motion.button
      type='button'
      animate={{ opacity: 1 }}
      whileHover={{ scale: [null, 1.1, 1.05] }}
      transition={{ duration: 0.5 }}
      className={cn(
        'border-border bg-background text-foreground flex h-fit w-full select-none items-center justify-start gap-3 rounded-md border-2 px-4 py-2 text-sm shadow-sm',
      )}
      onClick={async () => {
        await signIn.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl,
          redirectUrlComplete,
        })
      }}
    >
      <Image src='/google.svg' alt={`Google logo`} width={18} height={18} draggable={false} />
      Sign in with Google
    </motion.button>
  )
}
