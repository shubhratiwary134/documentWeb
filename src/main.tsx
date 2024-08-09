import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const theme = createTheme({
  palette: {
    mode: 'dark', 
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
    publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" 
    >
    <ThemeProvider theme={theme}>
     <CssBaseline />
    <App />
    </ThemeProvider>
    </ClerkProvider>
  
  </StrictMode>,
)
