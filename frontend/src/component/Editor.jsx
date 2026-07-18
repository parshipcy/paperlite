import { useEffect } from 'react'

import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './Editor.css'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const StyledEditor = styled('div')({
  backgroundColor: '#f5f5f5',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
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
  useEffect(() => {
    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: { toolbar: toolbarOptions },
    })
  }, [])

  return (
    <StyledEditor>
      <Box id="editor" sx={{ flex: 1, minHeight: 0 }} />
    </StyledEditor>
  )
}

export default Editor
