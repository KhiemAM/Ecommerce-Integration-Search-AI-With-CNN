import React from 'react'
import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  Chip,
  alpha
} from '@mui/material'
import {
  TrendingUp,
  Schedule,
  AccountBalance,
  CreditCard
} from '@mui/icons-material'

const PaymentSummaryCard = ({ 
  amount, 
  date, 
  bankName, 
  cardType, 
  status, 
  transactionId 
}) => {
  const isSuccess = status === 'success'
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount / 100)
  }

  return (
    <Card 
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '2px solid',
        borderColor: isSuccess ? alpha('#4caf50', 0.3) : alpha('#f44336', 0.3),
        bgcolor: isSuccess ? alpha('#4caf50', 0.05) : alpha('#f44336', 0.05),
        position: 'relative',
        overflow: 'visible'
      }}
    >
      {/* Status Badge */}
      <Chip
        label={isSuccess ? 'Thành công' : 'Thất bại'}
        color={isSuccess ? 'success' : 'error'}
        sx={{
          position: 'absolute',
          top: -10,
          right: 20,
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      />

      <CardContent sx={{ p: 3, pt: 4 }}>
        <Stack spacing={3}>
          {/* Amount */}
          <Box sx={{ textAlign: 'center' }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <TrendingUp sx={{ color: isSuccess ? '#4caf50' : '#f44336' }} />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: isSuccess ? '#4caf50' : '#f44336'
                }}
              >
                {formatCurrency(amount)}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Số tiền giao dịch
            </Typography>
          </Box>

          {/* Details Grid */}
          <Box sx={{ 
            bgcolor: 'background.paper', 
            borderRadius: 2, 
            p: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Schedule color="action" sx={{ fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    Thời gian
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {date}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccountBalance color="action" sx={{ fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    Ngân hàng
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {bankName}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <CreditCard color="action" sx={{ fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    Loại thẻ
                  </Typography>
                </Stack>
                <Chip 
                  label={cardType} 
                  size="small"
                  sx={{ 
                    bgcolor: alpha('#73C7C7', 0.1),
                    color: '#73C7C7',
                    fontWeight: 600
                  }}
                />
              </Stack>
            </Stack>
          </Box>

          {/* Transaction ID */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Mã giao dịch
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                fontFamily: 'monospace',
                bgcolor: alpha('#73C7C7', 0.1),
                px: 2,
                py: 0.5,
                borderRadius: 1,
                mt: 0.5,
                display: 'inline-block'
              }}
            >
              {transactionId}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PaymentSummaryCard
