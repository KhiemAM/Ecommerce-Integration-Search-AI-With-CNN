import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { ChevronRight } from 'lucide-react'
import { categories } from './data'

const Sidebar = ({ isDesktop = true }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  if (!isDesktop && !isMobile) {
    return null
  }

  return (
    <Box
      component="nav"
      sx={{
        width: '100%',
        maxWidth: isDesktop ? 250 : '100%',
        bgcolor: 'background.paper',
        borderRight: isDesktop ? 1 : 0,
        borderColor: 'divider'
      }}
    >
      <List disablePadding>
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
            <ListItem
              button
              sx={{
                py: 1.5,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)'
                },
                transition: 'background-color 0.3s ease'
              }}
            >
              <ListItemText
                primary={category.name}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              />
              {category.hasSubmenu && (
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                  <ChevronRight size={18} />
                </ListItemIcon>
              )}
            </ListItem>
            {index !== categories.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar
