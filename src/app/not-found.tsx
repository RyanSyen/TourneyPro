"use client";

import Image from "next/image";
import Link from "next/link";

// import { getCache } from "@/helper/cacheable";

const NotFound = () => {
  // const cache = getCache();

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[75vh] md:flex-row">
      <div className="error-illustration">
        <Image
          src={"/error404-illustration.png"}
          alt="404 illustration"
          //   loading="lazy" // detected as Largest Contentful Paint (LCP), need to preload using priority
          width={300}
          height={300}
          priority={true}
        />
      </div>
      <div className="flex flex-col flex-wrap text-wrap ">
        <h4 className="scroll-m-20 text-3xl font-semibold tracking-tight text-[#fcfcfc] whitespace-nowrap pb-5">
          Opps! Something went wrong.
        </h4>
        <h6 className="flex flex-wrap pr-5 scroll-m-20 text-xl tracking-tight text-[#fcfcfc] whitespace-nowrap pb-5">
          {/* {cache["user"] === undefined || cache["user"] === null
            ? `You are not authorized to access this resource. \n Please sign in and try again.`
            : "Please try again later or refresh the page."} */}
          Please try again later or refresh the page.
        </h6>
        <Link
          className="inline-flex justify-center items-center w-fit relative m-0 rounded-3xl py-2 px-6 bg-[#E50B0D] hover:bg-[#C3090C]"
          href={"/"}
          replace={false}
          scroll={true}
          prefetch={true}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
