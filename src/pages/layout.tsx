import { signOut } from 'firebase/auth';
import { useAtom } from 'jotai';
import React from 'react';
import App from 'src/App.tsx';
import Btn from 'src/components/inputs/button/Button.tsx';
// import { userAtom, UserContextProvider } from 'src/context/userContext.tsx';
import AuthModal from 'src/features/auth/components/AuthModal.tsx';
import Navbar from 'src/features/navbar/components/Navbar.tsx';
import useMainLayout from 'src/hooks/useMainLayout.ts';
import auth from 'src/lib/firebase/initAuth.ts';

import Error404 from './error404.tsx';

const MainLayout = () => {
  const { isLangValid } = useMainLayout();
  // const [user] = useAtom(userAtom);

  // console.log('user', user);

  return (
    <>
      {(() => {
        if (isLangValid) {
          return (
            <>
              <Navbar />
              <AuthModal />
              <App />
              <Btn
                disableRipple
                disableFocusRipple
                disableTouchRipple
                variant="login"
                disabled={false}
                size="medium"
                isUploadBtn={false}
                type="button"
                onClick={() => {
                  signOut(auth);
                }}
              >
                sign out
              </Btn>
            </>
          );
        }

        return <Error404 />;
      })()}
    </>
  );
};

export default React.memo(MainLayout);
