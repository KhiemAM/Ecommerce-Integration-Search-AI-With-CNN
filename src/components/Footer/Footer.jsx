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
        <Grid container spacing={4}>          {/* Flower Shop Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Flower Paradise
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body2">Đăng ký nhận thông tin</Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Nhận ưu đãi 10% cho đơn hàng đầu tiên
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex' }}>
                <TextField
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
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
          </Grid>          {/* Support Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Liên Hệ
            </Typography>
            <Stack spacing={1} sx={{ color: 'grey.400' }}>
              <Typography variant="body2">
                123 Đường Hoa Tươi, Quận 1, TP.HCM
              </Typography>
              <Typography variant="body2">flowerparadise@gmail.com</Typography>
              <Typography variant="body2">+84 901-234-567</Typography>
            </Stack>
          </Grid>

          {/* Account Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Tài Khoản
            </Typography>
            <Stack spacing={1} sx={{ color: 'grey.400' }}>
              {['Tài khoản của tôi', 'Đăng nhập / Đăng ký', 'Giỏ hàng', 'Yêu thích', 'Sản phẩm'].map((item) => (
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
          </Grid>          {/* Quick Link Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Liên Kết Nhanh
            </Typography>
            <Stack spacing={1} sx={{ color: 'grey.400' }}>
              {['Chính sách bảo mật', 'Điều khoản sử dụng', 'Câu hỏi thường gặp', 'Liên hệ'].map((item) => (
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
        >          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            © 2024 Flower Paradise. Tất cả quyền được bảo lưu.
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