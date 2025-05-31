import React, { useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { Grid2, TextField } from '@mui/material'
import { Button, CircularProgress, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { createInformationAccountAPI, getInformationAccountAPI, updateInformationAccountAPI } from '~/apis'
import { useLoading } from '~/context'
// import { useSelector } from 'react-redux'
// import { selectCurrentUser } from '~/redux/user/userSlice'

const InformationAccountManagement = () => {
  // const currentUser = useSelector(selectCurrentUser)?.user_id
  const { setIsLoading } = useLoading()
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const fetchInformation = async () => {
    try {
      setIsLoading(true)
      const res = await getInformationAccountAPI()
      if (res) {
        setIsSaved(true)
      } else {
        setIsSaved(false)
      }
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
    try {
      setIsSubmitting(true)
      if (isSaved) {
        await updateInformationAccountAPI(data)
      } else {
        await createInformationAccountAPI(data)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    reset()
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
              slotProps={{
                inputLabel: { shrink: true }
              }}
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
              slotProps={{
                inputLabel: { shrink: true }
              }}
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
          </Grid2>
          <Grid2 size= {{ xs: 12, sm: 6 }}>
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
          </Grid2>
          <Grid2 size= {{ xs: 12, sm: 6 }}>
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
            loading={isSubmitting}
            loadingPosition='start'
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
            {isSaved ? 'Save' : 'Create'}
          </Button>
        </Box>
      </Paper>
    </form>
  )
}

export default InformationAccountManagement
