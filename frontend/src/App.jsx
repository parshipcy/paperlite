import Box from '@mui/material/Box'
import Editor from './component/Editor'
import Header from './component/Header'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/doc/${uuid()}`} />} />
        <Route path={"/doc/:id"} element={<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '97vh' }}>
          <Header />
          <Editor />
        </Box>} />
      </Routes>
    </Router>
  )
}

export default App
