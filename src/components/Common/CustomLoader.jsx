import { Box } from "@mui/material";
import { BounceLoader } from "react-spinners";

const CustomLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute",
        inset: 0,
        zIndex: 100,
      }}
      className="flex-center"
    >
      <BounceLoader color="#D3D3D3" loading size={60} speedMultiplier={0.8} />
    </Box>
  );
};

export default CustomLoader;
