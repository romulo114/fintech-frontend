import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouter } from 'containers/router'
import { theme } from 'config/theme.config'

import './app.scss'

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </ThemeProvider>
);
