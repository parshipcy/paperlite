import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import logo from '../../assets/paperlite.png'

const Header = () => {
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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" size="small">
            Share
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
