import { Box, Typography } from '@mui/material'
import React from 'react'
import ButtonSecondary from '~/components/Buttton/ButtonSecondary'
import Grid from '@mui/material/Grid2'
import CardCustom from '~/components/Card/CardCustom'

function WishlistPageManagement() {
  const handleMoveAllToBag = () => {}

  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Wishlist (4)</Typography>
        <ButtonSecondary title='Move All To Bag' onClick={handleMoveAllToBag}/>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Grid container spacing={2} >
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CardCustom />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CardCustom />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CardCustom />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CardCustom />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default WishlistPageManagement
