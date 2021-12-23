import { createTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: red[800],
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#242526',
    },
    secondary: {
      main: '#282b32',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'html, body, body>div': {
          height: '100%',
        },
      },
    },
  },
});

export default theme;