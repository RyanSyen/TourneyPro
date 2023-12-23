// import '../wdyr.ts';
import './index.scss';
import 'lib/i18n/config.ts';
import 'dayjs/locale/en.js';

import { ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import createMuiTheme from 'src/lib/mui/createMuiTheme.js';

import { UserContextProvider } from './context/userContext.tsx';
import router from './lib/router/config.tsx';

const theme = createMuiTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
