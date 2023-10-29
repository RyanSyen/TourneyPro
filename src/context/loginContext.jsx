import { createContext, useContext, useState } from "react";

const LoginModalContext = createContext();

const useLoginModalContext = () => useContext(LoginModalContext);

const LoginModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const triggerModal = (data) => {
    setIsOpen(data);
  };

  return (
    <LoginModalContext.Provider value={{ isOpen, triggerModal }}>
      {children}
    </LoginModalContext.Provider>
  );
};

export { LoginModalContextProvider, useLoginModalContext };
