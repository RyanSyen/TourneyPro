import styled from '@emotion/styled';
import Button, { ButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from 'assets/logo/logo.svg';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MuiThemeInterface } from 'src/common';

// #region interface
interface LogoBtnProp extends Omit<ButtonProps, 'classes'>, MuiThemeInterface {
  enableOnclick?: boolean;
  isHidden?: boolean;
}

interface AppLogoProp extends LogoBtnProp {
  textSize: string;
}
// #endregion

// #region styles
const propForwardingConfig = {
  shouldForwardProp: (prop: string) =>
    !['enableOnclick', 'isHidden'].includes(prop),
  label: 'StyledAppLogo',
};

const StyledLogo = styled(
  Button,
  propForwardingConfig
)<LogoBtnProp>(({ theme, enableOnclick, isHidden }) => {
  // console.log(theme.typography.button);
  // console.log(enableOnclick);
  // console.log(isHidden);
  return {
    display: isHidden ? 'none' : 'flex',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
    pointerEvents: enableOnclick ? 'auto' : 'none',
    userSelect: 'none',
    fontSize: theme.typography.button.fontSize,

    img: {
      paddingRight: '5px',
    },
  };
});

const LogoImg = styled('img')<MuiThemeInterface>(({ theme }) => {
  return {
    width: '36px',
    height: '36px',

    [theme.breakpoints.up('sm')]: {
      width: '42px',
      height: '42px',
    },
  };
});
// #endregion

const AppLogo = (props: AppLogoProp) => {
  const { textSize, enableOnclick, isHidden } = props;
  const navigate = useNavigate();

  const MemoizedComponent = useCallback(() => {
    // console.log('inside useCallback');
    return (
      <StyledLogo
        component="button"
        color="inherit"
        onClick={() => navigate(0)}
        enableOnclick={enableOnclick}
        isHidden={isHidden}
      >
        <LogoImg src={logo} alt="App Icon" />
        <Typography sx={{ fontSize: textSize }}>TourneyPro</Typography>
      </StyledLogo>
    );
  }, []);

  return <MemoizedComponent />;
};

AppLogo.defaultProps = {
  enableOnclick: true,
  isHidden: false,
} as Partial<AppLogoProp>;

export default AppLogo;
