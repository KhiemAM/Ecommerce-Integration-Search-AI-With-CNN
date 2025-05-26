import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
  Typography
} from '@mui/material'
import { Check, Save, ArrowLeft } from 'lucide-react'
import ProfileForm from './ProfileForm'
import { validateFormData } from '../utils/formUtils'

const initialUserData = {
  first_name: '',
  last_name: '',
  date_of_birth: null,
  gender: '',
  address: ''
}

// Simulates a mock API call with a delay
const saveUserData = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Saving data:', data)
      resolve(data)
    }, 1500)
  })
}

const UserProfileUpdate = () => {
  const [userData, setUserData] = useState(initialUserData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [errors, setErrors] = useState({})
  const [hasChanges, setHasChanges] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const mockData = {
          first_name: 'John',
          last_name: 'Doe',
          date_of_birth: new Date('1990-01-01'),
          gender: 'male',
          address: '123 Main St, Anytown, USA'
        }
        setUserData(mockData)
      } catch (err) {
        setError('Failed to load user data')
        setSnackbarMessage('Failed to load user data')
        setSnackbarSeverity('error')
        setShowSnackbar(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateFormData(userData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSnackbarMessage('Please fix the errors in the form')
      setSnackbarSeverity('error')
      setShowSnackbar(true)
      return
    }

    setLoading(true)
    setSuccess(false)

    try {
      await saveUserData(userData)
      setSuccess(true)
      setHasChanges(false)
      setSnackbarMessage('Profile updated successfully')
      setSnackbarSeverity('success')
      setShowSnackbar(true)
    } catch (err) {
      setError('Failed to update profile')
      setSnackbarMessage('Failed to update profile')
      setSnackbarSeverity('error')
      setShowSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    if (hasChanges && !window.confirm('Are you sure you want to reset all changes?')) {
      return
    }

    setUserData(initialUserData)
    setErrors({})
    setHasChanges(false)
    setSnackbarMessage('Form has been reset')
    setSnackbarSeverity('info')
    setShowSnackbar(true)
  }

  const handleSnackbarClose = () => {
    setShowSnackbar(false)
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton
          aria-label="back"
          sx={{ mr: 2 }}
          onClick={() => console.log('Back button clicked')}
        >
          <ArrowLeft />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Update Your Profile
        </Typography>
      </Box>

      <Card
        sx={{
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        <CardHeader
          title="Personal Information"
          subheader="Update your personal details and information"
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'rgba(33, 150, 243, 0.03)'
          }}
        />
        <CardContent>
          {loading && !hasChanges ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <ProfileForm
              userData={userData}
              onChange={handleChange}
              errors={errors}
            />
          )}
        </CardContent>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            disabled={loading || !hasChanges}
          >
            Reset
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {success && (
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                <Check size={16} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Saved
                </Typography>
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading || !hasChanges}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save size={16} />}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Card>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default UserProfileUpdate
