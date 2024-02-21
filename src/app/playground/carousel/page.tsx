"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useState } from "react";

import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const PlaygroundCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
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
    {
      id: 3,
      name: "Petronas Malaysia Open 2024",
      src: "Ticket2u",
      url: "https://images.t2u.io/upload/event/listing/0-33423-AWSS35bbd68b8-2e92-4569-b796-3925fc359681-PyOT.jpg",
      views: "5,404,984",
      published: "2018-08-17T07:01:09.000Z",
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        className="flex flex-col w-full"
        plugins={[
          Autoplay({ delay: 5500, stopOnInteraction: false, jump: false }),
        ]}
      >
        <CarouselContent>
          {images.map((img) => (
            <CarouselItem key={img.id}>
              <div className="w-full h-96 md:pb-[35%] relative">
                <Image
                  className="w-full h-full object-cover"
                  src={img.url}
                  alt={img.name}
                  data-img-src={img.src}
                  data-img-views={img.views}
                  data-img-published={img.published}
                  fill
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 absolute pt-3 bottom-3 left-1/2">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => api?.scrollTo(img.id)}
              className={`w-2 h-2 p-1.5 cursor-pointer rounded-[50%]  ${
                current === img.id ? "bg-red-600" : "bg-gray-500"
              }`}
            ></div>
          ))}
        </div>
      </Carousel>
      <div className="h-96">test</div>
      <div className="h-96">test</div>
      <div className="h-96">test</div>
      <div className="h-96">test</div>
      <div className="h-96">test</div>
    </>
  );
};

export default PlaygroundCarousel;
