import React from 'react'
import {
  Grid,
  TextField,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  Box,
  Fade
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  { value: 'other', label: 'Other' }
]

const ProfileForm = ({ userData, onChange, errors }) => {
  const handleDateChange = (date) => {
    onChange('date_of_birth', date ? date.toDate() : null)
  }

  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="first_name"
            value={userData.first_name}
            onChange={(e) => onChange('first_name', e.target.value)}
            error={!!errors.first_name}
            helperText={errors.first_name}
            fullWidth
            required
            autoFocus
            InputProps={{
              sx: {
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: '2px'
                  }
                },
                transition: 'all 0.2s'
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="last_name"
            value={userData.last_name}
            onChange={(e) => onChange('last_name', e.target.value)}
            error={!!errors.last_name}
            helperText={errors.last_name}
            fullWidth
            required
            InputProps={{
              sx: {
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: '2px'
                  }
                },
                transition: 'all 0.2s'
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Date of Birth"
            value={userData.date_of_birth ? dayjs(userData.date_of_birth) : null}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                error: !!errors.date_of_birth,
                helperText: errors.date_of_birth
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: '2px'
                  }
                },
                transition: 'all 0.2s'
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            error={!!errors.gender}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: '2px'
                  }
                },
                transition: 'all 0.2s'
              }
            }}
          >
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={userData.gender}
              label="Gender"
              onChange={(e) => onChange('gender', e.target.value)}
            >
              {genderOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors.gender && (
              <FormHelperText>{errors.gender}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            name="address"
            value={userData.address}
            onChange={(e) => onChange('address', e.target.value)}
            error={!!errors.address}
            helperText={errors.address}
            fullWidth
            required
            multiline
            rows={3}
            InputProps={{
              sx: {
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: '2px'
                  }
                },
                transition: 'all 0.2s'
              }
            }}
          />
        </Grid>
      </Grid>

      {Object.keys(errors).length > 0 && (
        <Fade in={Object.keys(errors).length > 0}>
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: 'error.light',
              color: 'error.dark',
              borderRadius: 1,
              opacity: 0.9
            }}
          >
            Please correct the errors above to continue.
          </Box>
        </Fade>
      )}
    </Box>
  )
}

export default ProfileForm
