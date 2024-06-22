"use client";

import { CheckIcon, Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

import { AvatarEditorStateProp } from "@/components/avatar/avatarEditor";
import AvatarEditorDialog from "@/components/avatar/avatarEditorDialog";
import CustomBounceLoader from "@/components/spinner/customBounceLoader";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input, PrimaryInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";
import { capitalizeFirstLetter, validateFileSize } from "@/helper/common";

import useProfile from "./useProfile";

const ProfileFields = () => {
  const authContextData = useAuthContext();
  const user = authContextData?.user;
  const [state, setState] = useState<AvatarEditorStateProp>({
    preview: null,
    src: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [userAvatar, setUserAvatar] = useState(user?.photoUrl || "");
  const profile = useProfile(user!);

  const onHandleSetState = (state: AvatarEditorStateProp) => {
    setState(state);
  };

  const onHandleCloseDialog = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error: ", error);
      toast({
        variant: "warn",
        title: "An unexpected error occurred.",
        description: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (!authContextData || !user) {
    return <CustomBounceLoader isRoot={false} />;
  }

  console.log("state.src: ", state.src);

  return (
    <div className="flex flex-col gap-10">
      {/* avatar */}
      <div className="flex-center">
        <div className="group relative w-32 h-32 rounded-[50%] my-6">
          <Avatar className="peer rounded-[50%] cursor-pointer w-[inherit] h-[inherit] group-hover:brightness-50 ">
            <Image
              // src={state.src?.toString() || user.photoUrl}
              src={userAvatar}
              alt="profile pic"
              fill
              objectFit="cover"
              priority
            />
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100">
            <div>Click to change</div>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onValidateFileSize}
              className={"opacity-0 cursor-pointer absolute inset-0 z-0 h-full"}
            />
          </div>
          <AvatarEditorDialog
            avatarEditorState={state}
            setAvatarEditorState={onHandleSetState}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={onHandleCloseDialog}
            user={user}
            setUserAvatar={setUserAvatar}
          />
          {/* <EditorDialog
            isOpen={isOpenDialog}
            handleClose={handleCloseDialog}
            editor={editor}
            width={state.width}
            height={state.height}
            borderRadius={state.borderRadius}
            scale={state.scale}
            preview={state.preview}
            handleSave={handleSave}
            image={state.image || userData!.user.photoUrl}
            handleUpdatePreview={handleUpdatePreview}
            updatePreview={updatePreview}
            isDuplicateImg={isDuplicateImg}
          /> */}
        </div>
      </div>
      <section className="flex-wrap items-center grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
        {profile.profileData.map((item, index) => {
          return (
            <div
              key={item.title}
              className="flex flex-col justify-start items-start h-full"
            >
              <Label className="flex items-center gap-2">
                {capitalizeFirstLetter(item.title)}
                {item.id === "email" ? (
                  <Image
                    src={
                      user?.isEmailVerified
                        ? "/profile/verified.png"
                        : "/profile/not_verified.png"
                    }
                    alt={`${item.title} image`}
                    width={16}
                    height={16}
                  />
                ) : null}
              </Label>
              <div className="relative flex w-full py-2">
                <PrimaryInput
                  type="text"
                  value={
                    item.id !== "email"
                      ? capitalizeFirstLetter(item.data)
                      : item.data
                  }
                  readOnly={!item.isEditing}
                  className={`${
                    item.isEditing
                      ? ""
                      : "focus:!border-[#444548] cursor-default"
                  }`}
                  onChange={(e) => profile.onHandleChange(e, index)}
                />
                {item.editable && !item.isEditing && (
                  <Button
                    className="absolute top-1 right-0 py-0 px-0 w-[30px] h-[30px]"
                    onClick={() => profile.toggleEditing(index)}
                  >
                    <Pencil2Icon />
                  </Button>
                )}
                {item.isEditing && (
                  <div>
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 absolute top-1 right-10 py-0 px-0 w-[30px] h-[30px]"
                            onClick={() => {
                              profile.onHandleConfirm(true, index);
                            }}
                          >
                            <CheckIcon />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="absolute bottom-8 right-10 !bg-[#444548] !text-[#fcfcfc]">
                          <p>Confirm</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 absolute top-1 right-0 py-0 px-0 w-[30px] h-[30px]"
                            onClick={() =>
                              profile.onHandleConfirm(false, index)
                            }
                          >
                            <Cross2Icon />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="absolute bottom-8 right-1 !bg-[#444548] !text-[#fcfcfc]">
                          <p>Revert</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {/* <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 absolute top-1 right-0 py-0 px-0 w-[30px] h-[30px]"
                            onClick={() =>
                              profile.onHandleConfirm(true, index)
                            }
                          >
                            <Cross2Icon />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="absolute bottom-8 right-1 !bg-[#444548] !text-[#fcfcfc]">
                          <p>Revert</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider> */}
                    {/* <Button
                      className="absolute top-1 right-0 py-0 px-0 w-[30px] h-[30px]"
                      onClick={() => profile.onHandleConfirm(false, index)}
                    >
                      <Cross2Icon />
                    </Button> */}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>
      {/* <div className="absolute w-[100vw] bg-[rgba(20, 20, 27, 0.5)]" />
      <div className="absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2">
        <CustomBounceLoader isRoot={false} />
      </div> */}
    </div>
  );
};

export default ProfileFields;
