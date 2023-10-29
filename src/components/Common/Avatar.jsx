import Avatar from "@mui/material/Avatar";

import { logout } from "../../lib/firebase";

const CustomAvatar = (props) => {
  console.log(props);

  if (props.photoUrl == null) {
    return (
      <Avatar alt="profile picture" onClick={() => logout()}>
        {props.username[0].toUpperCase()}
      </Avatar>
    );
  }
  return (
    <Avatar
      sx={{}}
      alt="profile picture"
      src={props.photoUrl}
      onClick={() => logout()}
    />
  );
};

export default CustomAvatar;
