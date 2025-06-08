import React, { useState, useEffect } from 'react'
import {
  Box,
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
import { useLoading } from '~/context'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import {
  selectCartItems,
  selectCartTotalPrice,
  fetchCartAPI,
  updateCartItemSliceAPI,
  deleteCartItemSliceAPI,
  updateSelectedItemSliceAPI
} from '~/redux/cart/cartSlice'

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

function CardPageManagement() {
  const formatCurrencyVND = (value) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value)
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)?.user_id
  const cartItems = useSelector(selectCartItems)
  const cartTotalPrice = useSelector(selectCartTotalPrice)
  const [quantities, setQuantities] = useState({})
  const { setIsLoading } = useLoading()
  const [cards, setCards] = useState([])
  // Cập nhật local state khi Redux state thay đổi
  useEffect(() => {
    setCards(cartItems)
    const newQuantities = cartItems.reduce((acc, item) => {
      acc[item.ProductId] = item.Quantity
      return acc
    }, {})
    setQuantities(newQuantities)
  }, [cartItems])

  // Chỉ fetch cart nếu chưa có dữ liệu
  useEffect(() => {
    if (cartItems.length === 0) {
      const fetchProductDetails = async () => {
        try {
          setIsLoading(true)
          await dispatch(fetchCartAPI())
        } finally {
          setIsLoading(false)
        }
      }
      fetchProductDetails()
    }
  }, [dispatch, setIsLoading, cartItems.length])

  const handleQuantityChange = async (productId, value) => {
    const newValue = parseInt(value) || 1
    const clampedValue = Math.max(1, Math.min(99, newValue))
    setQuantities((prev) => ({
      ...prev,
      [productId]: clampedValue
    }))
    
    // Cập nhật Redux state
    dispatch(updateCartItemSliceAPI({
      product_id: productId,
      quantity: clampedValue
    }))
  }
  const calculateSubtotal = (price, quantity) => price * quantity

  // Sử dụng cartTotalPrice từ Redux thay vì tính toán local
  const totalAmount = cartTotalPrice

  const handleCheckboxChange = async (productId) => {
    // Cập nhật Redux state
    dispatch(updateSelectedItemSliceAPI({ product_id: productId }))
  }
  const handleDeleteItem = async (productId) => {
    try {
      setIsLoading(true)
      // Cập nhật Redux state
      await dispatch(deleteCartItemSliceAPI(productId))
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng')
    } catch {
      toast.error('Có lỗi xảy ra khi xóa sản phẩm')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#2C3E50' }}>
        Shopping Cart
      </Typography>

      <Box>
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
                {cards.map(
                  (product) =>
                    quantities[product.ProductId] !== undefined && (
                      <StyledTableRow key={product.ProductId}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={() => handleCheckboxChange(product.ProductId)}
                            checked={!!product.IsChecked}
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
                                src={`data:image/jpeg;base64,${product.ImageURL}`}
                                alt={product.Name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </Paper>
                            <Box>
                              <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                {product.Name}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ fontWeight: 600, color: '#2C3E50' }}>
                            {formatCurrencyVND(product.Price)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={parseInt(quantities[product.ProductId]).toString()}
                            onChange={(e) =>
                              handleQuantityChange(product.ProductId, e.target.value)
                            }
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
                            {formatCurrencyVND(
                              calculateSubtotal(product.Price, quantities[product.ProductId])
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleDeleteItem(product.ProductId)}
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
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <ButtonSecondary title="Continue Shopping" onClick={() => {}} />
            <ButtonSecondary title="Update Cart" onClick={() => {}} />
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
            <ButtonContainedSecondary title="Apply Coupon" onClick={() => {}} />

            <Box sx={{ pt: 3, borderTop: 1, borderColor: 'grey.200' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {formatCurrencyVND(totalAmount)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Shipping</Typography>
                <Typography sx={{ fontWeight: 600, color: '#27AE60' }}>Free</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3,
                  pt: 2,
                  borderTop: 1,
                  borderColor: 'grey.200'
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>Total</Typography>
                <Typography
                  sx={{ fontWeight: 600, fontSize: '1.2rem', color: '#E74C3C' }}
                >
                  {formatCurrencyVND(totalAmount)}
                </Typography>
              </Box>
              {currentUser ? (
                <Link to="checkout">
                  <ButtonContainedPrimary title="Proceed to Checkout" onClick={() => {}} />
                </Link>
              ): (
                <Link to="/login">
                  <ButtonContainedPrimary title="Proceed to Checkout" onClick={() => {}} />
                </Link>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  )
}

export default CardPageManagement
