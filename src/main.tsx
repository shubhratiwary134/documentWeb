import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import './index.css'

const theme = createTheme({
  palette: {
    mode: 'dark', 
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider theme={theme}>
     <CssBaseline />
    <App />
    </ThemeProvider>
  </StrictMode>,
)
