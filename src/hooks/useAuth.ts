import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

const useAuth = () => {
  const providers = [
    { id: 0, name: "google" },
    { id: 1, name: "facebook" },
    { id: 2, name: "github" },
  ];

  const signInWithProviders = async (id: number) => {
    var userCred;

    switch (id) {
      case 0:
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
    signOut(auth);
  };

  return {
    providers,
    signInWithProviders,
    logOut,
  };
};

export default useAuth;
