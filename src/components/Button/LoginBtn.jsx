import { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { useLoginModalContext } from "../../context/loginContext";
import { LoginModal } from "../Modal";
import Btn from "./Button";

const LoginBtn = () => {
  const { t: localizer } = useTranslation("global");
  const { isOpen, triggerModal } = useLoginModalContext();

  const elProp = {
    variant: "nav",
    disabled: false,
    size: "medium",
    startIcon: <></>,
    endIcon: <></>,
    isUploadBtn: false,
  };

  const goToLogin = (e) => {
    triggerModal(true);
  };

  const localizedText = localizer("header.label_signin");

  return (
    <>
      <Btn el={elProp} text={localizedText} onClick={goToLogin} />
      {isOpen && <LoginModal />}
    </>
  );
};

export default LoginBtn;
