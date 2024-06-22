"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import Avatar from "react-avatar-edit";

import { Avatar as UIAvatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { validateFileSize } from "@/helper/common";

interface SrcProp {
  preview: string | null;
  src: string | null;
}

const ReactAvatarEditPlayground = () => {
  const [state, setState] = useState<SrcProp>({
    preview: null,
    // src: "https://tourneypro.vercel.app/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1550745165-9bc0b252726f%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D1170%26q%3D80&w=1080&q=75",
    src: "",
  });
  const [fImg, setFImg] = useState(
    "https://tourneypro.vercel.app/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1550745165-9bc0b252726f%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D1170%26q%3D80&w=1080&q=75"
  );
  const [isShowEditor, setIsShowEditor] = useState(false);

  const onClose = () => {
    setState((prev) => ({
      ...prev,
      preview: null,
    }));
  };

  const onCrop = (preview: string) => {
    setState((prev) => ({
      ...prev,
      preview: preview,
    }));
  };

  const onBeforeFileUpload = (elem: ChangeEvent<HTMLInputElement>) => {
    console.log("running onbeforefileupload");
    if (elem.target.files && elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  const onFileLoad = (elem: ChangeEvent<HTMLInputElement>) => {
    console.log("running onFileLoad");
    if (elem.target.files && elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  const onValidateFileSize = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const res = await validateFileSize(e);

      if (!res?.isValid) {
        toast({
          variant: "warn",
          title: res?.message || "An error occurred.",
          description: "",
        });
      } else {
        // const currentImg = state.image || user?.photoUrl;
        const targetImg = res.message;

        // setIsDuplicateImg(currentImg === targetImg);
        // setPreviewImg(res?.message);
        setState((prev) => ({
          ...prev,
          src: targetImg,
        }));
        setIsShowEditor(true);
      }
    } catch (error) {
      console.error("Error: ", error);
      toast({
        variant: "warn",
        title: "An unexpected error occurred.",
        description: "",
      });
    }
  };

  console.log("state preview: ", state.preview);

  return (
    <div>
      <div className="group relative w-32 h-32 rounded-[50%] my-6">
        <UIAvatar className="peer rounded-[50%] cursor-pointer w-[inherit] h-[inherit] group-hover:brightness-50 ">
          <Image
            src={fImg}
            alt="profile pic"
            // width={128}
            // height={128}
            fill
            objectFit="cover"
            priority
          />
        </UIAvatar>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100">
          <div>Click to change</div>
          <Input
            type="file"
            accept="image/*"
            onChange={onValidateFileSize}
            className={"opacity-0 cursor-pointer absolute inset-0 z-0 h-full"}
          />
        </div>
      </div>
      {isShowEditor && (
        <>
          <Avatar
            width={128}
            height={128}
            // imageWidth={80}
            // imageHeight={80}
            borderStyle={{ border: 0, borderRadius: "50%" }}
            label="Click to change"
            labelStyle={{ fontSize: "0.875rem", color: "#fcfcfc" }}
            onCrop={onCrop}
            onClose={onClose}
            onBeforeFileLoad={onBeforeFileUpload}
            src={state.src || undefined}
            backgroundColor="white"
            closeIconColor="red"
            shadingColor="grey"
            shadingOpacity={0.8}
            exportAsSquare={false}
            exportSize={128}
            exportMimeType="image/png"
            exportQuality={1}
          />
          <img src={state.preview || undefined} alt="Preview" />
        </>
      )}
    </div>
  );
};
export default ReactAvatarEditPlayground;
