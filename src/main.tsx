import { createRoot } from 'react-dom/client';
import Router from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Global } from '@emotion/react';
import { globalStyles } from './styles/globalStyles';
import theme from './styles/theme';
import { ThemeProvider } from '@mui/material';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Router />
    </ThemeProvider>
  </QueryClientProvider>,
);
