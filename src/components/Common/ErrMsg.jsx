import WarningIcon from "@mui/icons-material/Warning";
import Typography from "@mui/material/Typography";

const ErrMsg = ({ children }) => {
  return (
    <Typography variant="err-msg">
      <WarningIcon sx={{ paddingRight: "5px" }} />
      {children}
    </Typography>
  );
};

export default ErrMsg;
