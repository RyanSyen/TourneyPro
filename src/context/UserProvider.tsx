"use client";

import { UserInfo } from "firebase/auth";
import { createContext, ReactNode, useContext } from "react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/lib/firebase/index";

interface IUserData {
  id: string;
  fullName: string | null;
  email: string | null;
  isEmailVerified: boolean;
  photoURL: string | null;
  mobileNumber: string | null;
  //   providerData: UserInfo[];
  //   providerId: string;
  //   lastSignIn: string | undefined;
}

const UserContext = createContext<IUserData | null>(null);
const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, loading, error] = useAuthState(auth);
  let userData: IUserData | null = null;

  if (error) console.error(error);
  if (loading) console.log("loading");
  if (user) {
    // console.log("user", user);
    userData = {
      id: user.uid,
      fullName: user.displayName,
      email: user.email,
      isEmailVerified: user.emailVerified,
      photoURL: user.photoURL,
      mobileNumber: user.phoneNumber,
      //   providerData: user.providerData,
      //   providerId: user.providerId,
      //   lastSignIn: user.metadata.lastSignInTime,
    };
  }

  const value = React.useMemo(() => ({ userData }), [userData]);

  return (
    <UserContext.Provider value={value.userData}>
      <div>{!loading && children}</div>
    </UserContext.Provider>
  );
};

export { UserContextProvider, useUserContext };