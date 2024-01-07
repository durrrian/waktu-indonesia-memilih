import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())

const port = process.env.PORT || 8080
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  path: '/', // Set the path for socket.io to '/'
})

io.use((socket, next) => {
  const secretCode = socket.handshake.query.secretCode

  if (!secretCode || secretCode !== process.env.NEXT_PUBLIC_SECRET_CODE) {
    next(new Error('Authentication error'))
  } else {
    next()
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('send-vote', (message) => {
    // Emit the received message back to the client
    io.emit('vote', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`listening on *:${port}`)
})
