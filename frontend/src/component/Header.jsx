import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { useParams } from 'react-router-dom'

import logo from '../../assets/paperlite.png'
import { exportDocumentAsPdf } from '../utils/exportPdf'

const Header = ({ quillRef }) => {
  const { id } = useParams()
  const [isExporting, setIsExporting] = useState(false)

  const handleDownloadPdf = async () => {
    if (!quillRef?.current || isExporting) return

    setIsExporting(true)
    try {
      await exportDocumentAsPdf(quillRef.current, id)
    } catch (error) {
      console.error('Failed to export PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: { xs: 40, sm: 40 },
          py: 0.5,
          px: 2,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" src={logo} alt="PaperLite" sx={{ height: 30 }} />
          <Typography
            sx={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 500,
              fontSize: '1.25rem',
              letterSpacing: '-0.03em',
            }}
          >
            Paper
            <Box component="span" sx={{ color: 'blue' }}>
              lite
            </Box>
          </Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          Made with
          <FavoriteIcon sx={{ fontSize: 14, color: '#e8836f' }} />
          by Parship
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Download as PDF">
            <span>
              <IconButton
                size="small"
                onClick={handleDownloadPdf}
                disabled={isExporting}
                aria-label="Download as PDF"
              >
                {isExporting ? (
                  <CircularProgress size={20} />
                ) : (
                  <PictureAsPdfIcon fontSize="small" />
                )}
              </IconButton>
            </span>
          </Tooltip>
          <Button variant="outlined" size="small">
            Share
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
