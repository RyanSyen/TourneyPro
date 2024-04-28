import { ChangeEvent, RefObject, useRef, useState } from "react";
import AvatarEditor, { type Position } from "react-avatar-editor";

import { updateUser, UserRequest } from "@/app/service/user/userService";
import useAuth from "@/hooks/useAuth";
import { UserData } from "@/types/UserData";

// https://github.com/mosch/react-avatar-editor/blob/main/packages/demo/src/App.tsx

type State = {
  image: string | File;
  allowZoomOut: boolean;
  position: Position;
  scale: number;
  rotate: number;
  borderRadius: number;
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
  width: number;
  height: number;
  disableCanvasRotation: boolean;
  isTransparent: boolean;
  backgroundColor?: string;
  showGrid: boolean;
};

//editor: RefObject<AvatarEditor>
const useAvatarEditor = (
  user: UserData | null,
  refreshProvider: () => void
) => {
  const [state, setState] = useState<State>({
    image: "",
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1.2,
    rotate: 0,
    borderRadius: 500,
    preview: undefined,
    width: 250,
    height: 250,
    disableCanvasRotation: false,
    isTransparent: false,
    backgroundColor: undefined,
    showGrid: false,
  });
  const [isConfirm, setIsConfirm] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [updatePreview, setUpdatePreview] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isDuplicateImg, setIsDuplicateImg] = useState(false);
  const editor: RefObject<AvatarEditor> = useRef(null);

  const handleCloseDialog = () => {
    // console.log("user photo: ", user!.photoUrl.toString());
    // setState({ ...state, image: "" });
    setRefreshKey(Math.random());
    setState({
      ...state,
      image: "",
      preview: undefined,
    });
    setIsDuplicateImg(false);
    setIsOpenDialog(false);
  };

  const handleUpdatePreview = () => {
    setUpdatePreview(true);
    setTimeout(() => {
      setUpdatePreview(false);
    }, 1500);
    const img = editor.current?.getImageScaledToCanvas().toDataURL();
    const rect = editor.current?.getCroppingRect();

    if (!img || !rect) return;

    setState({
      ...state,
      preview: {
        img,
        rect,
        scale: state.scale,
        width: state.width,
        height: state.height,
        borderRadius: state.borderRadius,
      },
    });

    setIsConfirm(true);
  };

  const handleSave = async () => {
    console.log("latest img: ", state.image);

    try {
      if (user) {
        const reqData: UserRequest = {
          ...user,
          photoUrl: state.image.toString(),
          roleId: user.roleId,
          dob: new Date(user.dob),
        };

        const res = await updateUser(reqData, user.id!);
        console.log("result: ", res);
        const img = editor.current?.getImageScaledToCanvas().toDataURL();
        setState({ ...state, image: img!.toString() });
        refreshProvider();
        handleCloseDialog();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(e.target.value);
    setState({ ...state, scale });
  };

  const validateFileSize = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      const file = e.target.files[0];
      const maxSize = process.env.NEXT_PUBLIC_IMG_UPLOAD_MAX_SIZE!;
      if (file.size > parseInt(maxSize)) {
        alert("File size exceeds 5MB. Please select a smaller file.");
        e.target.value = ""; // Clear the selected file
      }
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // console.log("current image: ", state.image || user?.photoUrl);
        // console.log(e.target?.result);
        // console.log(
        //   "same image? : ",
        //   (state.image || user?.photoUrl) === e.target?.result
        // );

        if (e.target && e.target.result) {
          const currentImg = state.image || user?.photoUrl;
          const targetImg = e.target?.result?.toString();

          setIsDuplicateImg(currentImg === targetImg);
          setState({ ...state, image: targetImg });
          setIsOpenDialog(true);
        }
      };
      reader.readAsDataURL(file);
      //   console.log(reader);
      //   console.log(reader.result);
    } else {
      console.log("no file selected");
    }
  };

  return {
    editor,
    state,
    handleSave,
    handleScale,
    isConfirm,
    validateFileSize,
    handleCloseDialog,
    isOpenDialog,
    handleUpdatePreview,
    updatePreview,
    refreshKey,
    isDuplicateImg,
  };
};

export default useAvatarEditor;
