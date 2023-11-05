import styled from "@emotion/styled";
import { Modal } from "@mui/base";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import logo64 from "../../assets/logo/logo_64.png";
import { useStyle } from "../../context/styleContext";
import AppLogo from "../Common/Applogo";

const CustomLinkOptions = {
  shouldForwardProp: (prop) => prop !== "styleConst",
  label: "CustomLink",
};

const ModalContentWrapper = styled(Box)(({ theme }) => {
  // your logic

  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    maxWidth: "100%",
    width: "32rem",
    backgroundColor: theme.background.modal,
    borderRadius: theme.border.borderRadius.modal,
    padding: "1.25rem",
  };
});

const CustomModal = styled(Modal)(({ theme }) => {
  // your logic

  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
  };
});

const CloseBtnLink = styled(
  Link,
  CustomLinkOptions
)(({ theme, styleConst }) => {
  return {
    color: styleConst.typography_tertiary_color,

    "&:hover": {
      color: theme.dropdown.primaryHover,
    },
  };
});

const BaseModal = (props) => {
  const styleConst = useStyle();

  // console.log(props.showAppLogo);

  return (
    <>
      <CustomModal
        open={props.open || false}
        onClose={props.handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition={true} // if true, the modal waits until a nested transition is completed before closing
        disableAutoFocus={false} // dont set to true for accessibility
        disableEnforceFocus={false} // dont set to true for accessibility
        disableEscapeKeyDown={false} // if true, esc key will not trigger onClose
        disablePortal={true} // if true, children will be under parent DOM
        disableRestoreFocus={false} // if true, modal will not restore focus to previously focused element after modal is unmounted
        disableScrollLock={true} // if true, scroll lock behavior is disabled
        hideBackdrop={false} // if true, backdrop is not rendered
        keepMounted={true} // keep children in DOM, this is useful for SEO, better open performance on mobile
        onTransitionEnter={props.onTransitionEnter || ""}
        onTransitionExited={props.onTransitionExited || ""}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0,0,0,0.4)",
            },
          },
        }}
      >
        <ModalContentWrapper>
          <Box className="flex-center" sx={{ padding: "30px 0" }}>
            <AppLogo
              enableOnclick={false}
              imgSrc={logo64}
              fontSize="clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)"
              isHidden={!props.showAppLogo || false}
            />
          </Box>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.desc}
          </Typography>
          {props.children}
          <Container
            sx={{
              textAlign: "center",
              paddingTop: "32px",
              paddingBottom: "15px",
            }}
          >
            <CloseBtnLink
              component="button"
              variant="body2"
              underline="none"
              color="inherit"
              onClick={() => props.handleModalClose(false)}
              styleConst={styleConst}
            >
              Close
            </CloseBtnLink>
          </Container>
        </ModalContentWrapper>
      </CustomModal>
    </>
  );
};

export default BaseModal;
