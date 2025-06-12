import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha
} from '@mui/material'
import {
  Heart,
  Gift,
  Calendar,
  Users,
  Flower,
  FlowerIcon,
  Sparkles,
  Crown
} from 'lucide-react'

const FeaturedCategories = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const handleCategoryClick = (categoryName) => {
    navigate('/products', { state: { category: categoryName } })
  }

  const categories = [
    {
      id: 1,
      name: 'Hoa Tình Yêu',
      icon: Heart,
      count: '200+ Mẫu hoa',
      color: '#FF6B6B',
      bgColor: '#FF6B6B15'
    },
    {
      id: 2,
      name: 'Hoa Sinh Nhật',
      icon: Gift,
      count: '150+ Mẫu hoa',
      color: '#4ECDC4',
      bgColor: '#4ECDC415'
    },
    {
      id: 3,
      name: 'Hoa Sự Kiện',
      icon: Calendar,
      count: '100+ Mẫu hoa',
      color: '#45B7D1',
      bgColor: '#45B7D115'
    },
    {
      id: 4,
      name: 'Hoa Cưới',
      icon: Crown,
      count: '80+ Mẫu hoa',
      color: '#F7DC6F',
      bgColor: '#F7DC6F15'
    },
    {
      id: 5,
      name: 'Hoa Khai Trương',
      icon: Sparkles,
      count: '60+ Mẫu hoa',
      color: '#BB8FCE',
      bgColor: '#BB8FCE15'
    },
    {
      id: 6,
      name: 'Hoa Chia Buồn',
      icon: Flower,
      count: '40+ Mẫu hoa',
      color: '#58D68D',
      bgColor: '#58D68D15'
    },
    {
      id: 7,
      name: 'Hoa Tốt Nghiệp',
      icon: Users,
      count: '50+ Mẫu hoa',
      color: '#F1948A',
      bgColor: '#F1948A15'
    },
    {
      id: 8,
      name: 'Hoa Chúc Mừng',
      icon: Gift,
      count: '70+ Mẫu hoa',
      color: '#85C1E9',
      bgColor: '#85C1E915'
    }
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>      <Box sx={{ textAlign: 'center', mb: 6 }}>
      <Typography
        variant="overline"
        sx={{
          color: theme.palette.primary.main,
          fontWeight: 600,
          letterSpacing: 1.5,
          mb: 1,
          display: 'block'
        }}
      >
          Danh Mục Hoa
      </Typography>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          mb: 2
        }}
      >
          Hoa Tươi Theo Dịp
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: 600,
          mx: 'auto'
        }}
      >
          Khám phá bộ sưu tập hoa tươi đẹp cho mọi dịp đặc biệt trong cuộc sống
      </Typography>
    </Box><Grid container spacing={3}>
      {categories.map((category, index) => {
        const IconComponent = category.icon
        return (
          <Grid item xs={6} sm={4} md={3} key={category.id}>              <Card
            onClick={() => handleCategoryClick(category.name)}
            sx={{
              cursor: 'pointer',
              border: 'none',
              background: category.bgColor,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: `0 20px 40px ${alpha(category.color, 0.2)}`,
                background: category.bgColor
              },
              animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
            }}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                p: 3,
                '&:last-child': { pb: 3 }
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 64,
                  height: 64,
                  borderRadius: 3,
                  backgroundColor: alpha(category.color, 0.15),
                  mb: 2,
                  transition: 'all 0.3s ease'
                }}
              >
                <IconComponent size={32} color={category.color} />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 1
                }}
              >
                {category.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.875rem'
                }}
              >
                {category.count}
              </Typography>
            </CardContent>              </Card>
          </Grid>
        )
      })}
    </Grid>

    <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Container>
  )
}

export default FeaturedCategories
