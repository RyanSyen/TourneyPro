"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { getUserByEmail } from "@/app/service/user/userService";
import CustomBounceLoader from "@/components/spinner/customBounceLoader";
// import { cacheable } from "@/helper/cacheable";
import { capitalizeFirstLetter } from "@/helper/common";
import { auth } from "@/lib/firebase/index";
import { ProviderLookup } from "@/lookups/auth/providerLookup";
import {
  ProtectedRoutes,
  SignedInProtectedRoutes,
} from "@/lookups/protected/routes";
import { UserData } from "@/types/UserData";

import useAuth from "../hooks/useAuth";

interface ContextProps {
  user: UserData | null;
  refreshProvider: () => void;
}

const UserContext = createContext<ContextProps | null>(null);
const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const path = usePathname();
  const search = useSearchParams();
  const authHook = useAuth();
  const [refreshProvider, setRefreshProvider] = useState(false);

  const handleRefreshProvider = () => {
    setRefreshProvider((prev) => !prev);
  };

  // retrieve and monitor auth state
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      // console.error("user authenticated");
      if (SignedInProtectedRoutes.includes(path)) router.push(`/404`);
    } else {
      // console.error("user not authenticated");
      if (ProtectedRoutes.includes(path)) router.push(`/404`);
    }
  }, [user, path, router]);

  useEffect(() => {
    if (!user) {
      authHook.changeUserData(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await getUserByEmail(user.email!);
        const isValidProvider = ProviderLookup.some(
          (provider) => provider.name === search.get("provider")
        );
        const isSignIn = path.includes("signin");

        if (!res?.email) {
          authHook.changeUserData({
            fullName: user.displayName || "",
            email: user.email || "",
            isEmailVerified: user.emailVerified,
            photoUrl: user.photoURL || "",
            phoneNumber: user.phoneNumber || "",
            roleId: 0,
            area: "",
            dob: "",
            gender: "",
          });

          if (isSignIn && isValidProvider) {
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/signup`);
          }
        } else {
          console.log(
            `🏆 Welcome Back ${capitalizeFirstLetter(res.fullName)} 🏆`
          );

          authHook.changeUserData({
            id: res.id,
            fullName: res.fullName || user.displayName || "",
            email: res.email || user.email || "",
            isEmailVerified: res.isEmailVerified || user.emailVerified,
            photoUrl: res.photoUrl || user.photoURL || "",
            phoneNumber: res.phoneNumber || user.phoneNumber || "",
            roleId: res.roleId,
            area: res.area,
            dob: res.dob,
            gender: res.gender,
          });

          if (isSignIn && isValidProvider) {
            router.push("/");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [user, authHook.refreshHash, refreshProvider]);

  useEffect(() => {
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
  }, [error, loading, user]);

  // memoize context value
  const contextValue = React.useMemo(
    () => ({
      user: authHook.userData,
      refreshProvider: handleRefreshProvider,
    }),
    [authHook.userData, handleRefreshProvider]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {loading && <CustomBounceLoader />}
      <div>{!loading && children}</div>
    </UserContext.Provider>
  );
};

export { UserContextProvider, useUserContext };
