import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  Stack,
  Fade,
  Grid,
  Card,
  CardContent,
  IconButton
} from '@mui/material'
import {
  ArrowRight,
  ShoppingBag,
  Star,
  TrendingUp,
  PlayCircle
} from 'lucide-react'

const HeroSection = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const handleShopNow = () => {
    navigate('/products')
  }

  const heroContent = {
    title: 'Cửa Hàng Hoa Tươi Đẹp Nhất',
    subtitle: 'Tươi Mới - Ý Nghĩa - Chất Lượng',
    description: 'Mang đến những bó hoa tươi đẹp nhất cho mọi dịp đặc biệt. Từ hoa sinh nhật, hoa tình yêu đến hoa sự kiện với dịch vụ giao hàng tận nơi.',
    buttonText: 'Xem Hoa Đẹp',
    stats: [
      { label: 'Khách Hàng Hạnh Phúc', value: '10K+', icon: Star },
      { label: 'Loại Hoa Khác Nhau', value: '500+', icon: ShoppingBag },
      { label: 'Tăng Trưởng Mỗi Năm', value: '200%', icon: TrendingUp }
    ]
  }

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
        minHeight: { xs: '70vh', md: '80vh' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        mb: 6
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
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 107, 107, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(78, 205, 196, 0.1) 0%, transparent 50%)',
          animation: 'float 6s ease-in-out infinite'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            <Fade in={animate} timeout={1000}>
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    letterSpacing: 1.5,
                    mb: 1
                  }}
                >
                  {heroContent.subtitle}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                    fontWeight: 700,
                    lineHeight: 1.2,
                    mb: 2,
                    background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {heroContent.title}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 4,
                    lineHeight: 1.6,
                    maxWidth: 500
                  }}
                >
                  {heroContent.description}
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={4}>                  <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight size={20} />}
                  onClick={handleShopNow}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    '&:hover': {
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
                    }
                  }}
                >
                  {heroContent.buttonText}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayCircle size={20} />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: `${theme.palette.primary.main}10`,
                      borderColor: theme.palette.primary.main
                    }
                  }}
                >
                    Watch Demo
                </Button>
                </Stack>

                {/* Stats */}
                <Grid container spacing={3}>
                  {heroContent.stats.map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                      <Grid item xs={4} key={index}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              backgroundColor: `${theme.palette.primary.main}15`,
                              mb: 1
                            }}
                          >
                            <IconComponent
                              size={24}
                              color={theme.palette.primary.main}
                            />
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.text.primary,
                              mb: 0.5
                            }}
                          >
                            {stat.value}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: '0.75rem'
                            }}
                          >
                            {stat.label}
                          </Typography>
                        </Box>
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            </Fade>
          </Grid>

          {/* Right Content - Featured Product Card */}
          <Grid item xs={12} md={6}>
            <Fade in={animate} timeout={1500}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <Card
                  sx={{
                    maxWidth: 400,
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.palette.grey[200]}`,
                    transform: 'rotate(-2deg)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(0deg) scale(1.05)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20230804/pngtree-pink-rose-wallpaper-flowers-beautiful-image_13002486.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '16px 16px 0 0'
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Hoa hồng
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Những bông hoa hồng tươi thắm, biểu tượng của tình yêu và sự lãng mạn.
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 700
                        }}
                      >
                        299.000₫
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star size={16} fill={theme.palette.warning.main} color={theme.palette.warning.main} />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                          4.9 (128)
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* Floating Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
          opacity: 0.6,
          animation: 'bounce 2s infinite'
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          opacity: 0.4,
          animation: 'bounce 2s infinite 0.5s'
        }}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </Box>
  )
}

export default HeroSection
