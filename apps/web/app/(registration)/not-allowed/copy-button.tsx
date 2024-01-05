'use client'

import parseUrl from '@/lib/parse-url'
import cn from '@repo/tailwind-config/cn'
import { Button } from '@repo/web-ui/components'
import { toast } from 'sonner'

interface Props {
  email: string
}

export const CopyButton = ({ email }: Props) => {
  return (
    <Button
      type='button'
      className={cn('w-full')}
      onClick={() => {
        const url = parseUrl(`/?ref=${email}`).href

        toast.promise(navigator.clipboard.writeText(url), {
          loading: 'Copying...',
          success: 'Copied to clipboard',
          error: 'Failed to copy',
        })
      }}
    >
      Sharekeun
    </Button>
  )
}
