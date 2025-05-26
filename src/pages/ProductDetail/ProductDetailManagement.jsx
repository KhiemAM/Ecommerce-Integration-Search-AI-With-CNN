import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Grid2,
  Typography,
  Button,
  Rating,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  CardMedia,
  Stack,
  Paper,
  alpha
} from '@mui/material'
import { FavoriteBorder, LocalShipping, Loop, Add, Remove, ShoppingCart } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { getProductByIdAPI } from '~/apis'
import { useLoading } from '~/context'

// Common styles
const commonStyles = {
  paper: {
    border: '1px solid',
    borderColor: 'grey.200',
    borderRadius: 2,
    bgcolor: 'background.paper'
  },
  toggleButton: {
    borderRadius: 2,
    border: '2px solid',
    fontSize: { xs: '0.8rem', sm: '1rem' }
  },
  responsiveText: {
    h3: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
    h4: { xs: '1.5rem', sm: '2rem' },
    body1: { xs: '0.9rem', sm: '1.1rem' },
    h6: { xs: '1rem', sm: '1.25rem' }
  }
}

// Thumbnail component
const Thumbnail = ({ images, selectedImage, setSelectedImage }) => (
  <Stack spacing={{ xs: 1, sm: 2 }} sx={{ width: { xs: 80, sm: 100 } }}>
    {images.map((img, index) => (
      <Paper
        key={index}
        elevation={selectedImage === index ? 4 : 1}
        sx={{
          cursor: 'pointer',
          transition: 'all 0.2s',
          transform: selectedImage === index ? 'scale(1.05)' : 'scale(1)',
          '&:hover': { transform: 'scale(1.05)' },
          aspectRatio: '1 / 1', // Đảm bảo tỷ lệ 1:1 cho thumbnail
          overflow: 'hidden'
        }}
        onClick={() => setSelectedImage(index)}
      >
        <CardMedia
          component="img"
          image={`data:image/jpeg;base64,${img}`} // Cắt ảnh theo kích thước 100x100
          alt={`PS5 Controller View ${index + 1}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 1,
            opacity: selectedImage === index ? 1 : 0.7
          }}
        />
      </Paper>
    ))}
  </Stack>
)

// Main Image component
const MainImage = ({ image }) => (
  <Paper elevation={4} sx={{ flexGrow: 1, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
    <CardMedia
      component="img"
      image={`data:image/jpeg;base64,${image}`}
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        aspectRatio: '1 / 1', // Đảm bảo tỷ lệ 1:1 cho ảnh chính
        objectFit: 'cover',
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'scale(1.05)' }
      }}
    />
  </Paper>
)

// Quantity Selector component
const QuantitySelector = ({ quantity, setQuantity }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      border: '2px solid',
      borderColor: 'grey.300',
      borderRadius: 2,
      p: 0.5
    }}
  >
    <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))} sx={{ color: 'primary.main' }}>
      <Remove />
    </IconButton>
    <Typography sx={{ px: { xs: 2, sm: 3 }, fontWeight: 600 }}>{quantity}</Typography>
    <IconButton onClick={() => setQuantity(quantity + 1)} sx={{ color: 'primary.main' }}>
      <Add />
    </IconButton>
  </Box>
)

// Delivery Info component
const DeliveryInfo = () => (
  <Stack spacing={{ xs: 1, sm: 2 }}>
    {[
      { icon: <LocalShipping sx={{ color: 'primary.main', fontSize: { xs: 24, sm: 28 } }} />, title: 'Free Delivery', text: 'Enter your postal code for Delivery Availability' },
      { icon: <Loop sx={{ color: 'primary.main', fontSize: { xs: 24, sm: 28 } }} />, title: 'Return Delivery', text: 'Free 30 Days Delivery Returns. Details' }
    ].map(({ icon, title, text }, index) => (
      <Paper key={index} elevation={0} sx={{ ...commonStyles.paper, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {icon}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: commonStyles.responsiveText.h6 }}>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {text}
            </Typography>
          </Box>
        </Box>
      </Paper>
    ))}
  </Stack>
)

function ProductDetailManagement() {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const [product, setProduct] = useState(null)
  console.log('🚀 ~ ProductDetailManagement ~ product:', product)

  const { id } = useParams()
  const { setIsLoading } = useLoading()

  const fetchProductDetails = async (id) => {
    setIsLoading(true)
    const response = await getProductByIdAPI(id)
    setProduct(response)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProductDetails(id)
  }, [id])

  const images = [
    product?.image_base64,
    product?.image_base64,
    product?.image_base64,
    product?.image_base64
  ]

  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 4, sm: 8 } }}>
      <Container maxWidth={{ xs: 'sm', sm: 'md', md: 'lg' }}>
        <Grid2 container spacing={{ xs: 3, sm: 6 }}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', gap: { xs: 1, sm: 3 } }}>
              <Thumbnail images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
              <MainImage image={images[selectedImage]} />
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box sx={{ maxWidth: 'md' }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontSize: commonStyles.responsiveText.h3
                }}
              >
                {product?.Name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                <Rating value={4.5} precision={0.5} readOnly size="large" />
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  (150 Reviews)
                </Typography>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: 'primary.main',
                  fontSize: commonStyles.responsiveText.h4
                }}
              >
                ${product?.Price}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  fontSize: commonStyles.responsiveText.body1
                }}
              >
                {product?.Description}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 3 }, mb: 4 }}>
                <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  sx={{
                    flexGrow: 1,
                    py: { xs: 1.5, sm: 2 },
                    bgcolor: 'primary.main',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: commonStyles.responsiveText.body1,
                    fontWeight: 600,
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  Add to Cart
                </Button>
                <IconButton
                  sx={{
                    border: '2px solid',
                    borderColor: 'grey.300',
                    borderRadius: 2,
                    p: { xs: 1.5, sm: 2 },
                    '&:hover': { bgcolor: alpha('#ef4444', 0.1), color: '#ef4444' }
                  }}
                >
                  <FavoriteBorder />
                </IconButton>
              </Box>

              <DeliveryInfo />
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  )
}

export default ProductDetailManagement