import { Server } from 'socket.io'

const io = new Server(3000, {
  // Only requests from http://localhost:5173 using GET and POST are allowed.
  // Without this configuration, the browser would block the Socket.IO connection
  // because the frontend and backend are on different origins.
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

// Registers an event listener for the "connection" event
io.on('connection', (socket) => {
  socket.on('text-change', (delta) => {
    socket.broadcast.emit('receive-text-change', delta)
  })
})
