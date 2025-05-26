import React from 'react'
import { Box, Paper } from '@mui/material'
import ProfileEditForm from './ProfileEditForm'

const InformationAccountManagement = () => {
  return (
    <Box>
      <Paper
        elevation={1}
        sx={{
          my: 3,
          p: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <ProfileEditForm />
      </Paper>
    </Box>
  )
}

export default InformationAccountManagement
