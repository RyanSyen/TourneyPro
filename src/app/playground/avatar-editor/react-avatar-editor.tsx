// "use client";

// import { ChangeEvent, useCallback, useRef, useState } from "react";
// import AvatarEditor from "react-avatar-editor";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// // import Image from "next/image";
// // import { ChangeEvent, useState } from "react";
// // import AvatarEditor from "react-avatar-editor";

// // import MyEditor from "@/components/avatar/avatar-editor";
// // import EditorDialog from "@/components/avatar/editorDialog";
// // import UploadAvatar from "@/components/avatar/uploadAvatar";
// // import useAvatarEditor from "@/components/avatar/useAvatarEditor";
// // import { Avatar } from "@/components/ui/avatar";
// // import { Input } from "@/components/ui/input";

// // const UI = () => {
// //   const {
// //     state,
// //     handleSave,
// //     handleScale,
// //     isConfirm,
// //     editor,
// //     validateFileSize,
// //     isOpenDialog,
// //     handleCloseDialog,
// //     handleUpdatePreview,
// //     updatePreview,
// //     refreshKey,
// //   } = useAvatarEditor();
// //   //   const [isOpen, setIsOpen] = useState(false);

// //   //   const handleCloseDialog = () => {
// //   //     setIsOpen(false);
// //   //   };

// //   return (
// //     <div className="pt-20">
// //       <div className="group relative w-32 h-32 rounded-[50%]">
// //         <Avatar className="peer rounded-[50%] cursor-pointer w-[inherit] h-[inherit] group-hover:brightness-50 ">
// //           <Image
// //             src="https://lh3.googleusercontent.com/a/ACg8ocLnLtKI655WD32ifjqd4auruydnF9ykggH8qq4sv_WpQVo=s96-c"
// //             alt="profile pic"
// //             width={128}
// //             height={128}
// //           />
// //         </Avatar>
// //         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100">
// //           <div>Click to change</div>
// //           <UploadAvatar
// //             refreshKey={refreshKey}
// //             className={"absolute inset-0 z-0 cursor-pointer h-full"}
// //             validateFileSize={(e: ChangeEvent<HTMLInputElement>) =>
// //               validateFileSize(e)
// //             }
// //             // validateFileSize={validateFileSize}
// //           />
// //         </div>
// //       </div>
// //       <EditorDialog
// //         isOpen={isOpenDialog}
// //         handleClose={handleCloseDialog}
// //         editor={editor}
// //         width={state.width}
// //         height={state.height}
// //         borderRadius={state.borderRadius}
// //         scale={state.scale}
// //         preview={state.preview}
// //         handleSave={handleSave}
// //         image={state.image}
// //         handleUpdatePreview={handleUpdatePreview}
// //         updatePreview={updatePreview}
// //       />
// //     </div>
// //   );
// // };

// // export default UI;

// interface ImageUploadProps {
//   onImageLoad: (image: string | File) => void;
// }

// const ImageUpload = ({ onImageLoad }: ImageUploadProps) => {
//   const handleNewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     console.log("handling new image ...");
//     if (event.target.files && event.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target?.result) {
//           console.log("image on load and setting image...");
//           onImageLoad(e.target.result.toString());
//         }
//       };
//       reader.readAsDataURL(event.target.files[0]);
//     }
//   };

//   return <input type="file" onChange={handleNewImage} />;
// };

// const AvatarEditorPlaygroundChatGPT = () => {
//   const editorRef = useRef<AvatarEditor>(null);
//   const [image, setImage] = useState<string | File | null>();
//   const [croppedImage, setCroppedImage] = useState<string | null>();

//   // const handleSave = useCallback(() => {
//   //   if (editorRef.current) {
//   //     try {
//   //       const canvas = editorRef.current.getImage().toDataURL();
//   //       setCroppedImage(canvas);
//   //     } catch (error) {
//   //       console.error("Error cropping image:", error);
//   //     }
//   //   }
//   // }, []);

//   return (
//     <div>
//       <ImageUpload onImageLoad={setImage} />
//       {image && (
//         <AvatarEditor
//           ref={editorRef || null}
//           image={image}
//           width={250}
//           height={250}
//           border={50}
//           scale={1.2}
//         />
//       )}
//       {/* <button onClick={handleSave}>Save</button> */}
//       {croppedImage && (
//         <div>
//           <h2>Cropped Image:</h2>
//           <img src={croppedImage} alt="Cropped" />
//         </div>
//       )}
//     </div>
//   );
// };

// const CropperModal = ({ src, isOpenDialog, setIsOpenDialog, setPreview }) => {
//   const cropRef = useRef<AvatarEditor>(null);

//   //handle save
//   const handleSave = async () => {
//     if (cropRef) {
//       const dataUrl = cropRef.current?.getImage().toDataURL();
//       const result = await fetch(dataUrl);
//       const blob = await result.blob();
//       setPreview(URL.createObjectURL(blob));
//       setModalOpen(false);
//     }
//   };

//   return (
//     <Dialog open={isOpenDialog}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Reposition Profile Picture</DialogTitle>
//         </DialogHeader>
//         <div>
//           {image && (
//             <CustomAvatarEditor
//               editor={editor}
//               image={image}
//               width={width}
//               height={height}
//               borderRadius={borderRadius}
//               scale={scale}
//             />
//           )}
//           <div className="pt-4">
//             <div className="flex items-center gap-2">
//               <div>Preview</div>
//               <Button
//                 className="!h-auto !bg-transparent p-0"
//                 onClick={() => {
//                   handleUpdatePreview();
//                 }}
//               >
//                 <ReloadIcon
//                   className={`${
//                     updatePreview ? "animate-spin-infinite" : ""
//                   } stroke-white !duration-1000`}
//                 />
//               </Button>
//             </div>
//             <div className="text-xs text-muted-foreground py-2 text-slate-400">
//               Click refresh to update the preview.
//             </div>
//             <div className="py-3">
//               <AvatarPreview preview={preview} />
//             </div>
//           </div>
//           <div>
//             {isDuplicateImg ? (
//               <p className={"text-sm font-medium text-[#e87c03]"}>
//                 <span className="flex items-center gap-3">
//                   <AlertTriangle width={24} height={24} />
//                   <span>
//                     Duplicate image detected, please close the dialog and select
//                     again
//                   </span>
//                 </span>
//               </p>
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//         <DialogFooter>
//           <DialogClose asChild>
//             <Button type="button" variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//           </DialogClose>
//           <Button
//             type="submit"
//             variant="main"
//             onClick={() => handleSave()}
//             disabled={isDuplicateImg}
//           >
//             Save changes
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const AvatarEditorPlayground = () => {
//   // image src
//   const [src, setSrc] = useState<string | null>(null);

//   // preview
//   const [preview, setPreview] = useState(null);

//   // modal state
//   const [isOpenDialog, setIsOpenDialog] = useState(false);

//   // ref to control input element
//   const inputRef = useRef<HTMLInputElement>(null);

//   // handle Click
//   const handleInputClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     inputRef.current?.click();
//   };

//   // handle Change
//   const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setSrc(URL.createObjectURL(e.target.files[0]));
//       setIsOpenDialog(true);
//     }
//   };

//   return (
//     <>
//       <header>
//         <h1>React Avatar Cropper</h1>
//         <hr />
//       </header>
//       <main className="container">
//         <CropperModal
//           isOpenDialog={isOpenDialog}
//           src={src}
//           setPreview={setPreview}
//           setIsOpenDialog={setIsOpenDialog}
//         />
//         <a href="/" onClick={handleInputClick}>
//           Click to select image
//         </a>
//         <small>Click to select image</small>
//         <input
//           type="file"
//           accept="image/*"
//           ref={inputRef}
//           onChange={handleImgChange}
//         />
//         <div className="img-container">
//           <img
//             src={
//               preview ||
//               " https://www.signivis.com/img/custom/avatars/member-avatar-01.png"
//             }
//             alt=""
//             width="200"
//             height="200"
//           />
//         </div>
//       </main>
//     </>
//   );
// };

// export default AvatarEditorPlayground;
