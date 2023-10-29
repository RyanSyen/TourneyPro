import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Logo32 from "../../assets/logo/logo_32.png";
import { useStyle } from "../../context/styleContext";
import { useUserContext } from "../../context/userContext";
import { LoginBtn } from "../Button";
import AppLogo from "../Common/Applogo";
import CustomAvatar from "../Common/Avatar";
import { LanguageDropdown } from "../Dropdown";
import { LoginModalContextProvider } from "./../../context/loginContext";
import { NavbarWrapper, NavBurgerContainer } from "./Navbar.styles";

const Navbar = () => {
  const styleConst = useStyle();
  const [isScrolled, setIsScrolled] = useState(false);

  const { user } = useUserContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      console.log("unsubsribed");

      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavbarWrapper
      className={isScrolled ? "" : "transparent-nav"}
      styleConst={styleConst}
    >
      <div className="flex-center">
        <NavBurgerContainer>
          <MenuSharpIcon />
        </NavBurgerContainer>
        <AppLogo enableOnclick={true} imgSrc={Logo32} fontSize="inherit" />
      </div>
      <div className="flex-center">
        <LanguageDropdown />
        {user.loggedIn ? (
          <CustomAvatar
            photoUrl={user.data.photoUrl}
            username={user.data.username ?? user.data.email}
          />
        ) : (
          <LoginModalContextProvider>
            <LoginBtn />
          </LoginModalContextProvider>
        )}
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
