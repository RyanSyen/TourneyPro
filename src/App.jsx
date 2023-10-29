import "./App.css";

import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";

import CustomLoader from "./components/Common/CustomLoader";
import { onAuthStateChange } from "./lib/firebase/auth";
import router from "./lib/router/router.jsx";

function App() {
  const [user, setUser] = useState({ loggedIn: false, data: {} });

  useEffect(() => {
    const handleOnTabClose = (e) => {
      e.preventDefault();
      // Chrome will only show dialog if user has interacted with the page
      return (e.returnValue = "Are you sure you want to exit?");
    };

    window.addEventListener("beforeunload", handleOnTabClose, {
      capture: true,
    });

    const unsubscribe = () => onAuthStateChange(setUser);

    return () => {
      // cleanup event listener to prevent memory leak
      window.removeEventListener("beforeunload", handleOnTabClose);

      unsubscribe();
    };
  }, []);
  // console.log(import.meta.env);
  return (
    <RouterProvider
      router={router}
      fallbackElement={<CustomLoader />}
      future={{ v7_startTransition: true }}
    />
  );
}

export default App;
