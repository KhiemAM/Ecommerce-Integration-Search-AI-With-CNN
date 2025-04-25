import React, { useState } from 'react'
import { Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import {
  Box,
  Container,
  Grid2,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Link,
  Paper,
  Stack,
  Divider,
  styled
} from '@mui/material'

const StyledIconButton = styled(IconButton)(() => ({
  color: 'white',
  '&:hover': {
    transform: 'scale(1.1)',
    transition: 'transform 0.3s ease-in-out'
  }
}))

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: '#fff',
    transform: 'translateX(8px)',
    transition: 'all 0.3s ease-in-out',
    display: 'inline-block'
  }
})

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Subscribing email:', email)
    setEmail('')
  }

  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 8 }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          {/* Exclusive Section */}
          <Grid2 item xs={12} md={2.4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                background: 'linear-gradient(to right, #fff, #999)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Exclusive
            </Typography>
            <Stack spacing={2}>
              <Typography variant="h6">Subscribe</Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Get 10% off your first order
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex' }}>
                <TextField
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  sx={{
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                />
                <IconButton
                  type="submit"
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                    borderRadius: '0 4px 4px 0'
                  }}
                >
                  <Send size={20} />
                </IconButton>
              </Box>
            </Stack>
          </Grid2>

          {/* Support Section */}
          <Grid2 item xs={12} md={2.4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                background: 'linear-gradient(to right, #fff, #999)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Support
            </Typography>
            <Stack spacing={1} sx={{ color: 'grey.400' }}>
              <Typography variant="body2">
                111 Bijoy sarani, Dhaka,
                <br />
                DH 1515, Bangladesh.
              </Typography>
              <Typography variant="body2">exclusive@gmail.com</Typography>
              <Typography variant="body2">+88015-88888-9999</Typography>
            </Stack>
          </Grid2>

          {/* Account Section */}
          <Grid2 item xs={12} md={2.4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                background: 'linear-gradient(to right, #fff, #999)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Account
            </Typography>
            <List dense sx={{ color: 'grey.400' }}>
              {['My Account', 'Login / Register', 'Cart', 'Wishlist', 'Shop'].map((item) => (
                <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                  <StyledLink href="#">
                    <ListItemText primary={item} />
                  </StyledLink>
                </ListItem>
              ))}
            </List>
          </Grid2>

          {/* Quick Link Section */}
          <Grid2 item xs={12} md={2.4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                background: 'linear-gradient(to right, #fff, #999)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Quick Link
            </Typography>
            <List dense sx={{ color: 'grey.400' }}>
              {['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact'].map((item) => (
                <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                  <StyledLink href="#">
                    <ListItemText primary={item} />
                  </StyledLink>
                </ListItem>
              ))}
            </List>
          </Grid2>

          {/* Download App Section */}
          <Grid2 item xs={12} md={2.4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                background: 'linear-gradient(to right, #fff, #999)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Download App
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Save $3 with App New User Only
              </Typography>
              <Grid2 container spacing={2}>
                <Grid2 item xs={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      p: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.4)'
                      }
                    }}
                  >
                    <img
                      src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
                      alt="Get it on Google Play"
                      style={{ height: '32px', width: 'auto' }}
                    />
                  </Paper>
                </Grid2>
                <Grid2 item xs={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      p: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.4)'
                      }
                    }}
                  >
                    <img
                      src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                      alt="Download on the App Store"
                      style={{ height: '32px', width: 'auto' }}
                    />
                  </Paper>
                </Grid2>
              </Grid2>
              <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <StyledIconButton key={index} size="small">
                    <Icon size={20} />
                  </StyledIconButton>
                ))}
              </Stack>
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  )
}

export default Footer