import React from 'react'
import { Grid, TextField } from '@mui/material'

const UserInfoSection = ({ userData, handleChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="First Name"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange('firstName')}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Last Name"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange('lastName')}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange('email')}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Address"
          name="address"
          value={userData.address}
          onChange={handleChange('address')}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Grid>
    </Grid>
  )
}

export default UserInfoSection
