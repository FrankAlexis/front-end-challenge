import React from 'react'
import { ThemeProvider } from '@mui/material'
import { AppRouter } from '@/infra/router'
import { theme } from './config'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
