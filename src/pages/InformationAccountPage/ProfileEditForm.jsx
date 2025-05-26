import React, { useState } from 'react'
import { Box, Grid, Typography, Divider } from '@mui/material'
import UserInfoSection from './UserInfoSection'
import PasswordSection from './PasswordSection'
import FormActions from './FormActions'

const ProfileEditForm = () => {
  const [userData, setUserData] = useState({
    firstName: 'Md',
    lastName: 'Rimel',
    email: 'rimel1111@gmail.com',
    address: 'Kingston, 5236, United State'
  })

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUserDataChange = (field) => (event) => {
    setUserData({
      ...userData,
      [field]: event.target.value
    })
  }

  const handlePasswordChange = (field) => (event) => {
    setPasswords({
      ...passwords,
      [field]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log('Submitted data:', { userData, passwords })
      setIsSubmitting(false)
    }, 1500)
  }

  const handleCancel = () => {
    console.log('Cancelled')
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
        Edit Your Profile
      </Typography>

      <Box mt={3}>
        <UserInfoSection
          userData={userData}
          handleChange={handleUserDataChange}
        />
      </Box>

      <Box mt={4} mb={3}>
        <Divider />
      </Box>

      <Box mt={3}>
        <Typography variant="h6" component="h2" gutterBottom>
          Password Changes
        </Typography>
        <PasswordSection
          passwords={passwords}
          handleChange={handlePasswordChange}
        />
      </Box>

      <Box mt={4}>
        <FormActions
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </Box>
    </Box>
  )
}

export default ProfileEditForm
