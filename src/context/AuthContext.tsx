// source: https://www.stoman.me/articles/nextjs-firebase-auth

"use client";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { getUserByEmail } from "@/app/service/user/userService";
import { capitalizeFirstLetter } from "@/helper/common";
import { auth } from "@/lib/firebase";
import { UserData } from "@/types/UserData";

interface ContextProps {
  user: UserData | null;
  signUpWithEmailAndPassword: (email: string, password: string) => void;
  loginWithEmailAndPassword: (email: string, password: string) => void;
  logOut: () => void;
}

const AuthContext = createContext<ContextProps | null>(null);
const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const existingUser = await getUserByEmail(user.email ?? "");

          if (existingUser.email) {
            console.log(
              `🏆 Welcome Back ${capitalizeFirstLetter(
                existingUser.fullName
              )} 🏆`
            );
            setUser({
              id: existingUser.id,
              fullName: existingUser.fullName,
              area: existingUser.area,
              dob: existingUser.dob,
              email: existingUser.email,
              gender: existingUser.gender,
              isEmailVerified: existingUser.isEmailVerified,
              phoneNumber: existingUser.phoneNumber,
              photoUrl: existingUser.photoUrl,
              roleId: existingUser.roleId,
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

  const signUpWithEmailAndPassword = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser(null);
    return await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUpWithEmailAndPassword,
        loginWithEmailAndPassword,
        logOut,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, useAuthContext };
