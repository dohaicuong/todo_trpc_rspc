import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'

import { theme } from './theme'
import './font'

type ThemeProviderProps = {
  children?: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
