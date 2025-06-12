import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
  IconButton,
  Stack,
  Rating
} from '@mui/material'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const Testimonials = () => {
  const theme = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonials = [
    {
      id: 1,
      name: 'Nguyễn Văn Minh',
      role: 'Kỹ Sư Hóa Học',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'Chất lượng hóa chất rất tốt, đúng tiêu chuẩn quốc tế. Giao hàng nhanh và đóng gói cẩn thận. Sẽ tiếp tục sử dụng dịch vụ!',
      company: 'Công ty Hóa chất ABC'
    },
    {
      id: 2,
      name: 'Trần Thị Lan',
      role: 'Nghiên cứu viên',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'Đa dạng sản phẩm, tư vấn chuyên nghiệp. Đặc biệt là dịch vụ hỗ trợ kỹ thuật rất tốt, giúp chúng tôi chọn đúng hóa chất cần thiết.',
      company: 'Viện Nghiên cứu XYZ'
    },
    {
      id: 3,
      name: 'Lê Quang Đức',
      role: 'Giám đốc Sản xuất',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'Giá cả hợp lý, chất lượng ổn định. Đội ngũ tư vấn am hiểu sâu về sản phẩm, luôn đưa ra giải pháp tối ưu cho doanh nghiệp.',
      company: 'Nhà máy Hóa chất DEF'
    },
    {
      id: 4,
      name: 'Phạm Thị Hoa',
      role: 'Entrepreneur',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4,
      comment: 'Reliable platform with great deals. The product recommendations are spot-on and very helpful.',
      company: 'Wilson Enterprises'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      role: 'Project Manager',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'Exceptional quality products and outstanding customer support. Will definitely shop here again!',
      company: 'Global Solutions'
    },
    {
      id: 6,
      name: 'James Taylor',
      role: 'Business Analyst',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'The best online shopping experience I\'ve had. Fast shipping and products exactly as described.',
      company: 'Analytics Inc'
    }
  ]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 3) % testimonials.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 3 + testimonials.length) % testimonials.length)
  }

  const displayedTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ]

  return (
    <Box
      sx={{
        py: 8,
        background: `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.background.paper} 100%)`
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              letterSpacing: 1.5,
              mb: 1,
              display: 'block'
            }} >
            Đánh Giá Khách Hàng
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 2
            }}
          >
            Khách Hàng Nói Về Chúng Tôi
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Nghe từ những khách hàng đã tin tưởng và sử dụng sản phẩm của chúng tôi
          </Typography>
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Grid container spacing={4}>
            {displayedTestimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={`${testimonial.id}-${currentIndex}`}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    border: 'none',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.12)'
                    },
                    animation: `slideIn 0.6s ease ${index * 0.2}s both`
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: `${theme.palette.primary.main}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Quote size={20} color={theme.palette.primary.main} />
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Rating
                      value={testimonial.rating}
                      readOnly
                      sx={{ mb: 2 }}
                      size="small"
                    />

                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.primary,
                        lineHeight: 1.6,
                        mb: 3,
                        fontStyle: 'italic'
                      }}
                    >
                      "{testimonial.comment}"
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={testimonial.avatar}
                        sx={{
                          width: 48,
                          height: 48,
                          border: `2px solid ${theme.palette.primary.main}20`
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {testimonial.role} at {testimonial.company}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Navigation Buttons */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: 'absolute',
              top: '50%',
              right: -60,
              transform: 'translateY(-50%)',
              display: { xs: 'none', lg: 'flex' }
            }}
          >
            <IconButton
              onClick={handlePrev}
              sx={{
                bgcolor: 'white',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'scale(1.05)'
                }
              }}
            >
              <ChevronLeft size={20} />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                bgcolor: 'white',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'scale(1.05)'
                }
              }}
            >
              <ChevronRight size={20} />
            </IconButton>
          </Stack>

          {/* Mobile Navigation */}
          <Box
            sx={{
              display: { xs: 'flex', lg: 'none' },
              justifyContent: 'center',
              mt: 4
            }}
          >
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={handlePrev}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark
                  }
                }}
              >
                <ChevronLeft size={20} />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark
                  }
                }}
              >
                <ChevronRight size={20} />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Container>

      <style jsx>{`
        @keyframes slideIn {
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

export default Testimonials
