"use client";

import { UserInfo } from "firebase/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { getUserByEmail } from "@/app/service/user/userService";
import CustomLoader from "@/components/common/customLoader";
import { auth } from "@/lib/firebase/index";
import { ProviderLookup } from "@/lookups/auth/providerLookup";
import { UserData } from "@/types/UserData";

interface IUserData {
  id: string;
  fullName: string | null;
  email: string | null;
  isEmailVerified: boolean;
  photoURL: string | null;
  mobileNumber: string | null;
  isFirstTimeUser: boolean;
}

const UserContext = createContext<IUserData | null>(null);
const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const path = usePathname();
  const search = useSearchParams();
  const isFirstTimeUserRef = useRef(true);

  // retrieve and monitor auth state
  // triggered when user signs in or out
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState<IUserData | null>(null); // State to hold user data

  console.log("user: ", user);

  useEffect(() => {
    if (!user) setUserData(null);

    if (user && user.email) {
      const getUser = async () => {
        console.log("calling getUser");
        try {
          let res = await getUserByEmail(user.email!);
          console.log(res);
          if (!res?.email) {
            console.log("user not found");
            // const isSignIn = search.get("signin");
            console.log(search);
            console.log(search.get("provider"));

            const isValidProvider = ProviderLookup.some(
              (provider) => provider.name === search.get("provider")
            );
            const isSignIn = location.pathname.includes("signin");

            console.log(
              `isSignIn: ${isSignIn} and isValidProvider: ${isValidProvider}`
            );

            setUserData({
              id: user.uid,
              fullName: user.displayName,
              email: user.email,
              isEmailVerified: user.emailVerified,
              photoURL: user.photoURL,
              mobileNumber: user.phoneNumber,
              isFirstTimeUser: true,
            });

            if (isSignIn && isValidProvider)
              // router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/?signup=true`);
              router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/signup`);
          } else {
            console.log("welcome back ", res.fullName);
            setUserData({
              id: user.uid,
              fullName: user.displayName,
              email: user.email,
              isEmailVerified: user.emailVerified,
              photoURL: user.photoURL,
              mobileNumber: user.phoneNumber,
              isFirstTimeUser: false,
            });
            router.push("/");
          }
        } catch (error) {
          console.error(error);
        }
      };

      getUser();
    }
  }, [user]);

  if (error) console.log(`[UserProvider] auth error: ${error}`);
  if (loading) console.log("[UserProvider] loading auth state");
  if (user) {
    let provider = user.providerData[0].providerId;
    provider = provider.endsWith(".com") ? provider.slice(0, -4) : provider;
    console.log(
      `[UserProvider] User logged in via ${provider} at ${new Date().toLocaleString()}`
    );
  }

  const value = React.useMemo(() => ({ userData }), [user, userData]);

  return (
    <UserContext.Provider value={value.userData}>
      {loading && <CustomLoader />}
      <div>{!loading && children}</div>
    </UserContext.Provider>
  );
};

export { type IUserData, UserContextProvider, useUserContext };