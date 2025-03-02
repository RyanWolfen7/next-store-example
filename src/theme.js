import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    white: {
      main: '#ffffff'
    },
    accent: {
      main: '#FDAC3B'
    },
    main: {
      main: '#0F6AC4',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#3BA5FC'
    },
    text_color: {
      main: '#4A4A4A'
    },
    error: {
      main: red.A400
    }
  }
})

export default theme
