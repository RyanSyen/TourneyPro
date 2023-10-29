// import reactLogo from "../assets/react.svg";
// import viteLogo from "/vite.svg";
import { Container } from "@mui/material";

import BannerCarousel from "../components/Carousel";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <BannerCarousel />
      <Container sx={{ height: "500px" }} />
      <Container sx={{ height: "500px" }} />
      <Container sx={{ height: "500px" }} />
      <Container sx={{ height: "500px" }} />
      <Container sx={{ height: "500px" }} />
      <Container sx={{ height: "500px" }} />
    </>
  );
};

export default Home;
