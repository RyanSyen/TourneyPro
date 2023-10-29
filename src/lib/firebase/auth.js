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

console.log("current user", user);

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

const onAuthStateChange = (setUser) => {
  console.log("called onAuthStateChange");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log("auth state changed: user signed in");
      var userData = {
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
      setUser({ loggedIn: true, data: userData });
    } else {
      // User is signed out
      // ...
      console.log("auth state changed: user signed out");
      setUser({ loggedIn: false });
    }
  });
};

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
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);

    // const user = await getUser(res._tokenResponse.idToken);
    console.log(getCurrentUser());
  } catch (err) {
    console.error(err);
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
  logInWithEmailAndPassword,
  logout,
  onAuthStateChange,
  registerWithEmailAndPassword,
  sendPasswordReset,
  signInWithGoogle,
};
