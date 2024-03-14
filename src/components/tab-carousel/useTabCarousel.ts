import { useEffect, useState } from "react";

import { type CarouselApi } from "@/components/ui/carousel";

const useTabCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const slideTo = (slideId: number) => {
    api?.scrollTo(slideId);
  };

  return {
    setApi,
    slideTo,
    current,
    count,
  };
};

export default useTabCarousel;
