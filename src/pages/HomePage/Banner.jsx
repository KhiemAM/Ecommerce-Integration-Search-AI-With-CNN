import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Stack,
  MobileStepper
} from '@mui/material'
import { ArrowRight } from 'lucide-react'
import { bannerSlides } from './data'

const Banner = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = bannerSlides.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const activeSlide = bannerSlides[activeStep]

  return (
    <Box sx={{ mb: 4, position: 'relative' }}>
      <Paper
        sx={{
          position: 'relative',
          height: isMobile ? 300 : 400,
          overflow: 'hidden',
          backgroundColor: '#000',
          borderRadius: 2
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${activeSlide.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 0.7,
            transition: 'opacity 0.5s ease'
          }}
        />

        <Box
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            p: 4,
            zIndex: 1
          }}
        >
          <Stack spacing={2} maxWidth={isMobile ? '100%' : '50%'}>
            <Typography
              variant="subtitle1"
              color="white"
              sx={{
                fontWeight: 500,
                animation: 'fadeIn 0.8s',
                '@keyframes fadeIn': {
                  '0%': { opacity: 0, transform: 'translateY(20px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' }
                }
              }}
            >
              {activeSlide.subtitle}
            </Typography>

            <Typography
              variant="h3"
              component="h1"
              color="white"
              sx={{
                fontWeight: 700,
                fontSize: isMobile ? '1.75rem' : '2.5rem',
                animation: 'fadeIn 0.8s 0.2s both'
              }}
            >
              {activeSlide.title}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowRight size={18} />}
              sx={{
                mt: 2,
                width: 'fit-content',
                animation: 'fadeIn 0.8s 0.4s both'
              }}
            >
              {activeSlide.buttonText}
            </Button>
          </Stack>
        </Box>
      </Paper>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          bgcolor: 'transparent',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
          '& .MuiMobileStepper-dot': {
            mx: 0.5,
            my: 1.5,
            width: 8,
            height: 8,
            backgroundColor: 'rgba(255,255,255,0.5)'
          },
          '& .MuiMobileStepper-dotActive': {
            backgroundColor: theme.palette.primary.main
          }
        }}
        nextButton={null}
        backButton={null}
      />
    </Box>
  )
}

export default Banner
