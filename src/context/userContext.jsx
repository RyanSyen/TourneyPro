import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import CustomLoader from "../components/Common/CustomLoader";
import { auth, onAuthStateChange } from "../lib/firebase/auth";

const UserContext = createContext();
const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  var userData = null;

  if (loading) {
    return (
      <>
        <CustomLoader />
      </>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    userData = {
      id: user.uid,
      username: user.displayName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      photoURL: user.photoURL,
      mobileNumber: user.phoneNumber,
      providerData: user.providerData,
      providerId: user.providerId,
      accessToken: user.accessToken,
      lastSignIn: user.metadata.lastSignInTime,
    };
    return (
      <UserContext.Provider value={{ userData }}>
        {children}
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};

export { UserContextProvider, useUserContext };

/*
This userContext is combined with react-firebase-hooks, with the useAuthState hook.
The hook auto retrieve and monitor the auth state, it only triggers auth.onAuthStateChanged when a user signs in or signs out
Ref: https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#useauthstate
*/
