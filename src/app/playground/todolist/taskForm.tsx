import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  ErrorFormMessage,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PrimaryInput } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { labels, priorities, statuses } from "./data/data";
import { Task, taskSchema } from "./data/schema";
import { useTaskContext } from "./taskProvider";
import { addTodo } from "./todoService";

interface Props {
  triggerDialog: (open: boolean) => void;
  formData: Task | undefined;
}

export const todoSchema = z.object({
  title: z.string().min(1, {
    message: "Task title is required.",
  }),
  status: z.string().min(1, {
    message: "Task status is required.",
  }),
  label: z.string().min(1, {
    message: "Task label is required.",
  }),
  priority: z.string().min(1, {
    message: "Task priority is required.",
  }),
});

const TaskForm = ({ triggerDialog, formData }: Props) => {
  const context = useTaskContext();
  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    shouldFocusError: false,
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      // since formField is using controlled component, you need to provide default value for the field
      title: formData?.title || "",
      status: formData?.status || "",
      label: formData?.label || "",
      priority: formData?.priority || "",
    },
  });

  const onSubmit = async (data: z.output<typeof todoSchema>) => {
    try {
      //   console.log(data);
      // call add task service
      console.log("task id: ", context?.formData?.id);
      let res = await addTodo(data, context?.formData?.id);
      //   console.log(res);
      //   if (res) {
      //     triggerDialog(false);
      //   } else {
      //     console.error("An error occured.");
      //   }
      context?.resetFormData();
      triggerDialog(false);
    } catch (error) {
      console.error("Failed to add task: ", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className={`space-y-4 overflow-y-auto pr-4`}>
          <section className="flex flex-col items-start justify-start gap-3">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Title <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <FormControl>
                    <PrimaryInput placeholder="Add a new button" {...field} />
                  </FormControl>
                  <ErrorFormMessage />
                </FormItem>
              )}
            />
            {/* status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Status <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="flex h-9 w-full !border-0 !rounded-none !border-b !border-[#444548] bg-transparent !py-1 !px-0 text-sm text-[#fcfcfc] shadow-sm transition-colors!focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:!border-bottom !ring-0 data-[placeholder]:!text-slate-500">
                        <SelectValue placeholder="Select task status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-100">
                      {statuses.map((status) => (
                        <SelectItem key={status.label} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorFormMessage />
                </FormItem>
              )}
            />
            {/* label */}
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Label <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="flex h-9 w-full !border-0 !rounded-none !border-b !border-[#444548] bg-transparent !py-1 !px-0 text-sm !text-[#fcfcfc] shadow-sm transition-colors !focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:!border-bottom !ring-0 data-[placeholder]:!text-slate-500">
                        <SelectValue placeholder="Select task label" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-100">
                      {labels.map((label) => (
                        <SelectItem key={label.label} value={label.value}>
                          {label.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorFormMessage />
                </FormItem>
              )}
            />
            {/* priorities */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Priority <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="flex h-9 w-full !border-0 !rounded-none !border-b !border-[#444548] bg-transparent !py-1 !px-0 text-sm !text-[#fcfcfc] shadow-sm transition-colors !focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:!border-bottom !ring-0 data-[placeholder]:!text-slate-500">
                        <SelectValue placeholder="Select task priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-100">
                      {priorities.map((priority) => (
                        <SelectItem key={priority.label} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorFormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className="flex justify-end items-center gap-2 pt-8">
            <Button
              type="submit"
              variant={"secondary"}
              onClick={() => triggerDialog(false)}
              className="w-24"
            >
              Close
            </Button>
            <Button type="submit" variant={"main"} className="w-24">
              Save task
            </Button>
          </section>
        </main>
      </form>
    </Form>
  );
};

export default TaskForm;
