import Box from '@mui/material/Box'
import Editor from './component/Editor'
import Header from './component/Header'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '97vh' }}>
      <Header />
      <Editor />
    </Box>
  )
}

export default App
