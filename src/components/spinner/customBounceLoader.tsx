import { CSSProperties } from "react";
import { BounceLoader } from "react-spinners";

const defaultConfig = {
  color: "#fcfcfc",
  loading: true,
  cssOveride: {},
  speedMultiplier: 1,
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const CustomBounceLoader = ({ isRoot = true }: { isRoot?: boolean }) => {
  return (
    <div
      className={`${
        isRoot
          ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(110,110,110,1)] w-full h-full flex justify-center items-center z-100"
          : ""
      }`}
    >
      <BounceLoader
        color={defaultConfig.color}
        loading={defaultConfig.loading}
        cssOverride={defaultConfig.cssOveride}
        size={60}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default CustomBounceLoader;
