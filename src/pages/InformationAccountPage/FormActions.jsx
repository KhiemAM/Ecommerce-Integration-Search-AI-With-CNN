import React from 'react'
import { Box, Button, CircularProgress } from '@mui/material'

const FormActions = ({ onCancel, isSubmitting }) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 2,
      mt: 2
    }}>
      <Button
        variant="text"
        color="secondary"
        onClick={onCancel}
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
  )
}

export default FormActions
