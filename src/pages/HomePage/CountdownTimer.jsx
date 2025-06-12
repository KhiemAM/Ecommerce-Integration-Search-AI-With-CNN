import React, { useState, useEffect } from 'react'
import { Box, Typography, Stack, useTheme, useMediaQuery } from '@mui/material'

const CountdownTimer = ({ targetDate }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime()

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num) => {
    return num.toString().padStart(2, '0')
  }

  const TimeUnit = ({ value, label }) => (
    <Stack alignItems="center" spacing={0.5}>
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: 'white',
          borderRadius: 1,
          width: isMobile ? 36 : 48,
          height: isMobile ? 36 : 48,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 700,
          fontSize: isMobile ? '1rem' : '1.5rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {formatNumber(value)}
      </Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}
      >
        {label}
      </Typography>
    </Stack>
  )

  const Separator = () => (
    <Typography
      variant="h4"
      sx={{
        color: theme.palette.secondary.main,
        alignSelf: 'flex-start',
        mt: 0.5,
        mx: 0.5
      }}
    >
      :
    </Typography>
  )

  return (
    <Stack direction="row" alignItems="center" spacing={isMobile ? 0.5 : 1}>
      <TimeUnit value={timeLeft.days} label="Days" />
      <Separator />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <Separator />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <Separator />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </Stack>
  )
}

export default CountdownTimer
