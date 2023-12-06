import MenuIconSharp from '@mui/icons-material/MenuSharp';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Developer from 'assets/developer.svg';
import AppLogo from 'components/common/appLogo.tsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CustomAvatar from 'src/components/common/avatar.tsx';
import Btn from 'src/components/inputs/button/Button.tsx';
import LanguageDropdown from 'src/components/inputs/dropdown/language/LanguageDropdown.tsx';
import useLogin from 'src/features/auth/hooks/useLogin.ts';

import { NavbarWrapper, NavBurgerContainer } from './Navbar.styles.ts';
import useNavbar from './useNavbar.ts';

const MobileNavList = React.memo(() => {
  const { t: localizer } = useTranslation('global');

  // console.log('mobile nav list');

  return (
    <Box width="100%" role="presentation">
      <List>
        <ListItem>
          <ListItemButton>test</ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton divider>
            <ListItemText
              primary={localizer('Label_PrivacyPolicy')}
              disableTypography={false}
              primaryTypographyProps={{ fontSize: '1.15rem' }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton divider>
            <ListItemText
              primary={localizer('Label_Terms&Conditions')}
              disableTypography={false}
              primaryTypographyProps={{ fontSize: '1.15rem' }}
            />
          </ListItemButton>
        </ListItem>
        <Box sx={{ padding: '1rem 2.15rem' }}>
          <Typography sx={{ fontSize: '1.15rem', paddingTop: '' }}>
            {localizer('Label_DevelopedBy')}
          </Typography>
          <Box
            sx={{
              paddingTop: '1rem',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            className="flex-left"
          >
            <CustomAvatar photoUrl={Developer} />
            <Box
              sx={{
                paddingLeft: '.75rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  textAlign: 'left',
                }}
              >
                Ryan Wong
              </Typography>
              <Typography
                sx={{
                  textAlign: 'left',
                  color: '#8C94A1',
                  fontSize: '.85rem',
                }}
              >
                {localizer('Label_FullStackDeveloper')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </List>
    </Box>
  );
});

const Navbar = () => {
  const navbar = useNavbar();
  const navigate = useNavigate();
  const { t: localizer, i18n } = useTranslation('global');
  const { open } = useLogin();

  return (
    <NavbarWrapper className={navbar.isScrolled ? '' : 'transparent-nav'}>
      <div className="flex-center">
        <NavBurgerContainer onClick={navbar.open}>
          <MenuIconSharp />
        </NavBurgerContainer>
        <Drawer
          variant="temporary"
          anchor="top"
          open={navbar.isOpen}
          onClose={navbar.close}
        >
          <MobileNavList />
        </Drawer>
        {/* <MemoizedAppLogo /> */}
        <AppLogo textSize="1.25rem" />
      </div>
      <div className="flex-center">
        <LanguageDropdown />
        <Btn
          variant="login"
          disabled={false}
          size="medium"
          isUploadBtn={false}
          text={localizer('Label_SignIn')}
          onClick={open}
        />
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
