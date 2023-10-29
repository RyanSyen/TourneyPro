import { createContext, useContext, useEffect, useState } from "react";

import { onAuthStateChange } from "../lib/firebase/auth";

const UserContext = createContext();
const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: false, data: {} });

  var isEmptyUserData = Object.keys(user.data).length === 0;
  useEffect(() => {
    console.log("calling useEffect");
    console.log(isEmptyUserData);
    console.log(user.data);
    const unsubscribe = () => onAuthStateChange(setUser);
    return () => {
      console.log("calling onAuthStateChange");
      unsubscribe();
    };
  }, []);

  if (user.data != {}) {
    return (
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
  }
};

export { UserContextProvider, useUserContext };
