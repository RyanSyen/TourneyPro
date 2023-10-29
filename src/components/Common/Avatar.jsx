import Avatar from "@mui/material/Avatar";

import { logout } from "../../lib/firebase";

const CustomAvatar = (props) => {
  console.log(props);

  return (
    <Avatar
      sx={{}}
      alt={props.username.toString()}
      src={props.photoUrl}
      onClick={() => logout()}
    />
  );
};

export default CustomAvatar;
