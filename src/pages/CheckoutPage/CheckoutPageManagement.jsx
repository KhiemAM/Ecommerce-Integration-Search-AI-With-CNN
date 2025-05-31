import React, { useState, useEffect } from 'react'
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
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import MenuItem from '@mui/material/MenuItem'
import { useLoading } from '~/context'
import { getInformationAccountAPI, invoicesAPI } from '~/apis'

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
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()
  const { setIsLoading } = useLoading()

  const handleChangePaymentMethod = async() => {
    try {
      setIsLoading(true)
      const res = await invoicesAPI()
      if (res) {
        window.location.href = res.payment_url
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchInformation = async () => {
    try {
      setIsLoading(true)
      const res = await getInformationAccountAPI()
      reset({
        first_name: res.first_name || '',
        last_name: res.last_name || '',
        date_of_birth: res.date_of_birth || '',
        gender: res.gender || '',
        address: res.address || ''
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInformation()
  }, [])


  const onSubmit = async(data) => {
    console.log('🚀 ~ onSubmit ~ data:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid2 container spacing={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid2 item xs={12} md={7}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
            Billing Details
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                autoFocus
                fullWidth
                label='First Name'
                type='text'
                variant='outlined'
                error={!!errors['first_name']}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
                {...register('first_name', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='first_name' />

              <TextField
                autoFocus
                fullWidth
                label='Last Name'
                type='text'
                variant='outlined'
                error={!!errors['last_name']}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
                {...register('last_name', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='last_name' />

              <TextField
                autoFocus
                fullWidth
                label='Date of Birth'
                type='date'
                variant='outlined'
                error={!!errors['date_of_birth']}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
                {...register('date_of_birth', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='date_of_birth' />

              <TextField
                autoFocus
                fullWidth
                select
                label='Gender'
                variant='outlined'
                error={!!errors['gender']}
                value={watch('gender') || ''}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
                {...register('gender', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              >
                <MenuItem key='Nam' value='Nam'>
                Nam
                </MenuItem>
                <MenuItem key='Nữ' value='Nữ'>
                Nữ
                </MenuItem>
              </TextField>
              <FieldErrorAlert errors={errors} fieldName='gender' />

              <TextField
                autoFocus
                fullWidth
                label='Address'
                type='text'
                variant='outlined'
                error={!!errors['address']}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
                {...register('address', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='address' />
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

                <Button
                  loadingPosition='start'
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleChangePaymentMethod}
                  sx={{
                    minWidth: '150px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Place Order
                </Button>
              </Box>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </form>
  )
}

export default CheckoutPageManagement