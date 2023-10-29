import { BounceLoader } from "react-spinners";

const CustomLoader = () => {
  return (
    <BounceLoader color="#D3D3D3" loading size={60} speedMultiplier={0.8} />
  );
};

export default CustomLoader;
