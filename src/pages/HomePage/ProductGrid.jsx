import React from 'react'
import { Grid, useTheme, useMediaQuery } from '@mui/material'
import ProductCard from './ProductCard'

const ProductGrid = ({ products }) => {
  const theme = useTheme()
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  // Determine number of products to show based on screen size
  const maxProducts = isExtraSmall ? 4 : isSmall ? 6 : products.length
  const visibleProducts = products.slice(0, maxProducts)

  return (
    <Grid container spacing={2}>
      {visibleProducts.map((product) => (
        <Grid item xs={6} sm={4} md={3} lg={2.4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductGrid
