import Image from "next/image";
import React, { RefObject, useRef, useState } from "react";
import AvatarEditor, { type Position } from "react-avatar-editor";

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

const MyEditor = () => {
  const editor: RefObject<AvatarEditor> = useRef(null);
  const [state, setState] = useState<State>({
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocLnLtKI655WD32ifjqd4auruydnF9ykggH8qq4sv_WpQVo=s96-c",
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1.2,
    rotate: 0,
    borderRadius: 0,
    preview: undefined,
    width: 200,
    height: 200,
    disableCanvasRotation: false,
    isTransparent: false,
    backgroundColor: undefined,
    showGrid: false,
  });

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
  };

  return (
    <>
      <div>
        <AvatarEditor
          ref={editor}
          image="https://lh3.googleusercontent.com/a/ACg8ocLnLtKI655WD32ifjqd4auruydnF9ykggH8qq4sv_WpQVo=s96-c"
          width={250}
          height={250}
          border={50}
          borderRadius={500}
          scale={state.scale}
          crossOrigin="anonymous"
        />
        <button
          onClick={async () => {
            if (editor && editor.current) {
              handleSave();
              // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
              // drawn on another canvas, or added to the DOM.
              const canvas = editor.current.getImage();
              //   const dataUrl = editor.current.getImage().toDataURL();
              //   const res = await fetch(dataUrl);
              //   const blob = await res.blob();
              //   setResultImg(window.URL.createObjectURL(blob));

              // If you want the image resized to the canvas size (also a HTMLCanvasElement)
              const canvasScaled = editor.current.getImageScaledToCanvas();

              // extra: https://github.com/mosch/react-avatar-editor/tree/main#accessing-the-resulting-image
            }
          }}
        >
          Save
        </button>
      </div>
      <div>
        result image
        {state.preview && (
          <Image src={state.preview.img} width={128} height={128} alt="image" />
        )}
      </div>
    </>
  );
};

export default MyEditor;
