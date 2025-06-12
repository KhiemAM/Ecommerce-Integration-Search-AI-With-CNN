import React from 'react'
import { Container } from '@mui/material'

const PageContainer = ({ children, maxWidth = 'lg' }) => {
  return (
    <Container maxWidth={maxWidth}>
      {children}
    </Container>
  )
}

export default PageContainer
