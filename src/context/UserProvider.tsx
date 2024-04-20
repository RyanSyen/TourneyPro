"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
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
import { ProtectedRoutes } from "@/lookups/protected/routes";
import { UserData } from "@/types/UserData";

import useAuth from "../hooks/useAuth";

const UserContext = createContext<UserData | null>(null);
const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const path = usePathname();
  const search = useSearchParams();
  const authHook = useAuth();

  // retrieve and monitor auth state
  // triggered when user signs in or out
  const [user, loading, error] = useAuthState(auth);
  // const [userData, setUserData] = useState<UserData | null>(null); // State to hold user data

  // console.log("user: ", user);

  if (!user) {
    if (ProtectedRoutes.includes(path)) router.push(`/404`);
  }

  useEffect(() => {
    if (!user) {
      authHook.changeUserData(null);
    }

    if (user && user.email) {
      const getUser = async () => {
        console.log("calling getUser");
        try {
          let res = await getUserByEmail(user.email!);
          const isValidProvider = ProviderLookup.some(
            (provider) => provider.name === search.get("provider")
          );
          const isSignIn = location.pathname.includes("signin");

          if (!res?.email) {
            authHook.changeUserData({
              fullName: user.displayName || "",
              email: user.email || "",
              isEmailVerified: user.emailVerified,
              photoURL: user.photoURL || "",
              phoneNumber: user.phoneNumber || "",
              roleId: 0,
            });

            if (isSignIn && isValidProvider)
              router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/signup`);
          } else {
            console.log("welcome back ", res.fullName);
            authHook.changeUserData({
              fullName: user.displayName || "",
              email: user.email || "",
              isEmailVerified: user.emailVerified,
              photoURL: user.photoURL || "",
              phoneNumber: user.phoneNumber || "",
              roleId: 0,
            });

            if (isSignIn && isValidProvider) router.push("/");
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
      `[UserProvider] ${
        user.displayName
      } logged in via ${provider} at ${new Date().toLocaleString()}`
    );
  }

  // const value = React.useMemo(() => ({ authHook.userData }), [user, authHook.userData]);

  return (
    <UserContext.Provider value={authHook.userData}>
      {loading && <CustomLoader />}
      <div>{!loading && children}</div>
    </UserContext.Provider>
  );
};

export { UserContextProvider, useUserContext };
