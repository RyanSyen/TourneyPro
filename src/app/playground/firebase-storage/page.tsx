"use client";

import Image from "next/image";

import { Input } from "@/components/ui/input";

import useFirebaseStorageExample from "./useFirebaseStorage";

const ImageGalleryWithFirebaseStorage = () => {
  const { onFileChange, previewImg } = useFirebaseStorageExample();

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Image gallery with firebase storage
      </h2>
      <div className="grid w-full max-w-sm items-center gap-1.5 py-4">
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="border !border-slate-100 !rounded-lg"
        />
      </div>
      <div>
        <div className="py-4">Preview</div>
        {previewImg ? (
          <Image
            src={previewImg}
            width={128}
            height={128}
            alt="avatar preview image"
            className="rounded-[50%]"
          />
        ) : (
          <div className="flex justify-center items-center bg-slate-700 rounded-[50%] w-32 h-32 px-4 text-center font-light text-sm text-slate-400">
            Preview will be displayed here.
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGalleryWithFirebaseStorage;
