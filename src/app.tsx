import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NoSsr } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider, QueryClient } from 'react-query';

import { AppRouter } from 'containers/router';
import { theme } from 'config/theme.config';
import { AppProvider } from 'contexts/app';
import { AuthProvider } from 'contexts/auth';
import { AppNotification } from 'components/shared/app-nofitication';
import { AppDialog } from 'components/shared/app-dialog';
import { Title } from 'components/shared/app-title';
import './app.scss';

const queryClient = new QueryClient();

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NoSsr>
          <AppProvider>
            <AuthProvider>
              <Title />

              <AppRouter />

              <AppNotification />
              <AppDialog />
            </AuthProvider>
          </AppProvider>
        </NoSsr>
      </QueryClientProvider>
    </BrowserRouter>
  </ThemeProvider>
);
