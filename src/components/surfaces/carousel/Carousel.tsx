import { CarouselSlider, SliderContainer } from './Carousel.styled.tsx';
import useCarousel from './useCarousel.ts';

const BannerCarousel = () => {
  const carousel = useCarousel();
  const {
    autoplay,
    autoplaySpeed,
    fade,
    lazyLoad,
    dots,
    infinite,
    speed,
    slidesToScroll,
    slidesToShow,
    arrows,
  } = carousel.settings;

  return (
    <SliderContainer className="banner-carousel-container">
      <CarouselSlider
        autoplay={autoplay}
        autoplaySpeed={autoplaySpeed}
        fade={fade}
        lazyLoad={lazyLoad === 'ondemand' ? 'ondemand' : 'progressive'}
        dots={dots}
        infinite={infinite}
        speed={speed}
        slidesToScroll={slidesToScroll}
        slidesToShow={slidesToShow}
        arrows={arrows}
      >
        {carousel.images.map((image) => (
          <div key={image.id}>
            <img
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              src={image.url}
              alt={image.name}
              data-img-id={image.id}
              data-img-src={image.src}
              data-img-views={image.views}
              data-img-published={image.published}
            />
          </div>
        ))}
      </CarouselSlider>
    </SliderContainer>
  );
};

export default BannerCarousel;
