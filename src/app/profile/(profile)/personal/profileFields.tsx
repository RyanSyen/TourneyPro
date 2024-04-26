"use client";

import { CheckIcon, Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ChangeEvent } from "react";

import UploadAvatar from "@/components/avatar/uploadAvatar";
import useAvatarEditor from "@/components/avatar/useAvatarEditor";
import CustomBounceLoader from "@/components/spinner/customBounceLoader";
import CustomClipLoader from "@/components/spinner/customClipLoader";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PrimaryInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserContext } from "@/context/UserProvider";
import { capitalizeFirstLetter } from "@/helper/common";

import useProfile from "./useProfile";

const ProfileFields = () => {
  const {
    state,
    handleSave,
    handleScale,
    isConfirm,
    editor,
    validateFileSize,
    isOpenDialog,
    handleCloseDialog,
  } = useAvatarEditor();
  const user = useUserContext();
  const profile = useProfile(user);
  // console.log("profile data: ", profile.profileData);
  //! will be rerender each time user type when edit, component not heavy still ok to rerender

  if (user) {
    return (
      <div className="flex flex-col gap-4">
        {/* avatar */}
        <div className="flex-center">
          <div className="group relative w-32 h-32 rounded-[50%] my-6">
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
                className={"absolute inset-0 z-0 cursor-pointer h-full"}
                validateFileSize={(e: ChangeEvent<HTMLInputElement>) =>
                  validateFileSize(e)
                }
              />
            </div>
          </div>
        </div>
        <section className="flex-wrap items-center grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
          {profile.profileData.map((item, index) => {
            return (
              <div
                key={item.title}
                className="flex flex-col justify-start items-start h-full"
              >
                <Label>{item.title}</Label>
                <div className="relative flex w-full py-2">
                  <PrimaryInput
                    type="text"
                    value={item.data}
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
                            {/* <Button
                              className="absolute top-1 right-10 py-0 px-0 w-[30px] h-[30px]"
                              onClick={() =>
                                profile.onHandleConfirm(true, index)
                              }
                            >
                              <CheckIcon />
                            </Button> */}
                            <div
                              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 absolute top-1 right-10 py-0 px-0 w-[30px] h-[30px]"
                              onClick={() =>
                                profile.onHandleConfirm(true, index)
                              }
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
      </div>
    );
  } else {
    return <CustomBounceLoader isRoot={false} />;
  }
};

export default ProfileFields;
