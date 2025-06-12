import React, { useState } from 'react'
import { Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  Link,
  Stack,
  Divider
} from '@mui/material'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Exclusive Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Exclusive
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body2">Subscribe</Typography>
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
          </Grid>

          {/* Support Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Support
            </Typography>
            <Stack spacing={1} sx={{ color: 'grey.400' }}>
              <Typography variant="body2">
                111 Bijoy sarani, Dhaka, DH 1515, Bangladesh
              </Typography>
              <Typography variant="body2">exclusive@gmail.com</Typography>
              <Typography variant="body2">+88015-88888-9999</Typography>
            </Stack>
          </Grid>

          {/* Account Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Account
            </Typography>
            <Stack spacing={1} sx={{ color: 'grey.400' }}>
              {['My Account', 'Login / Register', 'Cart', 'Wishlist', 'Shop'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': { color: 'white' }
                  }}
                >
                  <Typography variant="body2">{item}</Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Quick Link Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Link
            </Typography>
            <Stack spacing={1} sx={{ color: 'grey.400' }}>
              {['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': { color: 'white' }
                  }}
                >
                  <Typography variant="body2">{item}</Typography>
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Bottom Section */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            © 2024 Exclusive. All rights reserved.
          </Typography>
          
          <Stack direction="row" spacing={2}>
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <IconButton
                key={index}
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: '#73C7C7',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Icon size={20} />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
