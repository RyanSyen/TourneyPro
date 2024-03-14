"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IAdminTabLookup } from "@/lookups/admin/ILookup";

import Tab from "../common/tab";
import useTabCarousel from "./useTabCarousel";

export function TabCarousel({ list }: { list: IAdminTabLookup[] }) {
  const { setApi, slideTo, current, count } = useTabCarousel();

  console.log("current: ", current);

  console.log("list: ", list);
  return (
    <div className="w-4/5">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true, // enables momentum scrolling
          containScroll: "trimSnaps", // trimSnaps||keepSnaps - clear leading and trailing spaces that causes excessive scrolling (default: trimSnaps)
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {list.map((tab, index) => {
            return (
              <CarouselItem key={index} className="px-2 py-2 basis-0 min-w-min">
                <Tab
                  key={index}
                  name={tab.name}
                  url={tab.url}
                  isCurrent={current === index}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
