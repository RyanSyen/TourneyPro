import dayjs from "dayjs";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

// import { clearCache } from "@/helper/cacheable";
import { auth } from "@/lib/firebase";
import { UserData } from "@/types/UserData";

const useAuth = () => {
  const [refreshHash, setRefreshHash] = useState(false);
  const router = useRouter();
  const providers = [
    { id: 0, name: "google" },
    { id: 1, name: "facebook" },
    { id: 2, name: "github" },
  ];
  const [userData, setUserData] = useState<UserData | null>(null); // State to hold user data

  const changeUserData = useCallback(
    (data: UserData | null) => {
      setUserData(data);
    },
    [userData]
  );

  const refreshProvider = () => {
    // we want to refresh our provider to get the latest user data
    console.log("trigger refresh provider");
    setRefreshHash((prev) => !prev);
  };

  const signInWithProviders = async (id: number) => {
    var userCred;

    switch (id) {
      case 0:
        const authUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/signin?provider=${providers[id].name}`;
        router.push(authUrl);
        userCred = await signInWithPopup(auth, new GoogleAuthProvider());
        console.log("Google user cred: ", userCred);

        break;
      case 1:
        userCred = await signInWithPopup(auth, new FacebookAuthProvider());
        console.log("Facebook user cred: ", userCred);
        break;
      case 2:
        userCred = await signInWithPopup(auth, new GithubAuthProvider());
        console.log("Github user cred: ", userCred);
        break;
      default:
        break;
    }
  };

  const logOut = () => {
    console.log("logging out");
    // clearCache();
    signOut(auth);
    router.push("/");
  };

  return {
    providers,
    signInWithProviders,
    logOut,
    userData,
    changeUserData,
    refreshHash,
    refreshProvider,
  };
};

export default useAuth;
