import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import './index.css'

//React router dom
import { BrowserRouter } from 'react-router-dom'

//Redux store
import { store } from '~/redux/stores.js'
import { Provider } from 'react-redux'

//Redux persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename='/'>
        <ThemeProvider theme={theme}>
          <GlobalStyles styles={{ a: { textDecoration: 'none', color: 'inherit' } }}/>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
