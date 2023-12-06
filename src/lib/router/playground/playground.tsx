import { createBrowserRouter } from 'react-router-dom';

import Contact from './routes/contact.tsx';
import ErrorPage from './routes/error.tsx';
// import App from '../../../App.tsx';
import Root from './routes/root.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, // this is our layout page which wraps all the other pages
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'contacts/:contactId',
        element: <Contact />, // to render this we need to tell the root route where to render its child routes using Outlet
      },
    ],
  },
]);

export default router;
