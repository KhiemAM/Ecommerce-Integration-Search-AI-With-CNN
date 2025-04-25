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
function MainLayout() {
  return (
    <Box>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <Outlet /> {/* Nội dung của Route sẽ được render tại đây */}
      </Container>
      {/* <Footer /> */}
    </Box>
  )
}

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePageManagement />} />
        <Route path="/products" element={<ProductsPageManagement />} />
        <Route path="/wishlist" element={<WishlistPageManagement />} />
        <Route path="/card" element={<CardPageManagement />} />
        <Route path="/card/checkout" element={<CheckoutPageManagement />} />
        <Route path="/products/search" element={<SearchProductsPageManagement />} />
        <Route path="/product/:id" element={<ProductDetailManagement />} />
      </Route>

      {/* Authentcation */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
