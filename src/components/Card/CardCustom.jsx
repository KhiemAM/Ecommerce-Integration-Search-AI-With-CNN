import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

export default function CardCustom() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{
          height: 200,
          position: 'relative',
          overflow: 'hidden',
          '&:hover .hover-button': {
            bottom: '10px',
            opacity: 1
          },
          '&:hover .hover-DeleteForeverOutlinedIcon': {
            opacity: 1
          },
          '&.MuiCardMedia-root': {
            backgroundSize: '150px',
            backgroundColor: '#F4F8D3'
          }
        }}
        image="./src/assets/img/duffle-bag-1.png"
        title="green iguana"
      >
        <DeleteForeverOutlinedIcon className='hover-DeleteForeverOutlinedIcon' sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          color: 'black',
          cursor: 'pointer',
          opacity: 0
        }}/>
        <Button
          className="hover-button"
          variant="contained"
          startIcon={<LocalGroceryStoreOutlinedIcon />}
          sx={{
            width: '100%',
            position: 'absolute',
            bottom: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0,
            transition: 'all 0.3s ease-in-out',
            backgroundColor: '#73C7C7',
            borderRadius: 0,
            color: 'white'
          }}
        >
          Add To Card
        </Button>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'red' }}>
          $996
        </Typography>
      </CardContent>
    </Card>
  )
}
