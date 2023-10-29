import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useLoginModalContext } from "../../context/loginContext";
import SignInForm from "../Form/SignInForm";
import BaseModal from "./Modal";

const LoginModalWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.background.modal,
  width: "100%",
  padding: "0 3rem",
  marginTop: "2rem",
}));

const LoginModal = (props) => {
  const { t: localizer } = useTranslation("global");
  const { isOpen, triggerModal } = useLoginModalContext();

  const handleModalClose = () => {
    triggerModal(false);
  };

  const onTransitionEnter = () => {
    // do something when a transition enters
    console.log("transition enter");
  };

  const onTransitionExited = () => {
    // do something when a transition has exited
    console.log("transition exited");
  };

  return (
    <BaseModal
      open={isOpen}
      handleModalClose={handleModalClose}
      onTransitionEnter={onTransitionEnter}
      onTransitionExited={onTransitionExited}
      title={localizer("header.label_signin")}
      desc="Welcome back! Player ready?"
      showAppLogo={true}
    >
      <LoginModalWrapper>
        <SignInForm />
      </LoginModalWrapper>
    </BaseModal>
  );
};

export default LoginModal;
