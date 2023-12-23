import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CustomAvatar from 'src/components/common/Avatar.tsx';
import Btn from 'src/components/inputs/button/Button.tsx';
import { useUserContext } from 'src/context/userContext.tsx';
// import { userAtom } from 'src/context/userContext.tsx';
import { v1 as uuidv1 } from 'uuid';

import useUserCtrlDropdown from '../hooks/useUserCtrlDropdown.ts';

const list = [
  {
    Icon: <PersonIcon />,
    Value: 'profile',
    Text: 'Profile',
    Route: '/security/profile',
  },
  {
    Icon: <LogoutIcon />,
    Value: 'logout',
    Text: 'Logout',
  },
];

const UserControlDropdown = () => {
  const { anchorEl, onClickRoute, toggle, setAnchor, isExpand } =
    useUserCtrlDropdown();
  const userData = useUserContext();

  const listItems = list.map((item) => {
    return (
      <MenuItem key={uuidv1()} value={item.Value} onClick={() => onClickRoute}>
        <ListItemIcon>{item.Icon}</ListItemIcon>
        {item.Text}
      </MenuItem>
    );
  });

  return (
    <Box>
      <Btn
        id="user-btn"
        disableRipple
        disableFocusRipple
        disableTouchRipple
        ariaControls={isExpand ? 'user-dropdown' : undefined}
        ariaHasPopup="true"
        ariaExpanded={isExpand ? 'true' : undefined}
        disabled={false}
        size="medium"
        isUploadBtn={false}
        type="button"
        onClick={(e) => {
          setAnchor(e);
          toggle();
        }}
      >
        <CustomAvatar
          photoUrl={userData?.photoURL ?? undefined}
          username={userData?.username ?? userData?.email}
        />
      </Btn>
      <Menu
        id="user-dropdown"
        anchorEl={anchorEl}
        keepMounted
        disableAutoFocusItem
        disableScrollLock
        open={isExpand}
        onClose={() => {
          toggle();
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'user-btn',
          style: {
            // padding: 0,
          },
        }}
        slotProps={{
          paper: {
            style: {
              // left: "50%",
              // transform: "translateX(-77%) translateY(32%)",
            },
          },
        }}
      >
        {listItems}
      </Menu>
    </Box>
  );
};

export default UserControlDropdown;
