import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useTheme,
  Stack,
  Snackbar,
  Alert
} from '@mui/material'
import { Mail, Send, Gift, Heart, Flower } from 'lucide-react'

const Newsletter = () => {
  const theme = useTheme()
  const [email, setEmail] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setShowSuccess(true)
      setEmail('')
    }
  }
  const benefits = [
    {
      icon: Heart,
      title: 'Ưu Đãi Độc Quyền',
      description: 'Nhận thông tin về các chương trình khuyến mãi đặc biệt'
    },
    {
      icon: Flower,
      title: 'Hoa Mới Về',
      description: 'Cập nhật sớm nhất về những loại hoa mới và độc đáo'
    },
    {
      icon: Gift,
      title: 'Mẹo Chăm Sóc',
      description: 'Nhận hướng dẫn chăm sóc hoa tươi lâu nhất'
    }
  ]

  return ( <Box
    sx={{
      py: 8,
      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {/* Background Pattern */}
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        animation: 'float 8s ease-in-out infinite'
      }}
    />

    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
      <Grid container spacing={6} alignItems="center">
        {/* Left Content */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 600,
                letterSpacing: 1.5,
                mb: 1,
                display: 'block'
              }}
            >
                Stay Connected
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'white'
              }}
            >
                Subscribe to Our Newsletter
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                lineHeight: 1.6
              }}
            >
                Join thousands of happy customers and never miss out on our best deals, new arrivals, and exclusive content.
            </Typography>

            {/* Benefits */}
            <Stack spacing={2} mb={4}>
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{
                      animation: `slideInLeft 0.6s ease ${index * 0.2}s both`
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <IconComponent size={20} color="white" />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: 'white',
                          mb: 0.5
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Stack>
                )
              })}
            </Stack>
          </Box>
        </Grid>

        {/* Right Content - Newsletter Form */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              animation: 'slideInRight 0.8s ease both'
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: 'white',
                mb: 3,
                textAlign: 'center'
              }}
            >
                Get 20% Off Your First Order!
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: '100%' }}
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: 2,
                      '& fieldset': {
                        border: 'none'
                      },
                      '&:hover fieldset': {
                        border: 'none'
                      },
                      '&.Mui-focused fieldset': {
                        border: `2px solid ${theme.palette.secondary.light}`
                      }
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '1rem',
                      py: 1.5
                    }
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<Send size={18} />}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                    }
                  }}
                >
                    Subscribe Now
                </Button>
              </Stack>
            </Box>

            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                display: 'block',
                textAlign: 'center',
                mt: 2
              }}
            >
                We respect your privacy. Unsubscribe at any time.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>

    <Snackbar
      open={showSuccess}
      autoHideDuration={4000}
      onClose={() => setShowSuccess(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={() => setShowSuccess(false)}
        severity="success"
        sx={{ width: '100%' }}
      >
          Thank you for subscribing! Check your email for your discount code.
      </Alert>
    </Snackbar>

    <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
  </Box>
  )
}

export default Newsletter
