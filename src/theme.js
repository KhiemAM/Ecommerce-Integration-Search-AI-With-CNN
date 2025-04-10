import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  colorSchemes: {
    light: {
      palette: {
        // primary: {
        //   main: '#73C7C7'
        // },
        // secondary: {
        //   main: '#dc004e'
        // }
      }
    },
    dark: {
      palette: {
        // primary: {
        //   main: '#90caf9'
        // },
        // secondary: {
        //   main: '#f48fb1'
        // }
      }
    }
  }
})

export default theme