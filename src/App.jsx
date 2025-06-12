import * as React from 'react'

import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Container from '@mui/material/Container'

import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import HomePageManagement from '~/pages/HomePage/HomePageManagement'
import ResponsiveAppBar from '~/components/AppBar/AppBar'
import WishlistPageManagement from '~/pages/WishlistPage/WishlistPageManagement'
import { Box } from '@mui/material'
import CardPageManagement from '~/pages/CardPage/CardPageManagement'
import CheckoutPageManagement from './pages/CheckoutPage/CheckoutPageManagement'
import ProductsPageManagement from './pages/ProductPage/ProductsPageManagement'
import SearchProductsPageManagement from './pages/SearchProductPage/SearchProductsPageManagement'
import ProductDetailManagement from './pages/ProductDetail/ProductDetailManagement'
import Footer from './components/Footer/Footer'
import InformationAccountManagement from './pages/InformationAccountPage/InformationAccountManagement'
import VNPayCallbackManagement from './pages/VNPayCallbackPage/VNPayCallbackManagement'
import PageContainer from './components/Layout/PageContainer'
function MainLayout() {
  return (
    <Box>
      <ResponsiveAppBar />
      <Box sx={{ minHeight: 'calc(100vh - 60px)' }}>
        <Outlet /> {/* Nội dung của Route sẽ được render tại đây */}
      </Box>
      <Footer />
    </Box>
  )
}

function App() {

  return (    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePageManagement />} />
        <Route path="/products" element={<PageContainer><ProductsPageManagement /></PageContainer>} />
        <Route path="/wishlist" element={<PageContainer><WishlistPageManagement /></PageContainer>} />
        <Route path="/card" element={<PageContainer><CardPageManagement /></PageContainer>} />
        <Route path="/card/checkout" element={<PageContainer><CheckoutPageManagement /></PageContainer>} />
        <Route path="/products/search" element={<PageContainer><SearchProductsPageManagement /></PageContainer>} />
        <Route path="/product/:id" element={<PageContainer><ProductDetailManagement /></PageContainer>} />
        <Route path="/information" element={<PageContainer><InformationAccountManagement /></PageContainer>} />
        <Route path="/vnpay-callback/*" element={<PageContainer><VNPayCallbackManagement /></PageContainer>} />
      </Route>

      {/* Authentcation */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
