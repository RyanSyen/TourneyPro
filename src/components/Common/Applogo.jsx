import styled from "@emotion/styled";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const CustomLinkOptions = {
  // shouldForwardProp: (prop) => prop !== "isOnClick",
  shouldForwardProp: (prop) => !["isOnClick", "isHidden"].includes(prop),
  label: "CustomLink",
};

const NavbarLogo = styled(
  Link,
  CustomLinkOptions
)(({ theme, isOnClick, isHidden }) => {
  // console.log(isOnClick, isHidden);

  return {
    display: isHidden ? "none" : "flex",
    alignItems: "center",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    pointerEvents: isOnClick ? "auto" : "none",
    userSelect: "none",
    fontSize: theme.typography.button.fontSize,

    img: {
      paddingRight: "5px",
    },
  };
});

const AppLogo = (props) => {
  const navigate = useNavigate();

  // console.log(props.enableOnclick);

  const handleOnclick = () => {
    console.log("clicked on logo");
    navigate("/");
  };

  return (
    <NavbarLogo
      component="button"
      variant="body2"
      underline="none"
      color="inherit"
      onClick={handleOnclick}
      isOnClick={props.enableOnclick}
      isHidden={props.isHidden}
    >
      <img src={props.imgSrc} alt="Tourney Pro" width="48px" height="48px" />
      <Typography sx={{ fontSize: props.fontSize }}>TourneyPro</Typography>
    </NavbarLogo>
  );
};

export default AppLogo;
