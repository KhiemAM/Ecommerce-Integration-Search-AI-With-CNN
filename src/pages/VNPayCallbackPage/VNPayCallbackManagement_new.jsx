import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid2,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Stack,
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material'
import {
  CheckCircle,
  Cancel,
  Receipt,
  CreditCard,
  CalendarToday,
  AccessTime,
  Store,
  ArrowBack,
  Print,
  Download,
  ShoppingBag
} from '@mui/icons-material'
import { alpha } from '@mui/material/styles'
import PaymentSummaryCard from '~/components/Card/PaymentSummaryCard'
import './VNPayCallback.css'

const VNPayCallbackManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [paymentData, setPaymentData] = useState({})
  const [loading, setLoading] = useState(true)
  const [purchasedProducts, setPurchasedProducts] = useState([])

  // Dữ liệu mẫu sản phẩm - trong thực tế sẽ lấy từ localStorage hoặc API
  const sampleProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 29990000,
      quantity: 1,
      image: '/src/assets/img/duffle-bag-1.png',
      variant: '256GB - Titan Tự Nhiên'
    },
    {
      id: 2,
      name: 'AirPods Pro 2nd Gen',
      price: 6990000,
      quantity: 1,
      image: '/src/assets/img/duffle-bag-1.png',
      variant: 'USB-C'
    }
  ]

  useEffect(() => {
    // Parse URL parameters
    const searchParams = new URLSearchParams(location.search)
    const data = {}

    for (let [key, value] of searchParams) {
      data[key] = value
    }

    setPaymentData(data)

    // Lấy thông tin sản phẩm từ localStorage hoặc sử dụng dữ liệu mẫu
    const cartData = localStorage.getItem('cartItems')
    if (cartData) {
      try {
        setPurchasedProducts(JSON.parse(cartData))
      } catch {
        setPurchasedProducts(sampleProducts)
      }
    } else {
      setPurchasedProducts(sampleProducts)
    }

    setLoading(false)
  }, [location, sampleProducts])

  const formatCurrency = (amount) => {
    if (!amount) return '0 ₫'
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount / 100)
  }

  const formatProductPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A'
    const year = dateTimeString.substring(0, 4)
    const month = dateTimeString.substring(4, 6)
    const day = dateTimeString.substring(6, 8)
    const hour = dateTimeString.substring(8, 10)
    const minute = dateTimeString.substring(10, 12)
    const second = dateTimeString.substring(12, 14)

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`
  }

  const isSuccess = paymentData.vnp_ResponseCode === '00' && paymentData.vnp_TransactionStatus === '00'

  const getBankName = (bankCode) => {
    const banks = {
      'NCB': 'Ngân hàng NCB',
      'ACB': 'Ngân hàng ACB',
      'VCB': 'Ngân hàng Vietcombank',
      'TCB': 'Ngân hàng Techcombank',
      'MB': 'Ngân hàng MB Bank',
      'BIDV': 'Ngân hàng BIDV',
      'VIB': 'Ngân hàng VIB',
      'SHB': 'Ngân hàng SHB'
    }
    return banks[bankCode] || bankCode
  }

  const getCardTypeName = (cardType) => {
    const types = {
      'ATM': 'Thẻ ATM nội địa',
      'CREDIT': 'Thẻ tín dụng',
      'VISA': 'Thẻ Visa',
      'MASTERCARD': 'Thẻ Mastercard'
    }
    return types[cardType] || cardType
  }

  const getTotalAmount = () => {
    return purchasedProducts.reduce((total, product) => {
      return total + (product.price * product.quantity)
    }, 0)
  }

  const handleDownloadReceipt = () => {
    // Create receipt content
    const productList = purchasedProducts.map(product => 
      `${product.name} x${product.quantity} - ${formatProductPrice(product.price * product.quantity)}`
    ).join('\n      ')

    const receiptContent = `
      KẾT QUẢ THANH TOÁN VNPAY
      ========================
      Mã giao dịch: ${paymentData.vnp_TxnRef}
      Số tiền: ${formatCurrency(paymentData.vnp_Amount)}
      Ngân hàng: ${getBankName(paymentData.vnp_BankCode)}
      Thời gian: ${formatDateTime(paymentData.vnp_PayDate)}
      Trạng thái: ${isSuccess ? 'Thành công' : 'Thất bại'}
      
      DANH SÁCH SẢN PHẨM:
      ${productList}
      
      Tổng tiền: ${formatProductPrice(getTotalAmount())}
    `

    const blob = new Blob([receiptContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `receipt_${paymentData.vnp_TxnRef}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LinearProgress />
        <Typography sx={{ textAlign: 'center', mt: 2 }}>
          Đang xử lý thông tin thanh toán...
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mb: 2, color: '#73C7C7' }}
        >
          Quay về trang chủ
        </Button>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Kết quả thanh toán
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Chi tiết giao dịch thanh toán qua VNPay
        </Typography>
      </Box>

      <Grid2 container spacing={3}>
        {/* Payment Summary Card */}
        <Grid2 xs={12} md={4}>
          <PaymentSummaryCard
            amount={paymentData.vnp_Amount}
            date={formatDateTime(paymentData.vnp_PayDate)}
            bankName={getBankName(paymentData.vnp_BankCode)}
            cardType={getCardTypeName(paymentData.vnp_CardType)}
            status={isSuccess ? 'success' : 'failed'}
            transactionId={paymentData.vnp_TxnRef}
          />
        </Grid2>

        {/* Payment Details Card */}
        <Grid2 xs={12} md={8}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: isSuccess ? alpha('#4caf50', 0.2) : alpha('#f44336', 0.2),
              bgcolor: isSuccess ? alpha('#4caf50', 0.02) : alpha('#f44336', 0.02)
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }} className="animate-slide-in">
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    margin: '0 auto',
                    mb: 2,
                    bgcolor: isSuccess ? '#4caf50' : '#f44336'
                  }}
                  className={isSuccess ? 'success-icon' : 'error-icon'}
                >
                  {isSuccess ? (
                    <CheckCircle sx={{ fontSize: 40 }} />
                  ) : (
                    <Cancel sx={{ fontSize: 40 }} />
                  )}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại!'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {isSuccess
                    ? 'Giao dịch của bạn đã được xử lý thành công'
                    : 'Đã có lỗi xảy ra trong quá trình thanh toán'
                  }
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Transaction Details */}
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Thông tin giao dịch
                  </Typography>
                  <Grid2 container spacing={2}>
                    <Grid2 xs={12} sm={6}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Receipt color="action" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Mã giao dịch
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {paymentData.vnp_TxnRef || 'N/A'}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid2>
                    <Grid2 xs={12} sm={6}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <CreditCard color="action" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Số tiền
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: '#73C7C7' }}>
                            {formatCurrency(paymentData.vnp_Amount)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid2>
                    <Grid2 xs={12} sm={6}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <CalendarToday color="action" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Thời gian thanh toán
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {formatDateTime(paymentData.vnp_PayDate)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid2>
                    <Grid2 xs={12} sm={6}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Store color="action" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Ngân hàng
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {getBankName(paymentData.vnp_BankCode)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid2>
                  </Grid2>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Chi tiết thanh toán
                  </Typography>
                  <Grid2 container spacing={2}>
                    <Grid2 xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Loại thẻ:
                      </Typography>
                      <Chip
                        label={getCardTypeName(paymentData.vnp_CardType)}
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    </Grid2>
                    <Grid2 xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Mã giao dịch VNPay:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {paymentData.vnp_TransactionNo || 'N/A'}
                      </Typography>
                    </Grid2>
                    <Grid2 xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Mã giao dịch ngân hàng:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {paymentData.vnp_BankTranNo || 'N/A'}
                      </Typography>
                    </Grid2>
                    <Grid2 xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Mã phản hồi:
                      </Typography>
                      <Chip
                        label={paymentData.vnp_ResponseCode}
                        color={isSuccess ? 'success' : 'error'}
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    </Grid2>
                  </Grid2>
                </Box>

                {paymentData.vnp_OrderInfo && (
                  <>
                    <Divider />
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Thông tin đơn hàng:
                      </Typography>
                      <Alert severity="info" sx={{ bgcolor: alpha('#73C7C7', 0.1) }}>
                        {decodeURIComponent(paymentData.vnp_OrderInfo)}
                      </Alert>
                    </Box>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid2>

        {/* Purchased Products List */}
        <Grid2 xs={12}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <ShoppingBag color="action" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Sản phẩm đã mua ({purchasedProducts.length} sản phẩm)
                </Typography>
              </Stack>

              {purchasedProducts.length > 0 ? (
                <List>
                  {purchasedProducts.map((product, index) => (
                    <ListItem 
                      key={product.id || index}
                      sx={{ 
                        border: '1px solid #f0f0f0',
                        borderRadius: 2,
                        mb: 2,
                        bgcolor: '#fafafa'
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={product.image}
                          alt={product.name}
                          sx={{ width: 60, height: 60, borderRadius: 2 }}
                          variant="rounded"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {product.name}
                          </Typography>
                        }
                        secondary={
                          <Stack spacing={0.5}>
                            {product.variant && (
                              <Typography variant="body2" color="text.secondary">
                                Phiên bản: {product.variant}
                              </Typography>
                            )}
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="body2" color="text.secondary">
                                Số lượng: {product.quantity}
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 600, color: '#73C7C7' }}>
                                {formatProductPrice(product.price)}
                              </Typography>
                            </Stack>
                          </Stack>
                        }
                      />
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#73C7C7' }}>
                          {formatProductPrice(product.price * product.quantity)}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Alert severity="info">
                  Không có thông tin sản phẩm được lưu trữ
                </Alert>
              )}

              {purchasedProducts.length > 0 && (
                <Box sx={{ mt: 3, p: 2, bgcolor: alpha('#73C7C7', 0.1), borderRadius: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Tổng cộng:
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#73C7C7' }}>
                      {formatProductPrice(getTotalAmount())}
                    </Typography>
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid2>

        {/* Action Panel */}
        <Grid2 xs={12}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Hành động
              </Typography>

              <Grid2 container spacing={2}>
                <Grid2 xs={12} sm={6} md={3}>
                  <Button
                    variant="contained"
                    startIcon={<Print />}
                    fullWidth
                    sx={{
                      bgcolor: '#73C7C7',
                      '&:hover': { bgcolor: alpha('#73C7C7', 0.8) }
                    }}
                    onClick={() => window.print()}
                  >
                    In hóa đơn
                  </Button>
                </Grid2>

                <Grid2 xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    fullWidth
                    sx={{
                      borderColor: '#73C7C7',
                      color: '#73C7C7',
                      '&:hover': {
                        borderColor: '#73C7C7',
                        bgcolor: alpha('#73C7C7', 0.1)
                      }
                    }}
                    onClick={handleDownloadReceipt}
                  >
                    Tải hóa đơn
                  </Button>
                </Grid2>

                <Grid2 xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/products')}
                    sx={{
                      borderColor: '#73C7C7',
                      color: '#73C7C7'
                    }}
                  >
                    Tiếp tục mua sắm
                  </Button>
                </Grid2>

                <Grid2 xs={12} sm={6} md={3}>
                  <Button
                    variant="text"
                    fullWidth
                    onClick={() => navigate('/information')}
                    sx={{ color: '#73C7C7' }}
                  >
                    Theo dõi đơn hàng
                  </Button>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>

        {isSuccess && (
          <Grid2 xs={12}>
            <Alert
              severity="success"
              sx={{
                borderRadius: 3,
                bgcolor: alpha('#4caf50', 0.1),
                '& .MuiAlert-icon': {
                  color: '#4caf50'
                }
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Cảm ơn bạn đã mua hàng!
              </Typography>
              <Typography variant="body2">
                Đơn hàng của bạn đang được xử lý. Bạn sẽ nhận được email xác nhận trong thời gian sớm nhất.
                Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua hotline hoặc email hỗ trợ.
              </Typography>
            </Alert>
          </Grid2>
        )}
      </Grid2>
    </Container>
  )
}

export default VNPayCallbackManagement
