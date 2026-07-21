import dotenv from 'dotenv'
import { Server } from 'socket.io'
import connectDB from './config/db.js'
import {
  getDocument,
  updateDocument,
} from './controllers/documentController.js'

dotenv.config()
connectDB()

const PORT = process.env.PORT || 3000

const io = new Server(PORT, {
  // Only requests from http://localhost:5173 using GET and POST are allowed.
  // Without this configuration, the browser would block the Socket.IO connection
  // because the frontend and backend are on different origins.
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

// Registers an event listener for the "connection" event
io.on('connection', (socket) => {
  socket.on('get-document', async (documentId) => {
    const doc = await getDocument(documentId)
    if (!doc) return

    socket.join(documentId)
    socket.emit('receive-document', { content: doc.content })

    socket.on('text-change', (delta) => {
      socket.broadcast.to(documentId).emit('receive-text-change', delta)
    })

    socket.on('save-document', async (content) => {
      await updateDocument(documentId, content)
    })
  })
})
