'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'

interface Props {
  size?: number
  theme?: 'dark' | 'light'
}

export const Logo = ({ size = 78, theme }: Props) => {
  const { resolvedTheme } = useTheme()

  const alt = 'Waktu Indonesia Memilih'

  if (resolvedTheme === 'dark' || theme === 'dark') {
    return (
      <Image
        src={'/logo_primary_light.svg'}
        alt={alt}
        width={size}
        height={size}
        draggable={false}
        quality={100}
        suppressHydrationWarning
      />
    )
  }

  return (
    <Image
      src={'/logo_primary_dark.svg'}
      alt={alt}
      width={size}
      height={size}
      draggable={false}
      quality={100}
      suppressHydrationWarning
    />
  )
}
