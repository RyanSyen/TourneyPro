import media from "../../lib/mui/styledComponents";
import styled from "@emotion/styled";

const NavbarWrapper = styled.nav`
  display: flex;
  align-items: center;
  position: fixed;
  padding: 10px 30px;
  width: 100%;
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
  padding: 0;
  margin: 0;
`;

export { NavbarWrapper, NavbarLogo };
