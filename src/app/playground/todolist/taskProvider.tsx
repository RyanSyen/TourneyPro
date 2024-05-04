import { createContext, useCallback, useContext, useState } from "react";

import { Task } from "./data/schema";

interface ContextProps {
  isOpen: boolean;
  formData?: Task;
  triggerDialog: (open: boolean) => void;
  triggerUpdateTask: (data: Task) => void;
  resetFormData: () => void;
}

const TaskContext = createContext<ContextProps | null>({
  isOpen: false,
  triggerDialog: () => {},
  triggerUpdateTask: () => {},
  resetFormData: () => {},
});
export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Task>();

  const triggerDialog = useCallback(
    (open: boolean) => {
      setIsOpen(open);
    },
    [isOpen]
  );

  const resetFormData = () => {
    setFormData(undefined);
  };

  const triggerUpdateTask = (data: Task) => {
    setFormData(data);
    setIsOpen(true);
  };

  return (
    <TaskContext.Provider
      value={{
        isOpen,
        formData,
        triggerDialog,
        triggerUpdateTask,
        resetFormData,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
