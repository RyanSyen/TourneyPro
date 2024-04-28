"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import AvatarEditor from "react-avatar-editor";

import MyEditor from "@/components/avatar/avatar-editor";
import EditorDialog from "@/components/avatar/editorDialog";
import UploadAvatar from "@/components/avatar/uploadAvatar";
import useAvatarEditor from "@/components/avatar/useAvatarEditor";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const UI = () => {
  const {
    state,
    handleSave,
    handleScale,
    isConfirm,
    editor,
    validateFileSize,
    isOpenDialog,
    handleCloseDialog,
    handleUpdatePreview,
    updatePreview,
    refreshKey,
  } = useAvatarEditor();
  //   const [isOpen, setIsOpen] = useState(false);

  //   const handleCloseDialog = () => {
  //     setIsOpen(false);
  //   };

  return (
    <div className="pt-20">
      <div className="group relative w-32 h-32 rounded-[50%]">
        <Avatar className="peer rounded-[50%] cursor-pointer w-[inherit] h-[inherit] group-hover:brightness-50 ">
          <Image
            src="https://lh3.googleusercontent.com/a/ACg8ocLnLtKI655WD32ifjqd4auruydnF9ykggH8qq4sv_WpQVo=s96-c"
            alt="profile pic"
            width={128}
            height={128}
          />
        </Avatar>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100">
          <div>Click to change</div>
          <UploadAvatar
            refreshKey={refreshKey}
            className={"absolute inset-0 z-0 cursor-pointer h-full"}
            validateFileSize={(e: ChangeEvent<HTMLInputElement>) =>
              validateFileSize(e)
            }
            // validateFileSize={validateFileSize}
          />
        </div>
      </div>
      <EditorDialog
        isOpen={isOpenDialog}
        handleClose={handleCloseDialog}
        editor={editor}
        width={state.width}
        height={state.height}
        borderRadius={state.borderRadius}
        scale={state.scale}
        preview={state.preview}
        handleSave={handleSave}
        image={state.image}
        handleUpdatePreview={handleUpdatePreview}
        updatePreview={updatePreview}
      />
    </div>
  );
};

export default UI;
