import Image from "next/image";

import { updateUser, UserRequest } from "@/app/service/user/userService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserData } from "@/types/UserData";

import AvatarEditor, { AvatarEditorStateProp } from "./avatarEditor";

/*
    integration with react-avatar-edit, 
    react-avatar-editor has issues with its editorRef, couldnt find context,
    couldnt find a fix yet, so will try with react-avatar-edit
*/

interface Props {
  avatarEditorState: AvatarEditorStateProp;
  setAvatarEditorState: (state: AvatarEditorStateProp) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  setUserAvatar: (avatar: string) => void;
  user: UserData;
}

const AvatarEditorDialog = ({
  avatarEditorState,
  setAvatarEditorState,
  isDialogOpen,
  setIsDialogOpen,
  setUserAvatar,
  user,
}: Props) => {
  const handleSave = async () => {
    if (!avatarEditorState.src || !user) return;

    try {
      const reqData: UserRequest = {
        ...user,
        photoUrl: avatarEditorState.src.toString(),
        roleId: user.roleId,
        dob: new Date(user.dob),
      };

      const res = await updateUser(reqData, user.id!);

      if (res.success) {
        setIsDialogOpen(false);
        setUserAvatar(avatarEditorState.src.toString());
      } else {
        console.error("Error saving new avatar");
      }
    } catch (error) {
      console.log("Error saving new avatar: ", error);
    }
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reposition Profile Picture</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex justify-start overflow-hidden">
            <AvatarEditor
              state={avatarEditorState}
              setState={setAvatarEditorState}
              setIsDialogOpen={setIsDialogOpen}
            />
          </div>

          <div className="pt-4">
            <div>Preview</div>
            <div className="py-3">
              <Image
                src={avatarEditorState.preview || ""}
                alt="avatar preview"
                width={128}
                height={128}
                objectFit="cover"
                priority
              />
            </div>
          </div>
          {/* <div>
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
          </div>*/}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="main"
            onClick={() => handleSave()}
            // disabled={isDuplicateImg}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarEditorDialog;
