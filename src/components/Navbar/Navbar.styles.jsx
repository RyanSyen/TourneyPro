import styled from "@emotion/styled";

import media from "../../lib/mui/styledComponents";

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  padding: 20px 30px;
  width: -webkit-fill-available;
  background-color: ${(props) => props.styleConst.body_background_color};
  color: #fcfcfc;
  box-shadow: 0 3px 30px ${(props) => props.styleConst.header_box_shadow};
  z-index: ${(props) => props.styleConst.header_zIndex};

  @media ${media.xs} {
  }

  @media ${media.md} {
  }

  @media ${media.lg} {
  }
`;

const NavbarLogo = styled.a`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  cursor: pointer;

  img {
    padding-right: 5px;
  }
`;

const NavBurgerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1rem;

  @media ${media.sm} {
    display: none;
  }
`;

// const LanguagePicker = styled.div`

// `

export { NavbarLogo, NavbarWrapper, NavBurgerContainer };
