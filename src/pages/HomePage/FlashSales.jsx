import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Stack,
  Button,
  useTheme,
  IconButton,
  Container,
  Paper
} from '@mui/material'
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react'
import CountdownTimer from './CountdownTimer'
import ProductGrid from './ProductGrid'
import { getAllProductsAPI } from '~/apis'
import { useLoading } from '~/context'
import { getRandomNumber } from '~/utils/formatters'

const FlashSales = () => {
  const theme = useTheme()
  const { setIsLoading } = useLoading()
  const [products, setProducts] = useState([])
  const formatData = (data) => {
    return data.map((item) => ({
      ...item,
      name: item.Name, // Map Name từ API thành name cho ProductCard
      image: `data:image/jpeg;base64,${item.image_base64}`, // Format đúng cho ProductCard
      isNew: false,
      rating: getRandomNumber(1, 5),
      reviews: getRandomNumber(1, 100),
      currentPrice: item.Price, // Sử dụng giá trực tiếp từ API (đã là VND)
      originalPrice: Math.round(item.Price * 1.5), // Tạo giá gốc cao hơn 50%
      discount: Math.round(((item.Price * 1.5 - item.Price) / (item.Price * 1.5)) * 100)
    }))
  }

  useEffect(() => {
    const fetchFlashSalesData = async () => {
      try {
        setIsLoading(true)
        const response = await getAllProductsAPI()
        if (response && response.data && Array.isArray(response.data)) {
          const formattedProducts = formatData(response.data)
          // Lấy ngẫu nhiên 8 sản phẩm cho Flash Sales
          const shuffled = formattedProducts.sort(() => 0.5 - Math.random())
          setProducts(shuffled.slice(0, 8))
        } else {
          setProducts([])
        }
      } catch {
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFlashSalesData()
  }, [setIsLoading])

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
                Hoa Khuyến Mãi
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
              >
                Ưu đãi đặc biệt cho hoa tươi - Đừng bỏ lỡ!
              </Typography>
            </Box>
          </Stack>
          <CountdownTimer targetDate={endDate} />
        </Stack>
        <Box sx={{ position: 'relative' }}>
          <ProductGrid products={products} />

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
            Xem Tất Cả Hoa Khuyến Mãi
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default FlashSales