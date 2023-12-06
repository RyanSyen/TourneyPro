import Container from '@mui/material/Container';
import BannerCarousel from 'components/surfaces/carousel/Carousel.tsx';

const App = () => {
  return (
    <>
      <BannerCarousel />
      <Container sx={{ height: '500px' }} />
      <Container sx={{ height: '500px' }} />
      <Container sx={{ height: '500px' }} />
      <Container sx={{ height: '500px' }} />
      <Container sx={{ height: '500px' }} />
      <Container sx={{ height: '500px' }} />
    </>
  );
};

export default App;
