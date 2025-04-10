import { alpha, Button } from '@mui/material'
import React from 'react'

function ButtonSecondary({ title, onClick }) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        color: 'black',
        borderColor: '#73C7C7',
        borderRadius: '8px',
        padding: '10px 24px',
        textTransform: 'none',
        fontWeight: 600,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
          bgcolor: alpha('#73C7C7', 0.8),
          color: 'white'
        }
      }}
    >
      {title}
    </Button>
  )
}

export default ButtonSecondary
