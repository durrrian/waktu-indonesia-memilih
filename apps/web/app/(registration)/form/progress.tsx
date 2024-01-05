'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export const Progress = () => {
  const pathname = usePathname()

  const allProgress = ['/form/1', '/form/2', '/form/3']

  if (!allProgress.includes(pathname)) return null

  const currentProgress = allProgress.findIndex((v) => v === pathname)

  const initialWidth = `${(currentProgress / allProgress.length) * 100}%`
  const animateWidth = `${((currentProgress + 1) / allProgress.length) * 100}%`

  return (
    <div className='w-full h-fit dark:bg-gray-800 bg-gray-300 rounded-full overflow-hidden max-w-[600px] mx-auto'>
      <motion.div
        className='h-[10px] bg-primary rounded-full'
        animate={{ width: animateWidth }}
        initial={{ width: initialWidth }}
        transition={{ duration: 1 }}
      />
    </div>
  )
}
