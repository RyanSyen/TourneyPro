"use client";

import { ref, UploadMetadata, uploadString } from "firebase/storage";
import { ChangeEvent, useState } from "react";

import { useUserContext } from "@/context/UserProvider";
import { storage } from "@/lib/firebase";

const useFirebaseStorageExample = () => {
  const [previewImg, setPreviewImg] = useState("");
  const user = useUserContext();

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      const file = e.target.files[0];
      const maxSize = process.env.NEXT_PUBLIC_IMG_UPLOAD_MAX_SIZE!;
      if (file.size > parseInt(maxSize)) {
        alert("File size exceeds 5MB. Please select a smaller file.");
        e.target.value = ""; // Clear the selected file
      }
      console.log(file);
      const reader = new FileReader();
      console.log("reader: ", reader);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        console.log(e.target?.result);

        if (e.target && e.target.result) {
          const imagesRef = ref(
            storage,
            `${process.env.NEXT_PUBLIC_IMG_FOLDER_NAME}/${user?.email}`
          );

          const metadata: UploadMetadata = {
            contentType: file.type,
            // cacheControl: '',
            // contentDisposition: '',
            // contentEncoding: '',
            // contentLanguage: '',
            customMetadata: {
              name: file.name,
              fileDate: file.lastModified.toString(),
              size: file.size.toString(),
            },
          };
          uploadString(
            imagesRef,
            e.target.result.toString(),
            "data_url",
            metadata
          ).then((snapshot) => {
            console.log("snapshot metadata: ", snapshot.metadata);
            console.log("snapshot ref: ", snapshot.ref);
            console.log("uploading image to cloud storage");
          });

          setPreviewImg(e.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.log("no file selected");
    }
  };

  return {
    previewImg,
    onFileChange,
  };
};

export default useFirebaseStorageExample;
