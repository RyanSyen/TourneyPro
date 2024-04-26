import Image from "next/image";

const AvatarPreview = ({
  preview,
}: {
  preview:
    | {
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
      }
    | undefined;
}) => {
  if (preview && preview.img) {
    return (
      <Image
        src={preview.img}
        width={128}
        height={128}
        alt="avatar preview image"
        className="rounded-[50%]"
      />
    );
  } else {
    return (
      <div className="flex justify-center items-center bg-slate-700 rounded-[50%] w-32 h-32 px-4 text-center font-light text-sm text-slate-400">
        Preview will be displayed here.
      </div>
    );
  }
};

export default AvatarPreview;
