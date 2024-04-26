"use client";

import { ChangeEvent } from "react";

import { cn } from "@/lib/utils";

import { Input } from "../ui/input";

const UploadAvatar = ({
  className,
  validateFileSize,
}: {
  className?: string;
  validateFileSize?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Input
      type="file"
      accept="image/*"
      onChange={validateFileSize}
      className={cn("opacity-0 cursor-pointer", className)}
    />
  );
};

export default UploadAvatar;
