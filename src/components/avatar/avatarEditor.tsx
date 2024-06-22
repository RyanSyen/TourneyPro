"use client";

import { ChangeEvent } from "react";
import Avatar from "react-avatar-edit";

import { validateFileSize } from "@/helper/common";

import { toast } from "../ui/use-toast";

export interface AvatarEditorStateProp {
  preview: string | null;
  src: string | null;
}

interface Props {
  state: AvatarEditorStateProp;
  setState: (state: AvatarEditorStateProp) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
}

const AvatarEditor = ({ state, setState, setIsDialogOpen }: Props) => {
  const onClose = () => {
    setState({
      src: "",
      preview: null,
    });
    setIsDialogOpen(false);
  };

  const onCrop = (preview: string) => {
    setState({
      src: state.src,
      preview: preview,
    });
  };

  const onBeforeFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const res = await validateFileSize(e);

      if (!res?.isValid) {
        toast({
          variant: "warn",
          title: res?.message || "An error occurred.",
          description: "",
        });
      }
    } catch (error) {
      console.error("Error validating file: ", error);
      toast({
        variant: "warn",
        title: "An unexpected error occurred.",
        description: "",
      });
    }
  };

  return (
    <Avatar
      width={128}
      height={128}
      borderStyle={{ border: 0, borderRadius: "50%" }}
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
  );
};

export default AvatarEditor;
