import { createTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: red[800],
    },
    secondary: {
      main: '#282b32',
    },
  },
});

export default theme;