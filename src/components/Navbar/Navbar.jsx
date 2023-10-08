import { NavbarWrapper, NavbarLogo, NavBurgerContainer } from "./Navbar.styles";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import Logo32 from "../../assets/logo/logo_32.png";
import { Typography } from "@mui/material";
import { useStyle } from "../../context/styleContext";
import PublicIcon from "@mui/icons-material/Public";
import Dropdown from "../Dropdown/Dropdown";

const Navbar = () => {
  const styleConst = useStyle();

  return (
    <NavbarWrapper styleConst={styleConst}>
      <div>
        <NavBurgerContainer>
          <MenuSharpIcon />
        </NavBurgerContainer>
        <NavbarLogo>
          <img src={Logo32} alt="Tourney Pro" />
          <Typography>TourneyPro</Typography>
        </NavbarLogo>
      </div>
      <div>
        {/* <LanguagePicker> */}
        <PublicIcon />
        <Dropdown />
        {/* </LanguagePicker> */}
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
