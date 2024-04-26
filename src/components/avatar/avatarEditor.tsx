import { RefObject, useRef } from "react";
import AvatarEditor from "react-avatar-editor";

interface Props {
  editor: RefObject<AvatarEditor>;
  image: string | File;
  width: number;
  height: number;
  borderRadius: number;
  scale: number;
}

const CustomAvatarEditor = (props: Props) => {
  return (
    <AvatarEditor
      ref={props.editor}
      image={props.image}
      width={props.width}
      height={props.height}
      border={50}
      borderRadius={props.borderRadius}
      scale={props.scale}
      crossOrigin="anonymous"
      className="rounded-lg"
    />
  );
};

export default CustomAvatarEditor;
