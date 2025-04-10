import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid2,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  styled
} from '@mui/material'
import ButtonContainedPrimary from '~/components/Buttton/ButtonContainedPrimary'

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    '& fieldset': {
      borderColor: 'transparent'
    },
    '&:hover fieldset': {
      borderColor: '#e0e0e0'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#e0e0e0'
    }
  }
})

const CustomButton = styled(Button)({
  borderRadius: '8px',
  padding: '12px 24px',
  textTransform: 'none',
  fontWeight: 600
})

const products = [
  {
    id: 1,
    name: 'LCD Monitor',
    price: 650,
    image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 2,
    name: 'H1 Gamepad',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&q=80&w=100'
  }
]

function CheckoutPageManagement() {
  const [paymentMethod, setPaymentMethod] = useState('bank')
  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    townCity: '',
    phoneNumber: '',
    emailAddress: '',
    saveInfo: false
  })

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }))
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid2 container spacing={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid2 item xs={12} md={7}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
            Billing Details
          </Typography>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <CustomTextField
              required
              fullWidth
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />

            <CustomTextField
              fullWidth
              name="companyName"
              label="Company Name"
              value={formData.companyName}
              onChange={handleInputChange}
            />

            <CustomTextField
              required
              fullWidth
              name="streetAddress"
              label="Street Address"
              value={formData.streetAddress}
              onChange={handleInputChange}
            />

            <CustomTextField
              fullWidth
              name="apartment"
              label="Apartment, floor, etc. (optional)"
              value={formData.apartment}
              onChange={handleInputChange}
            />

            <CustomTextField
              required
              fullWidth
              name="townCity"
              label="Town/City"
              value={formData.townCity}
              onChange={handleInputChange}
            />

            <CustomTextField
              required
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />

            <CustomTextField
              required
              fullWidth
              name="emailAddress"
              label="Email Address"
              type="email"
              value={formData.emailAddress}
              onChange={handleInputChange}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  name="saveInfo"
                  sx={{ color: '#E74C3C', '&.Mui-checked': { color: '#E74C3C' } }}
                />
              }
              label="Save this information for faster check-out next time"
            />
          </Box>
        </Grid2>

        <Grid2 item xs={12} md={5} sx={{ width: '500px' }}>
          <Paper sx={{ p: 3, borderRadius: 2, bgcolor: '#fff' }}>
            {products.map((product) => (
              <Box key={product.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }}
                  />
                  <Typography>{product.name}</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>${product.price}</Typography>
              </Box>
            ))}

            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'grey.200' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Subtotal:</Typography>
                <Typography sx={{ fontWeight: 600 }}>$1750</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Shipping:</Typography>
                <Typography sx={{ fontWeight: 600, color: '#27AE60' }}>Free</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Total:</Typography>
                <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>$1750</Typography>
              </Box>

              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{ mb: 3 }}
              >
                <FormControlLabel
                  value="bank"
                  control={<Radio sx={{ color: '#E74C3C', '&.Mui-checked': { color: '#E74C3C' } }} />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>Bank</span>
                      <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png" alt="Visa" style={{ height: 20 }} />
                      <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/mastercard.png" alt="Mastercard" style={{ height: 20 }} />
                    </Box>
                  }
                />
                <FormControlLabel
                  value="cash"
                  control={<Radio sx={{ color: '#E74C3C', '&.Mui-checked': { color: '#E74C3C' } }} />}
                  label="Cash on delivery"
                />
              </RadioGroup>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <CustomTextField
                  placeholder="Coupon Code"
                  size="small"
                  fullWidth
                />
                <ButtonContainedPrimary
                  title='Apply Coupon'
                  onClick={() => {}}
                />
              </Box>

              <ButtonContainedPrimary
                title='Place Order'
                onClick={() => {}}
              />
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default CheckoutPageManagement