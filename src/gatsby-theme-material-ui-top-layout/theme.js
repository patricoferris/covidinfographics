import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#111111',
      main: '#ffffff',
      dark: '#006978',
      contrastText: '#111111',
    },
    secondary: {
      light: '#ff5131',
      main: '#E2EEC2',
      dark: '#9b0000',
      contrastText: '#ffffff',
    },
  },
})

export default theme
