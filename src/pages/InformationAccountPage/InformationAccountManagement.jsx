import React, { useState } from 'react'
import { Box, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { Grid2, TextField } from '@mui/material'
import { Button, CircularProgress, Typography } from '@mui/material'

const InformationAccountManagement = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1500)
  }

  const handleCancel = () => {
    console.log('Cancelled')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper
        elevation={1}
        sx={{
          my: 3,
          p: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 500 }}>
        Edit Your Profile
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size= {{ xs: 12, sm: 6 }}>
            <TextField
              autoFocus
              fullWidth
              label='First Name'
              type='text'
              variant='outlined'
              error={!!errors['first_name']}
              {...register('first_name', {
                required: FIELD_REQUIRED_MESSAGE
              })}
            />
            <FieldErrorAlert errors={errors} fieldName='first_name' />
          </Grid2>
          <Grid2 size= {{ xs: 12, sm: 6 }}>
            <TextField
              autoFocus
              fullWidth
              label='Last Name'
              type='text'
              variant='outlined'
              error={!!errors['last_name']}
              {...register('last_name', {
                required: FIELD_REQUIRED_MESSAGE
              })}
            />
            <FieldErrorAlert errors={errors} fieldName='last_name' />
          </Grid2>
          <Grid2 size= {{ xs: 12, sm: 6 }}>
            <TextField
              autoFocus
              fullWidth
              label='Date of Birth'
              type='text'
              variant='outlined'
              error={!!errors['date_of_birth']}
              {...register('date_of_birth', {
                required: FIELD_REQUIRED_MESSAGE
              })}
            />
            <FieldErrorAlert errors={errors} fieldName='date_of_birth' />
          </Grid2>
          <Grid2 size= {{ xs: 12, sm: 6 }}>
            <TextField
              autoFocus
              fullWidth
              label='Gender'
              type='text'
              variant='outlined'
              error={!!errors['gender']}
              {...register('gender', {
                required: FIELD_REQUIRED_MESSAGE
              })}
            />
            <FieldErrorAlert errors={errors} fieldName='gender' />
          </Grid2>
          <Grid2 size= {{ xs: 12, sm: 6 }}>
            <TextField
              autoFocus
              fullWidth
              label='Address'
              type='text'
              variant='outlined'
              error={!!errors['address']}
              {...register('address', {
                required: FIELD_REQUIRED_MESSAGE
              })}
            />
            <FieldErrorAlert errors={errors} fieldName='address' />
          </Grid2>
        </Grid2>

        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mt: 2
        }}>
          <Button
            variant="text"
            color="secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
            sx={{
              minWidth: '100px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
        Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            sx={{
              minWidth: '150px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Save Changes'
            )}
          </Button>
        </Box>
      </Paper>
    </form>
  )
}

export default InformationAccountManagement
