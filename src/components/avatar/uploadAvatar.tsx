"use client";

import { ChangeEvent } from "react";

import { cn } from "@/lib/utils";

import { Input } from "../ui/input";

const UploadAvatar = ({
  className,
  validateFileSize,
  refreshKey,
}: {
  className?: string;
  validateFileSize?: (e: ChangeEvent<HTMLInputElement>) => void;
  refreshKey: number;
}) => {
  return (
    <Input
      key={refreshKey}
      type="file"
      accept="image/*"
      onChange={validateFileSize}
      className={cn("opacity-0 cursor-pointer", className)}
    />
  );
};

export default UploadAvatar;
