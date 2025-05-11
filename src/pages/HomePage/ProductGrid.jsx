import React from 'react';
import { Grid, useTheme, useMediaQuery } from '@mui/material';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  // Determine number of products to show based on screen size
  const visibleProducts = isExtraSmall ? 2 : isSmall ? 3 : products;

  return (
    <Grid container spacing={2}>
      {Array.isArray(visibleProducts) 
        ? visibleProducts.map((product) => (
            <Grid item xs={6} sm={4} md={2.4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))
        : products.slice(0, visibleProducts).map((product) => (
            <Grid item xs={6} sm={4} md={2.4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))
      }
    </Grid>
  );
};

export default ProductGrid;
