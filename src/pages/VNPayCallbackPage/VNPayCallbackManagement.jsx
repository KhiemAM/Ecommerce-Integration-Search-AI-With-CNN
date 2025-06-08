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
  ShoppingBag,
  Email,
  Share,
  Support,
  WhatsApp,
  Facebook,
  Twitter
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
  useEffect(() => {
    // Parse URL parameters
    const searchParams = new URLSearchParams(location.search)
    const data = {}

    for (let [key, value] of searchParams) {
      data[key] = value
    } setPaymentData(data)

    // Lấy thông tin sản phẩm từ localStorage
    const cartData = localStorage.getItem('cartItems')
    const purchasedData = localStorage.getItem('purchasedProducts')

    let productList = []

    // Ưu tiên lấy dữ liệu sản phẩm đã mua (nếu có)
    if (purchasedData) {
      try {
        productList = JSON.parse(purchasedData)
      } catch {
        // Lỗi khi parse dữ liệu sản phẩm đã mua
        productList = []
      }
    }

    // Nếu không có dữ liệu sản phẩm đã mua, thử lấy từ cart
    if (productList.length === 0 && cartData) {
      try {
        productList = JSON.parse(cartData)
      } catch {
        // Lỗi khi parse dữ liệu cart
        productList = []
      }
    }

    // Nếu vẫn không có dữ liệu, tạo sản phẩm mẫu dựa trên thông tin thanh toán
    if (productList.length === 0) {
      const paymentAmount = parseInt(data.vnp_Amount) / 100 || 36980000
      productList = [
        {
          id: 1,
          name: 'Sản phẩm đã mua',
          price: paymentAmount,
          quantity: 1,
          image: '/src/assets/img/duffle-bag-1.png',
          variant: 'Phiên bản tiêu chuẩn'
        }
      ]
    }

    setPurchasedProducts(productList)

    setLoading(false)
  }, [location])

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
    const productList = purchasedProducts.map((product) =>
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
  const handleSendEmailReceipt = () => {
    // Simulate email sending
    alert('Email hóa đơn đã được gửi đến địa chỉ email của bạn!')
  }

  const handleSocialShare = (platform) => {
    const shareText = `Tôi vừa mua sắm thành công trên cửa hàng! Mã đơn hàng: ${paymentData.vnp_TxnRef}`
    const shareUrl = window.location.href

    let url = ''
    switch (platform) {
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
      break
    case 'twitter':
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
      break
    case 'whatsapp':
      url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
      break
    default:
      break
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400')
    }
  }
  const handleContactSupport = () => {
    const subject = `Hỗ trợ đơn hàng ${paymentData.vnp_TxnRef}`
    const body = `Xin chào,\n\nTôi cần hỗ trợ cho đơn hàng với mã giao dịch: ${paymentData.vnp_TxnRef}\nSố tiền: ${formatCurrency(paymentData.vnp_Amount)}\nThời gian: ${formatDateTime(paymentData.vnp_PayDate)}\n\nCảm ơn!`

    window.location.href = `mailto:support@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
                <List>                  {purchasedProducts.map((product, index) => (
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
        </Grid2>        {/* Action Panel */}
        <Grid2 xs={12}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Hành động
              </Typography>

              {/* Primary Actions */}
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#73C7C7' }}>
                Hóa đơn & In ấn
              </Typography>
              <Grid2 container spacing={2} sx={{ mb: 3 }}>
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
                    startIcon={<Email />}
                    fullWidth
                    sx={{
                      borderColor: '#73C7C7',
                      color: '#73C7C7',
                      '&:hover': {
                        borderColor: '#73C7C7',
                        bgcolor: alpha('#73C7C7', 0.1)
                      }
                    }}
                    onClick={handleSendEmailReceipt}
                  >
                    Gửi Email
                  </Button>
                </Grid2>

                <Grid2 xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    startIcon={<Support />}
                    fullWidth
                    sx={{
                      borderColor: '#ff9800',
                      color: '#ff9800',
                      '&:hover': {
                        borderColor: '#ff9800',
                        bgcolor: alpha('#ff9800', 0.1)
                      }
                    }}
                    onClick={handleContactSupport}
                  >
                    Hỗ trợ
                  </Button>
                </Grid2>
              </Grid2>

              {/* Navigation Actions */}
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#73C7C7' }}>
                Điều hướng
              </Typography>
              <Grid2 container spacing={2} sx={{ mb: isSuccess ? 3 : 0 }}>
                <Grid2 xs={12} sm={6} md={4}>
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

                <Grid2 xs={12} sm={6} md={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/information')}
                    sx={{
                      borderColor: '#73C7C7',
                      color: '#73C7C7'
                    }}
                  >
                    Theo dõi đơn hàng
                  </Button>
                </Grid2>

                <Grid2 xs={12} sm={6} md={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/')}
                    sx={{
                      borderColor: '#73C7C7',
                      color: '#73C7C7'
                    }}
                  >
                    Về trang chủ
                  </Button>
                </Grid2>
              </Grid2>

              {/* Social Sharing - Only show for successful payments */}
              {isSuccess && (
                <>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#73C7C7' }}>
                    Chia sẻ
                  </Typography>
                  <Grid2 container spacing={2}>
                    <Grid2 xs={12} sm={4}>
                      <Button
                        variant="outlined"
                        startIcon={<Facebook />}
                        fullWidth
                        sx={{
                          borderColor: '#1877f2',
                          color: '#1877f2',
                          '&:hover': {
                            borderColor: '#1877f2',
                            bgcolor: alpha('#1877f2', 0.1)
                          }
                        }}
                        onClick={() => handleSocialShare('facebook')}
                      >
                        Facebook
                      </Button>
                    </Grid2>

                    <Grid2 xs={12} sm={4}>
                      <Button
                        variant="outlined"
                        startIcon={<Twitter />}
                        fullWidth
                        sx={{
                          borderColor: '#1da1f2',
                          color: '#1da1f2',
                          '&:hover': {
                            borderColor: '#1da1f2',
                            bgcolor: alpha('#1da1f2', 0.1)
                          }
                        }}
                        onClick={() => handleSocialShare('twitter')}
                      >
                        Twitter
                      </Button>
                    </Grid2>

                    <Grid2 xs={12} sm={4}>
                      <Button
                        variant="outlined"
                        startIcon={<WhatsApp />}
                        fullWidth
                        sx={{
                          borderColor: '#25d366',
                          color: '#25d366',
                          '&:hover': {
                            borderColor: '#25d366',
                            bgcolor: alpha('#25d366', 0.1)
                          }
                        }}
                        onClick={() => handleSocialShare('whatsapp')}
                      >
                        WhatsApp
                      </Button>
                    </Grid2>
                  </Grid2>
                </>
              )}
            </CardContent>
          </Card>
        </Grid2>

        {/* Order Summary & Next Steps - Only show for successful payments */}
        {isSuccess && (
          <Grid2 xs={12}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', bgcolor: alpha('#4caf50', 0.02) }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#4caf50' }}>
                  📋 Tóm tắt đơn hàng & Các bước tiếp theo
                </Typography>

                <Grid2 container spacing={3}>
                  <Grid2 xs={12} md={6}>
                    <Stack spacing={2}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Thông tin đơn hàng
                      </Typography>
                      <Box sx={{ pl: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          • Mã đơn hàng: <strong>{paymentData.vnp_TxnRef}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          • Tổng số sản phẩm: <strong>{purchasedProducts.length} sản phẩm</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          • Tổng giá trị: <strong>{formatProductPrice(getTotalAmount())}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          • Phương thức thanh toán: <strong>VNPay - {getBankName(paymentData.vnp_BankCode)}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          • Thời gian đặt hàng: <strong>{formatDateTime(paymentData.vnp_PayDate)}</strong>
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid2>

                  <Grid2 xs={12} md={6}>
                    <Stack spacing={2}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Các bước tiếp theo
                      </Typography>
                      <Box sx={{ pl: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          ✅ <strong>Bước 1:</strong> Xác nhận đơn hàng (Hoàn thành)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          📧 <strong>Bước 2:</strong> Email xác nhận sẽ được gửi trong 5 phút
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          📦 <strong>Bước 3:</strong> Đóng gói và chuẩn bị hàng (1-2 ngày)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          🚚 <strong>Bước 4:</strong> Giao hàng (2-5 ngày làm việc)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          📱 <strong>Bước 5:</strong> Theo dõi đơn hàng qua website hoặc SMS
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid2>
                </Grid2>

                <Divider sx={{ my: 3 }} />

                <Alert
                  severity="info"
                  sx={{
                    bgcolor: alpha('#2196f3', 0.1),
                    '& .MuiAlert-icon': { color: '#2196f3' }
                  }}
                >
                  <Typography variant="body2">
                    💡 <strong>Lưu ý quan trọng:</strong> Vui lòng lưu mã đơn hàng <strong>{paymentData.vnp_TxnRef}</strong>
                    để tra cứu và hỗ trợ. Nếu bạn không nhận được email xác nhận trong 30 phút,
                    vui lòng kiểm tra thư mục spam hoặc liên hệ với chúng tôi.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Grid2>
        )}

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
