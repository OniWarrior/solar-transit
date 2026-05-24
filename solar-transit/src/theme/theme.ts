'use client';

import { createTheme } from '@mui/material/styles';

const solarTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#0a0a0a',
    },
    primary: {
      main: '#c9a84c',       // gold accent
      light: '#e8d5a3',
      dark: '#9a7a2e',
      contrastText: '#000',
    },
    secondary: {
      main: '#4a8fe8',       // cold blue for space accents
      contrastText: '#fff',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.6)',
      disabled: 'rgba(255,255,255,0.3)',
    },
    divider: 'rgba(255,255,255,0.06)',
  },

  typography: {
    fontFamily: '"Raleway", sans-serif',
    h1: { fontFamily: '"Orbitron", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Orbitron", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Orbitron", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Orbitron", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Orbitron", sans-serif', fontWeight: 400 },
    h6: { fontFamily: '"Orbitron", sans-serif', fontWeight: 400 },
    button: {
      fontFamily: '"Orbitron", sans-serif',
      letterSpacing: '0.1em',
    },
  },

  shape: {
    borderRadius: 2,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * { box-sizing: border-box; }
        body { background: #000; }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          borderRadius: '2px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default solarTheme;
