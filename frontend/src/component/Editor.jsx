import {useEffect} from 'react'

import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import {Box} from '@mui/material'

const Editor = () => {
    useEffect(() => {
        const quill = new Quill('#editor', {theme: 'snow'})
    }, [])

    return(
        <Box id="editor" sx={{overflow: 'hidden', display: 'flex', height: '100%', width: '100%'}}>

        </Box>
    )
}

export default Editor;