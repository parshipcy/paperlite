import { useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './Editor.css'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import io from 'socket.io-client'

const StyledEditor = styled('div')({
  backgroundColor: '#f5f5f5',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '90%',
  margin: '24px auto',
  padding: '16px',
  boxSizing: 'border-box',
})

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],

  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ['clean'],
]

const Editor = () => {
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()

  // Initialize Quill
  useEffect(() => {
    // Important: Quill needs a real DOM element. That's why there's <Box id="editor" /> in the JSX below
    const quillServer = new Quill('#editor', {
      theme: 'snow',
      modules: { toolbar: toolbarOptions },
    })
    setQuill(quillServer)
  }, [])


  // Connect to backend
  useEffect(() => {
    const socketServer = io('http://localhost:3000')
    setSocket(socketServer)

    // Without cleanup, the socket would remain connected,
    // potentially causing memory leaks or duplicate connections if the component mounts again.
    return () => {
      socketServer.disconnect()
    }
  }, [])


  // Send text changes to the backend
  useEffect(() => {
    if (!socket || !quill) return

    const handleTextChange = (delta, _oldDelta, source) => {
      if (source !== 'user') {
        return
      }
      socket.emit('text-change', delta)
    }

    quill && quill.on('text-change', handleTextChange)

    return () => {
      quill && quill.off('text-change', handleTextChange)
    }
  }, [socket, quill])


  // Receive text changes
  useEffect(() => {
    if (!socket || !quill) return

    const handleReceiveTextChange = (delta) => {
      quill.updateContents(delta)
    }

    socket && socket.on('receive-text-change', handleReceiveTextChange)

    return () => {
      socket && socket.off('receive-text-change', handleReceiveTextChange)
    }
  }, [socket, quill])

  return (
    <StyledEditor className="paperlite-editor">
      {/* sx prop is Material UI's way of writing CSS */}
      <Box id="editor" sx={{ flex: 1, minHeight: 0 }} />
    </StyledEditor>
  )
}

export default Editor
