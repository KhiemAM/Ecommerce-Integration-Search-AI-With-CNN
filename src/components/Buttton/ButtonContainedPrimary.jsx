import { alpha, Button } from '@mui/material'
import React from 'react'

function ButtonContainedPrimary({ title, onClick }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      fullWidth
      sx={{
        borderRadius: '8px',
        padding: '10px 24px',
        textTransform: 'none',
        fontWeight: 600,
        boxShadow: 'none',
        backgroundColor: '#73C7C7',
        '&:hover': {
          backgroundColor: alpha('#73C7C7', 0.8),
          boxShadow: 'none'
        }
      }}
    >
      {title}
    </Button>
  )
}

export default ButtonContainedPrimary
