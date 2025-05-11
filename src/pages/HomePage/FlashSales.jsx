import React from 'react';
import { 
  Box, 
  Typography, 
  Stack, 
  Button, 
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import { ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import ProductGrid from './ProductGrid';
import { products } from './data';

const FlashSales = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);

  return (
    <Box sx={{ mb: 6 }}>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'start', sm: 'center' }}
        spacing={2}
        mb={3}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box 
            sx={{ 
              bgcolor: theme.palette.primary.main, 
              borderRadius: 1,
              p: 0.8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Smartphone size={20} color="white" />
          </Box>
          <Typography 
            variant="h5" 
            fontWeight={600}
            color="text.primary"
          >
            Today's Flash Sales
          </Typography>
        </Stack>

        <CountdownTimer targetDate={endDate} />
      </Stack>

      <Box sx={{ position: 'relative' }}>
        <ProductGrid products={products} />

        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            right: -20, 
            transform: 'translateY(-50%)',
            display: { xs: 'none', md: 'flex' }
          }}
        >
          <IconButton 
            sx={{ 
              bgcolor: 'white', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': { bgcolor: 'white', transform: 'scale(1.05)' } 
            }}
          >
            <ChevronLeft size={20} />
          </IconButton>
          <IconButton 
            sx={{ 
              bgcolor: 'white', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': { bgcolor: 'white', transform: 'scale(1.05)' } 
            }}
          >
            <ChevronRight size={20} />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button 
          variant="outlined" 
          sx={{ 
            px: 4, 
            borderColor: theme.palette.grey[300],
            color: theme.palette.text.primary,
            '&:hover': {
              borderColor: theme.palette.primary.main,
              bgcolor: 'rgba(255, 71, 71, 0.04)'
            }
          }}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
};

export default FlashSales;
