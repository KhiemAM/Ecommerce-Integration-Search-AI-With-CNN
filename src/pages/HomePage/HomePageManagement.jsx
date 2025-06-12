import React from 'react'
import Box from '@mui/material/Box'
import HeroSection from './HeroSection'
import FeaturedCategories from './FeaturedCategories'
import FlashSales from './FlashSales'
import Testimonials from './Testimonials'
import Newsletter from './Newsletter'

function HomePageManagement() {
  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: 'background.default',
      width: '100%',
      overflow: 'hidden'
    }}>
      <HeroSection />
      <FeaturedCategories />
      <FlashSales />
      <Testimonials />
      <Newsletter />
    </Box>
  )
}

export default HomePageManagement
