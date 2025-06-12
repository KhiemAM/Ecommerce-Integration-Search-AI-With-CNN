import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import TuneIcon from '@mui/icons-material/Tune'
import LocalFloristIcon from '@mui/icons-material/LocalFlorist'
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
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
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
  Paper,
  Fade,
  Chip
} from '@mui/material'
import { useEffect, useState } from 'react'
import { getAllProductsAPI } from '~/apis'
import CardProduct from '~/components/Card/CardProduct'
import { getRandomNumber } from '~/utils/formatters'
import { useLoading } from '~/context'

const categories = ['Daisy', 'Dandelion', 'Rose', 'Sunflower', 'Tulip']

const formatData = (data) => {
  return data.map((item) => ({
    ...item,
    image: item.image_base64,
    isNew: false,
    rating: getRandomNumber(1, 5),
    reviews: getRandomNumber(1, 100),
    currentPrice: item.Price,
    originalPrice: Math.round(item.Price * 1.2),
    discount: 17
  }))
}

function ProductsPageManagement() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedRating, setSelectedRating] = useState(0)
  const [products, setProducts] = useState([])
  const [animate, setAnimate] = useState(false)
  const { setIsLoading } = useLoading()

  useEffect(() => {
    setAnimate(true)
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getAllProductsAPI()
      setProducts(formatData(response.data))
      setIsLoading(false)
    }
    fetchData()
  }, [setIsLoading])

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
    <Box sx={{
      width: 280,
      p: 3,
      background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}05 100%)`,
      height: '100%'
    }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
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
          <TuneIcon sx={{ color: 'white', fontSize: 20 }} />
        </Box>
        <Typography variant="h6" fontWeight={700} color="text.primary">
          Bộ Lọc
        </Typography>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}08 100%)`,
          border: `1px solid ${theme.palette.grey[200]}`,
          borderRadius: 3
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: 'text.primary' }}>
          Danh Mục Hoa
        </Typography>
        <Stack spacing={1}>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  size="small"
                  sx={{
                    color: theme.palette.primary.main,
                    '&.Mui-checked': {
                      color: theme.palette.primary.main
                    }
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {category}
                </Typography>
              }
              sx={{
                mx: 0,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}10`,
                  borderRadius: 1
                }
              }}
            />
          ))}
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.secondary.main}08 100%)`,
          border: `1px solid ${theme.palette.grey[200]}`,
          borderRadius: 3
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 3, color: 'text.primary' }}>
          Khoảng Giá
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
            step={100}
            sx={{
              color: theme.palette.secondary.main,
              '& .MuiSlider-thumb': {
                boxShadow: `0 2px 12px ${theme.palette.secondary.main}40`
              }
            }}
          />
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Chip
              label={`${priceRange[0].toLocaleString()}đ`}
              variant="outlined"
              size="small"
              sx={{ fontWeight: 600 }}
            />
            <Chip
              label={`${priceRange[1].toLocaleString()}đ`}
              variant="outlined"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Stack>
        </Box>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}08 100%)`,
          border: `1px solid ${theme.palette.grey[200]}`,
          borderRadius: 3
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: 'text.primary' }}>
          Đánh Giá
        </Typography>
        <Rating
          value={selectedRating}
          onChange={(_, newValue) => setSelectedRating(newValue || 0)}
          size="large"
          sx={{
            color: theme.palette.secondary.main
          }}
        />
      </Paper>
    </Box>
  )
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(115, 199, 199, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 138, 128, 0.1) 0%, transparent 50%)',
          animation: 'float 6s ease-in-out infinite'
        }}
      />

      <Box sx={{ display: 'flex', position: 'relative', zIndex: 1 }}>
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
                  border: 'none',
                  boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}05 100%)`
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
          <Container maxWidth="lg">
            {/* Hero Section */}
            <Fade in={animate} timeout={1000}>
              <Paper
                elevation={0}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
                  borderRadius: 4,
                  p: 4,
                  mb: 4,
                  border: `1px solid ${theme.palette.grey[200]}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'start', sm: 'center' }}
                  spacing={2}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        borderRadius: 2,
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 4px 20px ${theme.palette.primary.main}30`
                      }}
                    >
                      <LocalFloristIcon sx={{ color: 'white', fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{
                          background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          mb: 0.5
                        }}
                      >
                        Sản Phẩm Hoa Tươi
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                      >
                        Khám phá bộ sưu tập hoa tươi đẹp nhất của chúng tôi
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    {isMobile && (
                      <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                          bgcolor: 'white',
                          boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
                          '&:hover': {
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            transform: 'translateY(-2px)',
                            boxShadow: `0 6px 20px ${theme.palette.primary.main}40`
                          },
                          transition: 'all 0.3s ease'
                        }}
                        size="small"
                      >
                        <FilterListOutlinedIcon />
                      </IconButton>
                    )}
                    <IconButton
                      sx={{
                        bgcolor: 'white',
                        boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
                        mr: 1,
                        '&:hover': {
                          bgcolor: theme.palette.primary.main,
                          color: 'white',
                          transform: 'translateY(-2px)',
                          boxShadow: `0 6px 20px ${theme.palette.primary.main}40`
                        },
                        transition: 'all 0.3s ease'
                      }}
                      size='small'
                    >
                      <ArrowBackIosNewOutlinedIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        bgcolor: 'white',
                        boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
                        '&:hover': {
                          bgcolor: theme.palette.primary.main,
                          color: 'white',
                          transform: 'translateY(-2px)',
                          boxShadow: `0 6px 20px ${theme.palette.primary.main}40`
                        },
                        transition: 'all 0.3s ease'
                      }}
                      size='small'
                    >
                      <ArrowForwardIosOutlinedIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Paper>
            </Fade>

            {/* Products Grid */}
            <Fade in={animate} timeout={1200}>
              <Grid2 container spacing={3}>
                {products.map((product, index) => (
                  <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                    <Fade in={animate} timeout={1400 + index * 100}>
                      <Box
                        sx={{
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            transition: 'all 0.3s ease'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <CardProduct product={product} />
                      </Box>
                    </Fade>
                  </Grid2>
                ))}
              </Grid2>
            </Fade>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default ProductsPageManagement