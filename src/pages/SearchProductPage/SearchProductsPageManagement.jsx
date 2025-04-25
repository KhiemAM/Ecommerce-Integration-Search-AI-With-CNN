import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import
{
  Box,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  Grid2,
  IconButton,
  List,
  ListItem,
  Rating,
  Slider,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useEffect, useState } from 'react'
import CardProduct from '~/components/Card/CardProduct'
import { getRandomNumber } from '~/utils/formatters'

import { useSelector } from 'react-redux'
import { selectCurrentProduct } from '~/redux/product/productSlice'
import NoResultPage from '../NoResult/NoResultPage'

const categories = ['Electronics', 'Gaming', 'Fashion', 'Sports', 'Toys']

const formatData = (data) => {
  return data.map((item) => ({
    ...item,
    image: item.image_base64,
    isNew: false,
    rating: getRandomNumber(1, 5),
    reviews: getRandomNumber(1, 100)
  }))
}

function SearchProductsPageManagement() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedRating, setSelectedRating] = useState(0)
  const [products, setProducts] = useState([])

  const results = useSelector(selectCurrentProduct)

  useEffect(() => {
    if (results) {
      setProducts(formatData(results?.related_products))
    }
  }, [results])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filterDrawerContent = (
    <Box sx={{ width: 280, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Categories
        </Typography>
        <List dense>
          {categories.map((category) => (
            <ListItem key={category} disablePadding>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    size="small"
                  />
                }
                label={category}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Price Range
        </Typography>
        <Box sx={{ px: 2 }}>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
            step={100}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">${priceRange[0]}</Typography>
            <Typography variant="body2">${priceRange[1]}</Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Rating
        </Typography>
        <Rating
          value={selectedRating}
          onChange={(_, newValue) => setSelectedRating(newValue || 0)}
          size="large"
        />
      </Box>

      <Divider sx={{ my: 2 }} />
    </Box>
  )

  return (
    !results ? (<NoResultPage />) : (
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar for desktop */}
        <Box sx={{ mt: 6 }}>
          {!isMobile && (
            <Drawer
              variant="permanent"
              sx={{
                '& .MuiDrawer-paper': {
                  width: 280,
                  position: 'relative',
                  overflow: 'hidden',
                  border: 'solid 1px #73C7C7',
                  borderRadius: 2
                }
              }}
            >
              {filterDrawerContent}
            </Drawer>
          )}

          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                width: 280,
                bgcolor: 'white'
              }
            }}
          >
            {filterDrawerContent}
          </Drawer>
        </Box>

        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1, py: 6, px: 4 }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            maxWidth: 1200,
            mx: 'auto'
          }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Search Products
            </Typography>
            <Box>
              {isMobile && (
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{ mr: 3, bgcolor: 'white', boxShadow: 1, '&:hover': { bgcolor: '#73C7C7', color: 'white' } }}
                  size="small"
                >
                  <FilterListOutlinedIcon />
                </IconButton>
              )}
              <IconButton
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  mr: 1,
                  '&:hover': { bgcolor: '#73C7C7', color: 'white' }
                }}
                size='small'
              >
                <ArrowBackIosNewOutlinedIcon />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  '&:hover': { bgcolor: '#73C7C7', color: 'white' }
                }}
                size='small'
              >
                <ArrowForwardIosOutlinedIcon />
              </IconButton>
            </Box>
          </Box>

          <Grid2 container spacing={3} sx={{ maxWidth: 1200, mx: 'auto' }}>
            {products.map((product) => (
              <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                <CardProduct product={product} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
    )
  )
}

export default SearchProductsPageManagement