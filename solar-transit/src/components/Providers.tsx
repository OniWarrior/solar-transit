'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import solarTheme from '../theme/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={solarTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
