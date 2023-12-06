import './index.css';
import 'lib/i18n/config.ts';

import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import createMuiTheme from 'src/lib/mui/createMuiTheme.js';

import router from './lib/router/config.tsx';

const theme = createMuiTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
