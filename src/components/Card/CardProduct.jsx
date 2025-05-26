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
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { addToCartAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useState } from 'react'

export default function CardProduct({ product }) {
  const currentUser = useSelector(selectCurrentUser)
  console.log('🚀 ~ CardProduct ~ currentUser:', currentUser)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
      setIsLoading(true)
      const payload = {
        product_id: product.id,
        quantity: 1 // mặc định là 1
      }

      const res = await addToCartAPI(payload)
      if (res) {
        toast.success('Đã thêm vào giỏ hàng!')
      }
    } catch {
      toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
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
              '&:hover': { bgcolor: 'white' }
            }}
          >
            <FavoriteBorderOutlinedIcon />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: 'white',
              '&:hover': { bgcolor: 'white' }
            }}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        </Stack>
        <Button
          loading={isLoading}
          loadingPosition='start'
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
            backgroundColor: '#73C7C7',
            borderRadius: 0,
            color: 'white'
          }}
        >
          Add To Card
        </Button>
      </CardMedia>
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component={Link}
          to={`/product/${product.id}`}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {product.Name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'red' }}>
            ${product.Price}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Rating value={product.rating} readOnly size="small" />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ ml: 1 }}
            >
              ({product.reviews})
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}