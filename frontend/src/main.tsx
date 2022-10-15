import React from 'react'
import ReactDOM from 'react-dom/client'

import { BackendRustProvider } from './providers/BackendRust'
import { ThemeProvider } from './providers/Theme'
import { RoutesProvider } from './providers/Routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BackendRustProvider>
        <RoutesProvider />
      </BackendRustProvider>
    </ThemeProvider>
  </React.StrictMode>
)
