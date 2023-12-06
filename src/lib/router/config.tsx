import detectBrowserLanguage from 'detect-browser-language';
import { atom, useAtom } from 'jotai';
import { createBrowserRouter, redirect } from 'react-router-dom';
import App from 'src/App';
import browserLangAtom from 'src/atoms/browserLangAtom';
import useAppLang from 'src/hooks/useAppLang';
import Error404 from 'src/pages/error404.tsx';
import InitAppLang from 'src/pages/initAppLang';
import MainLayout from 'src/pages/layout';

const router = createBrowserRouter(
  [
    {
      path: '/',
      // element: (),
      loader: () => {
        const langCode = detectBrowserLanguage().split('-')[0];
        return redirect(`/${langCode}`);
      },
      errorElement: <Error404 />,
    },
    {
      path: '/:language',
      element: <MainLayout />,
      errorElement: <Error404 />,
    },
    // {
    //   path: '/:lang',
    //   element: <MainLayout />,
    //   errorElement: <Error404 />,
    //   children: [
    //     {
    //       path: '/:lang/home',
    //       element: <App />,
    //     },
    //   ],
    // },
  ],
  {
    basename: '/',
    future: { v7_normalizeFormMethod: true, v7_fetcherPersist: true },
  }
);

export default router;
