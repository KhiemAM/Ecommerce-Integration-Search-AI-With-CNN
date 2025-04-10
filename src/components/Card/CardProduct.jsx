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

export default function CardProduct({ product }) {
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
        title={product.name}
      >
        <Stack
          className="quick-actions"
          spacing={1}x
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
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'red' }}>
            ${product.price}
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
