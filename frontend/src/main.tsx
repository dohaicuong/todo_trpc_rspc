import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BackendRustProvider } from './providers/BackendRust'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BackendRustProvider>
      <App />
    </BackendRustProvider>
  </React.StrictMode>
)
