import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import { MuiThemeInterface } from 'src/common.ts';

const SliderContainer = styled(Box)<MuiThemeInterface>(({ theme }) => {
  return {
    position: 'relative',
    width: '100%',
    paddingBottom: '98%',

    [theme.breakpoints.up('md')]: {
      paddingBottom: '40%',
    },
  };
});

const CarouselSlider = styled(Slider)`
  position: absolute;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;

  .slick-list,
  .slick-track,
  .slick-slide,
  .slick-slide * {
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
    border-radius: 50%;
    opacity: 0.5;
  }

  .slick-active button {
    opacity: 1;
    color: #000;
  }
`;

export { CarouselSlider, SliderContainer };
