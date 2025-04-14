import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

const Loading = ({ loading, size }) => {
  return (
    <Backdrop sx={{ color:'inherit', zIndex: (theme) => theme.zIndex.modal + 1 }} open={loading}>
      <CircularProgress color="inherit" size={size || 40} />
    </Backdrop>
  )
}

export default Loading
