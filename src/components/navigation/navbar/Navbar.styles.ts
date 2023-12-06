import styled from '@emotion/styled';
import { MuiThemeInterface } from 'src/common.ts';

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  padding: 20px 30px;
  width: -webkit-fill-available;
  background-color: #26282f;
  color: #fcfcfc;
  box-shadow: 0 3px 30px rgba(11, 11, 11, 0.6);
  z-index: 1000;
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

const NavBurgerContainer = styled('div')<MuiThemeInterface>(({ theme }) => ({
  display: 'inline-flex',
  justifyContent: 'center',
  alignTtems: 'center',
  paddingRight: '1rem',
  cursor: 'pointer',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export { NavbarLogo, NavbarWrapper, NavBurgerContainer };
