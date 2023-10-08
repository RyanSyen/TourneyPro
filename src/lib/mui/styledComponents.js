// import { css } from "styled-components";

const breakpoints = {
  xs: "400px", // for small screen mobile
  sm: "600px", // for mobile screen
  md: "900px", // for tablets
  lg: "1280px", // for laptops
  xl: "1440px", // for desktop / monitors
  xxl: "1920px", // for big screens
};

const media = {
  // min width follows mobile first design, max width follows desktop first
  // https://stackoverflow.com/questions/16647380/max-width-vs-min-width
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-in-width: ${breakpoints.xxl})`,
};

export default media;
