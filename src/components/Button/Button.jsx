import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import MuiButton from "@mui/material/Button";

/*
    variant - contained, outlined, text (ordered by emphasis)
*/

const CustomBtnOptions = {
  shouldForwardProp: (prop) => prop !== "themeName",
  label: "CustomButton",
};

const CustomButton = styled(
  MuiButton,
  CustomBtnOptions
)(({ theme, themeName }) => ({
  // borderRadius: theme.border.borderRadius.btnBorder,
  // not used
  // ...(themeName && {
  //   padding: theme.background[themeName],
  //   background: theme.background[themeName],
  //   "&:hover": {
  //     background: theme.background.hover[themeName],
  //   },
  // }),
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Btn = (props) => {
  const theme = useTheme();
  //   console.log("Theme", theme);

  return (
    <CustomButton
      variant={props.el.variant}
      disabled={props.el.disabled}
      onClick={props.onClick}
      //   color={props.customColor ? "signup" : "primary"}
      size={props.el.size}
      startIcon={props.el.startIcon || {}}
      endIcon={props.el.endIcon || {}}
      themeName={props.el.themeName || null}
      type={props.el.type || "button"}
    >
      {props.text}
      {props.el.isUploadBtn && <VisuallyHiddenInput type="file" />}
    </CustomButton>
  );
};

export default Btn;
