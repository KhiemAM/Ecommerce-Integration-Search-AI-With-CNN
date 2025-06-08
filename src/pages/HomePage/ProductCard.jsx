import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Button,
  Rating,
  Chip,
  Stack,
  Grow
} from '@mui/material'
import { Heart, Eye } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToCartSliceAPI } from '~/redux/cart/cartSlice'
import { addToCartAPI } from '~/apis'
import { toast } from 'react-toastify'

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const dispatch = useDispatch()

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
  }

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true)
      const payload = {
        product_id: product.id,
        quantity: 1
      }

      // Gọi API để thêm vào giỏ hàng
      const res = await addToCartAPI(payload)
      if (res) {
        // Cập nhật Redux state
        dispatch(addToCartSliceAPI(payload))
        toast.success('Đã thêm vào giỏ hàng!')
      }
    } catch {
      toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng!')
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: '1px solid transparent',
        '&:hover': {
          borderColor: '#e0e0e0'
        }
      }}
    >
      <Box sx={{ position: 'relative', pt: '100%', bgcolor: '#f5f5f5' }}>
        <Chip
          label={`-${product.discount}%`}
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            fontWeight: 600,
            zIndex: 1
          }}
        />

        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            p: 2
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
        >
          <IconButton
            size="small"
            onClick={handleFavoriteClick}
            sx={{
              bgcolor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': { bgcolor: 'white' }
            }}
          >
            <Heart size={18} fill={isFavorite ? '#ff4747' : 'none'} color={isFavorite ? '#ff4747' : '#494949'} />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              bgcolor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': { bgcolor: 'white' }
            }}
          >
            <Eye size={18} color="#494949" />
          </IconButton>
        </Box>
        <Grow in={isHovered}>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 1
            }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={handleAddToCart}
              disabled={isAddingToCart} sx={{
                py: 1,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(255, 71, 71, 0.3)'
              }}
            >
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </Button>
          </Box>
        </Grow>
      </Box>

      <CardContent sx={{ pt: 2, pb: 1.5, flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
          {product.name}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Typography
            variant="subtitle1"
            color="primary.main"
            sx={{ fontWeight: 600 }}
          >
            ${product.currentPrice}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: 'line-through' }}
          >
            ${product.originalPrice}
          </Typography>
        </Stack>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating
            value={product.rating}
            readOnly
            precision={0.5}
            size="small"
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ ml: 0.5 }}
          >
            ({product.reviews})
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductCard
