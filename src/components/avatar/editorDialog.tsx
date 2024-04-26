import { ReloadIcon } from "@radix-ui/react-icons";
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
}) => {
  const [updatePreview, setUpdatePreview] = useState(false);

  const onUpdatePreview = () => {
    setUpdatePreview(true);
    setTimeout(() => {
      setUpdatePreview(false);
    }, 1500);
  };
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
                  onUpdatePreview();
                  handleSave();
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
            onClick={() => console.log("close")}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditorDialog;
