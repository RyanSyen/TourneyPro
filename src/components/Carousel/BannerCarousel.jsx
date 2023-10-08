import { SliderContainer, CarouselSlider } from "./BannerCarousel.styles";
import { useStyle } from "../../context/styleContext";

const BannerCarousel = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    lazyLoad: "ondemand",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const styleConst = useStyle();

  const images = [
    {
      id: 0,
      name: "Commodore PET Mini",
      src: "Unsplash",
      url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      views: "44,192,149",
      published: "2019-02-21T10:41:25.000Z",
    },
    {
      id: 1,
      name: "Gaming room with arcade machines",
      src: "Unsplash",
      url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
      views: "29,338,824",
      published: "2017-11-24T08:39:56.000Z",
    },
    {
      id: 2,
      name: "Woman wearing black jacket",
      src: "Unsplash",
      url: "https://images.unsplash.com/photo-1531812960393-07fab8c1a28f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      views: "5,404,984",
      published: "2018-08-17T07:01:09.000Z",
    },
  ];

  return (
    <SliderContainer
      className="banner-carousel-container"
      styleConst={styleConst}
    >
      {/* <SliderT /> */}
      {/* <img
            style={{height: 100% width: 100%}}
              src={image.url}
              alt={image.name}
              data-img-id={image.id}
              data-img-src={image.src}
              data-img-views={image.views}
              data-img-published={image.published}
            /> */}
      <CarouselSlider styleConst={styleConst} {...settings}>
        {images.map((image) => (
          <div key={image.id}>
            <img
              style={{ height: "100%", width: "100%" }}
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
      {/* <img
        style={{ height: "100%", width: "100%" }}
        src="https://emerceprod.s3-ap-southeast-1.amazonaws.com/Banner/WebBanner20"
        alt="test"
      /> */}
      {/* {images.map((image) => (
        <div key={image.id}>
          <img
            style={{ height: "100%", width: "100%" }}
            src={image.url}
            alt={image.name}
            data-img-id={image.id}
            data-img-src={image.src}
            data-img-views={image.views}
            data-img-published={image.published}
          />
        </div>
      ))} */}
    </SliderContainer>
  );
};

export default BannerCarousel;
