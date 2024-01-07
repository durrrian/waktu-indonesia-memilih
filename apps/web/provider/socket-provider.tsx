'use client'

import { createContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { Provinsi, RentanUsia } from '@prisma/client'

type SocketContextType = {
  socket: Socket | null
  isConnected: boolean
}

export type SocketMessage = {
  provinsi: Provinsi
  rentanUsia: RentanUsia
  nomorUrut: 1 | 2 | 3
  vote: boolean
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL!!, {
      query: {
        secretCode: process.env.NEXT_PUBLIC_SECRET_CODE,
      },
      path: '/',
    })

    socketInstance.on('connect', () => {
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
}
