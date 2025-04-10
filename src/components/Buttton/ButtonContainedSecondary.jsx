import { alpha, Button } from '@mui/material'
import React from 'react'

function ButtonContainedSecondary({ title, onClick }) {
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
        backgroundColor: '#F4F8D3',
        color: 'black',
        '&:hover': {
          backgroundColor: alpha('#F4F8D3', 0.8),
          boxShadow: 'none'
        }
      }}
    >
      {title}
    </Button>
  )
}

export default ButtonContainedSecondary
