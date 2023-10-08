import { NavbarWrapper, NavbarLogo } from "./Navbar.styles";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import Logo32 from "../../assets/logo/logo_32.png";
import { Typography } from "@mui/material";
import { useStyle } from "../../context/styleContext";

const Navbar = () => {
  const styleConst = useStyle();

  return (
    <NavbarWrapper styleConst={styleConst}>
      <MenuSharpIcon />
      <NavbarLogo>
        <img src={Logo32} alt="Tourney Pro" />
        <Typography>TourneyPro</Typography>
      </NavbarLogo>

      {/* <ul className="navList-wrapper">
        <li>
          <a>Explore</a>
        </li>
        <li>
          <a>Explore</a>
        </li>
        <li>
          <a>Explore</a>
        </li>
      </ul> */}
    </NavbarWrapper>
  );
};

export default Navbar;
