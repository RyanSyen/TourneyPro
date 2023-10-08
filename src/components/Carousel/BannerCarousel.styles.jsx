import styled from "@emotion/styled";
import Slider from "react-slick";

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 50%;

  .banner-carousel-container {
    padding: 5px;
  }
`;

const CarouselSlider = styled(Slider)`
  position: absolute;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;

  .slick-list {
    height: 100%;
  }

  .slick-dots {
    bottom: 5%;
    position: absolute;
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
  }

  .slick-dots button {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 15px;
    height: 15px;
    padding: 5px;
    cursor: pointer;
    color: transparent;
    border: 3px solid #fff;
    outline: none;
    background: #000;
    border-radius: ${(props) => props.styleConst.primary_border_radius};
    opacity: 0.5;
  }

  .slick-active button {
    opacity: 1;
    color: #000;
  }
`;

export { SliderContainer, CarouselSlider };
