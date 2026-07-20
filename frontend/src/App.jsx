import { useRef } from 'react'
import Box from '@mui/material/Box'
import Editor from './component/Editor'
import Header from './component/Header'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

function DocPage() {
  const quillRef = useRef(null)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '97vh' }}>
      <Header quillRef={quillRef} />
      <Editor quillRef={quillRef} />
    </Box>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/doc/${uuid()}`} />} />
        <Route path="/doc/:id" element={<DocPage />} />
      </Routes>
    </Router>
  )
}

export default App
