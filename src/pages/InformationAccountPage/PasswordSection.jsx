import React from 'react'
import { Grid, TextField } from '@mui/material'

const PasswordSection = ({ passwords, handleChange }) => {
  const passwordMismatch =
    passwords.newPassword &&
    passwords.confirmPassword &&
    passwords.newPassword !== passwords.confirmPassword

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Current Password"
          name="currentPassword"
          type="password"
          value={passwords.currentPassword}
          onChange={handleChange('currentPassword')}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="New Password"
          name="newPassword"
          type="password"
          value={passwords.newPassword}
          onChange={handleChange('newPassword')}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={passwords.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={passwordMismatch}
          helperText={passwordMismatch ? 'Passwords don\'t match' : ''}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Grid>
    </Grid>
  )
}

export default PasswordSection
