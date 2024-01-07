'use client'

import { SocketContext } from '@/provider/socket-provider'
import { useContext } from 'react'

export const useSocket = () => {
  const context = useContext(SocketContext)

  if (context === undefined) {
    throw new Error('useViewport must be used within a ViewportProvider')
  }

  return context
}
