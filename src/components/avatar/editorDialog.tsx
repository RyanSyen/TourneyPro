import { ReloadIcon } from "@radix-ui/react-icons";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import { RefObject, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import MyEditor from "./avatar-editor";
import CustomAvatarEditor from "./avatarEditor";
import AvatarPreview from "./avatarPreview";
import useAvatarEditor from "./useAvatarEditor";

const EditorDialog = ({
  isOpen = false,
  handleClose,
  editor,
  width,
  height,
  borderRadius,
  scale,
  preview,
  handleSave,
  image,
  handleUpdatePreview,
  updatePreview,
  isDuplicateImg,
}: {
  isOpen?: boolean;
  handleClose: () => void;
  editor: RefObject<AvatarEditor>;
  width: number;
  height: number;
  borderRadius: number;
  scale: number;
  preview?: {
    img: string;
    rect: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    scale: number;
    width: number;
    height: number;
    borderRadius: number;
  };
  handleSave: () => void;
  image: string | File;
  handleUpdatePreview: () => void;
  updatePreview: boolean;
  isDuplicateImg: boolean;
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reposition Profile Picture</DialogTitle>
        </DialogHeader>
        <div>
          <CustomAvatarEditor
            editor={editor}
            image={image}
            width={width}
            height={height}
            borderRadius={borderRadius}
            scale={scale}
          />
          <div className="pt-4">
            <div className="flex items-center gap-2">
              <div>Preview</div>
              <Button
                className="!h-auto !bg-transparent p-0"
                onClick={() => {
                  handleUpdatePreview();
                }}
              >
                <ReloadIcon
                  className={`${
                    updatePreview ? "animate-spin-infinite" : ""
                  } stroke-white !duration-1000`}
                />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground py-2 text-slate-400">
              Click refresh to update the preview.
            </div>
            <div className="py-3">
              <AvatarPreview preview={preview} />
            </div>
          </div>
          <div>
            {isDuplicateImg ? (
              <p className={"text-sm font-medium text-[#e87c03]"}>
                <span className="flex items-center gap-3">
                  <AlertTriangle width={24} height={24} />
                  <span>
                    Duplicate image detected, please close the dialog and select
                    again
                  </span>
                </span>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="main"
            onClick={() => handleSave()}
            disabled={isDuplicateImg}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditorDialog;
