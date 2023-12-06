import Navbar from 'components/navigation/navbar/Navbar.tsx';
import React from 'react';
import App from 'src/App.tsx';
import AuthModal from 'src/features/auth/components/AuthModal.tsx';
import useMainLayout from 'src/hooks/useMainLayout.ts';

import Error404 from './error404.tsx';

const MainLayout = () => {
  const { isLangValid } = useMainLayout();

  return (
    <>
      {(() => {
        if (isLangValid) {
          return (
            <>
              <Navbar />
              <AuthModal />
              <App />
            </>
          );
        }

        return <Error404 />;
      })()}
    </>
  );
};

export default React.memo(MainLayout);
