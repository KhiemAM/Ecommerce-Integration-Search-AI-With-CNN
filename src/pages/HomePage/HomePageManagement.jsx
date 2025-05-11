import React from 'react'
import Box from '@mui/material/Box'
import Banner from './Banner'
import FlashSales from './FlashSales'
import Sidebar from './Sidebar'

function HomePageManagement() {
  return (
    <Box sx={{
      // bgcolor: '#000000',
      height: '100vh'
    }}>
      <Banner />
      <Sidebar />
      <FlashSales />
    </Box>
  )
}

export default HomePageManagement
