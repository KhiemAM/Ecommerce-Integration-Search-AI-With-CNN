import React from 'react'
import { SearchX, RefreshCw } from 'lucide-react'
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  InputAdornment,
  Stack
} from '@mui/material'

function NoResults() {
  return (
    <Stack spacing={3} alignItems="center" textAlign="center" p={4}>
      <Box position="relative">
        <SearchX style={{ width: 64, height: 64, color: '#94a3b8' }} />
        <RefreshCw
          style={{
            width: 32,
            height: 32,
            color: '#2196f3',
            position: 'absolute',
            right: -8,
            bottom: -8,
            animation: 'spin 2s linear infinite'
          }}
        />
      </Box>
      <Typography variant="h4" component="h2" color="text.primary">
        No Results Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 'md' }}>
        We couldn't find what you're looking for. Try adjusting your search terms or filters.
      </Typography>
      <Button
        variant="contained"
        onClick={() => window.location.reload()}
        startIcon={<RefreshCw />}
        sx={{ mt: 2 }}
      >
        Try Again
      </Button>
    </Stack>
  )
}

function NoResultPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.50',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <NoResults />
      </Container>
    </Box>
  )
}

export default NoResultPage