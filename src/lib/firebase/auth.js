import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import userObj from "./../../model/security/user";
import app from "./firebase";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const user = auth.currentUser;

if (user != null) {
  console.log(user.providerData);
  const uid = user.uid;
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  var data = {
    uid,
    displayName,
    email,
    photoURL,
    emailVerified,
  };
  console.log(data);
}

//* we dont need to init or handle onAuthStateChange. We can use the useAuthState hook to handle the events for us
// const onAuthStateChange = (onSetUser) => {
//   console.log("called onAuthStateChange");
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/auth.user
//       console.log("auth state changed: user signed in");
//       var userData = {
//         id: user.uid,
//         username: user.displayName,
//         email: user.email,
//         isEmailVerified: user.isEmailVerified,
//         photoURL: user.photoURL,
//         mobileNumber: user.phoneNumber,
//         providerData: user.providerData,
//         providerId: user.providerId,
//         accessToken: user.accessToken,
//         lastSignIn: user.metadata.lastSignInTime,
//       };
//       //   setUser({ loggedIn: true, data: userData });
//       onSetUser({ loggedIn: true, data: userData });
//     } else {
//       // User is signed out
//       // ...
//       console.log("auth state changed: user signed out");
//       onSetUser({ loggedIn: false });
//     }
//   });
// };

const getCurrentUser = () => {
  return auth.currentUser;
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  console.log("login");
  try {
    await signInWithEmailAndPassword(auth, email, password);

    // console.log(getCurrentUser());
    return "success";
  } catch (err) {
    // console.error(err);
    // console.error(err.code);
    return err.code;
  }
};

const registerWithEmailAndPassword = async (user) => {
  console.log(user);
  const { email, password } = user;
  console.log(email, password);
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    // res.user.sendEmailVerification();
    console.log(user);
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordReset = async (email) => {
  try {
    const res = await sendPasswordResetEmail(auth, email);
    console.log(res);
    console.log("password reset link sent");
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  console.log("logged out");
  signOut(auth);
};

export {
  auth,
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  sendPasswordReset,
  signInWithGoogle,
};

/*  Auth state persistance
  default behavior - persist a user's session even after the user closes the browser. But there are few cases where this might not be ideal:
  - apps with sensitive data may want to clear state when the window or tab is closed
  - apps that are used on a device shared by multiple users such as a library computer
  
  more: https://firebase.google.com/docs/auth/web/auth-state-persistence
*/
