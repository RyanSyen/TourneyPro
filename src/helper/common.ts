import { ChangeEvent } from "react";

export const capitalizeFirstLetter = (str: string) => {
  const words = str.split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
};

export const compressImg = async (
  img: string,
  quality = 0.8,
  maxWidth = 800,
  maxHeight = 800
) => {
  // Create a new promise for image loading
  const loadImage = async (src: string) => {
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const image = await createImageBitmap(blob);
      console.log("Image loaded successfully:", image);
      return image;
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  try {
    const image = await loadImage(img);

    if (image) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = image.width;
      let height = image.height;

      // Calculate new dimensions while maintaining the aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      // Resize the canvas
      canvas.width = width;
      canvas.height = height;

      // Draw the image onto the canvas
      ctx?.drawImage(image, 0, 0, width, height);

      // Get the compressed Base64 string
      const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
      return compressedBase64;
    }
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};

export const validateFileSize = async (e: ChangeEvent<HTMLInputElement>) => {
  console.debug("validating file ...");
  if (!e.target.files || e.target.files.length == 0)
    return { isValid: false, message: "No file selected ..." };

  const file = e.target.files[0];
  const maxSize = process.env.NEXT_PUBLIC_IMG_UPLOAD_MAX_SIZE!;
  // console.log("file size: ", file.size);

  if (file.size > parseInt(maxSize))
    return { isValid: false, message: "File exceeded 1MB" };

  return new Promise<{ isValid: boolean; message: string }>((resolve) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      resolve({
        isValid: true,
        message: event.target?.result?.toString() || "",
      });
    };
    reader.readAsDataURL(file);
  });
};
