import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";

import { useUserContext } from "../../context/userContext";
import useDropdown from "../../hooks/useDropdown";
import { logout } from "../../lib/firebase";
import CustomAvatar from "../Common/Avatar";
import Dropdown from "./Dropdown";

const userControlList = [
  {
    Icon: <PersonIcon />,
    Value: "profile",
    Text: "Profile",
    Route: "/security/profile",
  },
  {
    Icon: <LogoutIcon />,
    Value: "logout",
    Text: "Logout",
  },
];

const UserControlDropdown = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userData } = useUserContext();
  const [isExpand, toggle] = useDropdown();

  const [anchorEl, setAnchorEl] = useState(null);

  const listItems = userControlList.map((item) => {
    return (
      <MenuItem
        key={uuidv1()}
        value={item.Value}
        onClick={() => {
          item.Route ? navigate(item.Route) : logout();
        }}
      >
        <ListItemIcon>{item.Icon}</ListItemIcon>
        {item.Text}
      </MenuItem>
    );
  });

  console.log(isExpand);

  return (
    <Box>
      <Button
        id="user-btn"
        aria-controls={isExpand ? "user-dropdown" : null}
        aria-haspopup="true"
        aria-expanded={isExpand ? "true" : null}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          toggle();
        }}
        disableRipple={true}
        disableFocusRipple={true}
        disableTouchRipple={true}
      >
        <CustomAvatar
          photoUrl={userData.photoURL ?? null}
          username={userData.username ?? userData.email}
        />
      </Button>
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
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "user-btn",
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
