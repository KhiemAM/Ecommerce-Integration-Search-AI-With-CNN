import React from 'react'
import {
  Box,
  Typography,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Container,
  Paper
} from '@mui/material'
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react'
import CountdownTimer from './CountdownTimer'
import ProductGrid from './ProductGrid'
import { products } from './data'

const FlashSales = () => {
  const theme = useTheme()

  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 3)

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
          borderRadius: 4,
          p: 4,
          border: `1px solid ${theme.palette.grey[200]}`
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'start', sm: 'center' }}
          spacing={2}
          mb={4}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                borderRadius: 2,
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 20px ${theme.palette.primary.main}30`
              }}
            >
              <Zap size={24} color="white" />
            </Box>
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
                color="text.primary"
                sx={{ mb: 0.5 }}
              >
                Flash Sales
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
              >
                Limited time offers - Don't miss out!
              </Typography>
            </Box>
          </Stack>

          <CountdownTimer targetDate={endDate} />
        </Stack>

        <Box sx={{ position: 'relative' }}>
          <ProductGrid products={products.slice(0, 4)} />

          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: 'absolute',
              top: '50%',
              right: -20,
              transform: 'translateY(-50%)',
              display: { xs: 'none', md: 'flex' }
            }}
          >
            <IconButton
              sx={{
                bgcolor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                border: `1px solid ${theme.palette.grey[200]}`,
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.15)'
                }
              }}
            >
              <ChevronLeft size={20} />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                border: `1px solid ${theme.palette.grey[200]}`,
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.15)'
                }
              }}
            >
              <ChevronRight size={20} />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: `0 4px 20px ${theme.palette.primary.main}30`,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                boxShadow: `0 6px 25px ${theme.palette.primary.main}40`,
                transform: 'translateY(-2px)'
              }
            }}
          >
            View All Flash Sales
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default FlashSales
