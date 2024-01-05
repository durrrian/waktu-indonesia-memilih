'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'

interface Props {
  size?: number
}

export const Logo = ({ size = 78 }: Props) => {
  const { resolvedTheme } = useTheme()

  const alt = 'Waktu Indonesia Memilih'

  if (resolvedTheme === 'dark') {
    return (
      <Image src={'/logo_primary_light.svg'} alt={alt} width={size} height={size} draggable={false} quality={100} />
    )
  }

  return <Image src={'/logo_primary_dark.svg'} alt={alt} width={size} height={size} draggable={false} quality={100} />
}
