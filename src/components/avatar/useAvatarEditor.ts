import { ChangeEvent, RefObject, useRef, useState } from "react";
import AvatarEditor, { type Position } from "react-avatar-editor";

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
const useAvatarEditor = () => {
  const [state, setState] = useState<State>({
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocLnLtKI655WD32ifjqd4auruydnF9ykggH8qq4sv_WpQVo=s96-c",
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
  const editor: RefObject<AvatarEditor> = useRef(null);

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
    setState({
      ...state,
      preview: undefined,
    });
  };

  const handleSave = () => {
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
        console.log(e.target?.result);

        if (e.target && e.target.result) {
          console.log("open dialog");
          setState({ ...state, image: e.target.result.toString() });
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
  };
};

export default useAvatarEditor;
