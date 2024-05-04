"use client";

import { useCallback, useState } from "react";

import { Task } from "./data/schema";

const useTask = (data?: Task) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Task | undefined>(undefined);

  const triggerDialog = useCallback(
    (open: boolean) => {
      setIsOpen(open);
    },
    [isOpen]
  );

  if (data) {
    setFormData(data);
  }

  return { isOpen, triggerDialog, formData };
};

export default useTask;
