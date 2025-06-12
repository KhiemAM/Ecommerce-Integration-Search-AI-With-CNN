import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 600
    },
    h3: {
      fontWeight: 600
    },
    h4: {
      fontWeight: 600
    },
    h5: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 12
  },  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#73C7C7',
          light: '#95D4D4',
          dark: '#5BB0B0',
          contrastText: '#FFFFFF'
        },
        secondary: {
          main: '#FF8A80',
          light: '#FFAB9B',
          dark: '#E67368',
          contrastText: '#FFFFFF'
        },
        background: {
          default: '#FAFAFA',
          paper: '#FFFFFF'
        },
        text: {
          primary: '#2D3748',
          secondary: '#718096'
        },
        grey: {
          50: '#F7FAFC',
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E0',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1A202C',
          900: '#171923'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#95D4D4',
          light: '#B3E0E0',
          dark: '#73C7C7',
          contrastText: '#000000'
        },
        secondary: {
          main: '#FFAB9B',
          light: '#FFC4B8',
          dark: '#FF8A80',
          contrastText: '#000000'
        },
        background: {
          default: '#1A202C',
          paper: '#2D3748'
        },
        text: {
          primary: '#F7FAFC',
          secondary: '#CBD5E0'
        }
      }
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 24px'
        },        contained: {
          boxShadow: '0 4px 14px 0 rgba(115, 199, 199, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 20px 0 rgba(115, 199, 199, 0.4)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
          borderRadius: 16,
          '&:hover': {
            boxShadow: '0 8px 30px 0 rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease'
          }
        }
      }
    }
  }
})

export default theme