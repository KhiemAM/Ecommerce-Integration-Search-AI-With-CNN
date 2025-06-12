import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCartSliceAPI, fetchCartAPI } from '~/redux/cart/cartSlice'
import { toast } from 'react-toastify'
import { useState } from 'react'

export default function CardProduct({ product }) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const handleAddToCart = async () => {
    try {
      setIsLoading(true)
      const payload = {
        product_id: product.id,
        quantity: 1 // mặc định là 1
      }

      // Chỉ dispatch Redux action, action sẽ tự gọi API
      const result = await dispatch(addToCartSliceAPI(payload))
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Đã thêm vào giỏ hàng!')
        // Fetch lại cart để đảm bảo dữ liệu đồng bộ
        dispatch(fetchCartAPI())
      } else {
        toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng!')
      }
    } catch {
      toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng!')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(115, 199, 199, 0.15)',
        border: '1px solid rgba(115, 199, 199, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(115, 199, 199, 0.25)',
          transform: 'translateY(-4px)'
        }
      }}
    >      <CardMedia
        sx={{
          height: 200,
          position: 'relative',
          overflow: 'hidden',
          '&:hover .hover-button': {
            bottom: '10px',
            opacity: 1
          },
          '&:hover .quick-actions': {
            opacity: 1
          }
        }}
        image={`data:image/jpeg;base64,${product.image}`}
        title={product.Name}
      >
        {/* Discount Badge */}
        <Chip
          label="-17%"
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            bgcolor: 'secondary.main',
            color: 'white',
            fontWeight: 700,
            zIndex: 2,
            boxShadow: '0 2px 8px rgba(255, 138, 128, 0.3)'
          }}
        />

        <Stack
          className="quick-actions"
          spacing={1}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            opacity: 0,
            transition: 'opacity 0.3s'
          }}
        >
          <IconButton
            sx={{
              bgcolor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              '&:hover': {
                bgcolor: 'secondary.main',
                color: 'white',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
            size="small"
          >
            <FavoriteBorderOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
            size="small"
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </Stack><Button
          loading={isLoading}
          loadingPosition="start"
          onClick={handleAddToCart}
          className="hover-button"
          variant="contained"
          startIcon={<LocalGroceryStoreOutlinedIcon />}
          sx={{
            width: '100%',
            position: 'absolute',
            bottom: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0,
            transition: 'all 0.3s ease-in-out',
            backgroundColor: 'primary.main',
            borderRadius: 2,
            color: 'white',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'primary.dark',
              transform: 'translateX(-50%) translateY(-2px)',
              boxShadow: '0 6px 20px rgba(115, 199, 199, 0.4)'
            }
          }}
        >
          {isLoading ? 'Đang thêm...' : 'Thêm vào giỏ'}
        </Button>
      </CardMedia>      <CardContent sx={{ p: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component={Link}
          to={`/product/${product.id}`}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
              color: 'primary.main'
            },
            fontSize: '1rem',
            fontWeight: 600,
            mb: 1
          }}
        >
          {product.Name}
        </Typography>

        {/* Price Section with Vietnamese Currency */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '1.1rem'
            }}
          >
            {product.Price?.toLocaleString('vi-VN')}₫
          </Typography>

          {/* Original price (simulate discount) */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textDecoration: 'line-through',
              fontSize: '0.9rem'
            }}
          >
            {Math.round(product.Price * 1.2)?.toLocaleString('vi-VN')}₫
          </Typography>

          {/* Discount badge */}
          <Chip
            label="-17%"
            size="small"
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.7rem',
              height: 20
            }}
          />
        </Stack>

        {/* Rating and Reviews */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              value={product.rating}
              readOnly
              size="small"
              sx={{ color: 'secondary.main' }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ ml: 0.5 }}
            >
              ({product.reviews})
            </Typography>
          </Box>

          {/* Status chip */}
          <Chip
            label="Còn hàng"
            size="small"
            variant="outlined"
            sx={{
              color: 'success.main',
              borderColor: 'success.main',
              fontSize: '0.7rem',
              height: 20
            }}
          />
        </Box>
      </CardContent>
    </Card>
  )
}