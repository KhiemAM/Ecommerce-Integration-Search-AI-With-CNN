import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  Checkbox
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import ButtonSecondary from '~/components/Buttton/ButtonSecondary'
import ButtonContainedPrimary from '~/components/Buttton/ButtonContainedPrimary'
import ButtonContainedSecondary from '~/components/Buttton/ButtonContainedSecondary'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  padding: theme.spacing(2),
  fontSize: '0.95rem',
  borderBottom: `1px solid ${theme.palette.grey[200]}`
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.grey[50]
  }
}))

const products = [
  {
    id: 1,
    name: 'LCD Monitor',
    price: 650,
    image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&q=80&w=100',
    description: '27-inch 4K Ultra HD'
  },
  {
    id: 2,
    name: 'H1 Gamepad',
    price: 550,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&q=80&w=100',
    description: 'Wireless Controller'
  }
]

function CardPageManagement() {
  const [quantities, setQuantities] = useState({
    1: 1,
    2: 3
  })

  const handleQuantityChange = (productId, value) => {
    const newValue = parseInt(value) || 0
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, Math.min(99, newValue))
    }))
  }

  const handleRemoveItem = (productId) => {
    setQuantities(prev => {
      const newQuantities = { ...prev }
      delete newQuantities[productId]
      return newQuantities
    })
  }

  const calculateSubtotal = (price, quantity) => {
    return price * quantity
  }

  const totalAmount = Object.entries(quantities).reduce((sum, [productId, quantity]) => {
    const product = products.find(p => p.id === parseInt(productId))
    return sum + (product ? calculateSubtotal(product.price, quantity) : 0)
  }, 0)

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#2C3E50' }}>
        Shopping Cart
      </Typography>

      <Box sx={{ }}>
        <Box sx={{ flex: 2 }}>
          <TableContainer
            component={Paper}
            sx={{
              mb: 4,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Quantity</StyledTableCell>
                  <StyledTableCell>Subtotal</StyledTableCell>
                  <StyledTableCell width={50}></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => quantities[product.id] !== undefined && (
                  <StyledTableRow key={product.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{
                          color: '#73C7C7',
                          '&.Mui-checked': {
                            color: '#73C7C7'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Paper
                          elevation={0}
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: 2,
                            overflow: 'hidden',
                            border: '1px solid',
                            borderColor: 'grey.200'
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </Paper>
                        <Box>
                          <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{product.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.description}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: '#2C3E50' }}>
                        ${product.price}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={parseInt(quantities[product.id]).toString()}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        sx={{
                          width: '100px',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: '#E74C3C' }}>
                        ${calculateSubtotal(product.price, quantities[product.id])}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleRemoveItem(product.id)}
                        size="small"
                        sx={{
                          color: 'grey.500',
                          '&:hover': {
                            color: '#E74C3C',
                            backgroundColor: 'rgba(231, 76, 60, 0.04)'
                          }
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <ButtonSecondary
              title="Continue Shopping"
              onClick={() => {}}
            />
            <ButtonSecondary
              title="Update Cart"
              onClick={() => {}}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Cart Summary
            </Typography>

            <TextField
              placeholder="Enter coupon code"
              size="small"
              fullWidth
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
            <ButtonContainedSecondary title='Apply Coupon' onClick={() => {}}/>

            <Box sx={{
              pt: 3,
              borderTop: 1,
              borderColor: 'grey.200'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography sx={{ fontWeight: 600 }}>${totalAmount}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Shipping</Typography>
                <Typography sx={{ fontWeight: 600, color: '#27AE60' }}>Free</Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 3,
                pt: 2,
                borderTop: 1,
                borderColor: 'grey.200'
              }}>
                <Typography sx={{ fontWeight: 600 }}>Total</Typography>
                <Typography sx={{ fontWeight: 600, fontSize: '1.2rem', color: '#E74C3C' }}>
                  ${totalAmount}
                </Typography>
              </Box>
              <Link to='checkout'>
                <ButtonContainedPrimary title='Proceed to Checkout' onClick={() => {}}/>
              </Link>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  )
}

export default CardPageManagement