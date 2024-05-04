import CustomBounceLoader from "@/components/spinner/customBounceLoader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Task } from "./data/schema";
import TaskForm from "./taskForm";
import { useTaskContext } from "./taskProvider";
import useTask from "./useTask";

const TaskDialog = () => {
  //   const { isOpen, triggerDialog, formData } = useTask();
  const context = useTaskContext();

  if (context) {
    return (
      <Dialog open={context.isOpen}>
        <DialogTrigger asChild>
          <Button variant={"main"} onClick={() => context.triggerDialog(true)}>
            Add Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Add task
            </DialogTitle>
          </DialogHeader>
          <TaskForm
            triggerDialog={context.triggerDialog}
            formData={context.formData}
          />
        </DialogContent>
      </Dialog>
    );
  } else {
    return <CustomBounceLoader />;
  }
};

export default TaskDialog;
