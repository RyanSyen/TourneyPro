import { z } from "zod";

export const InitialTaskSchema = z.object({
  id: z.string().uuid().optional(),
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(255, "Summary is too long"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["todo", "in-progress", "done"], {
    errorMap: () => ({
      message: "Invalid status. Choose from 'To Do', 'In-Progress', or 'Done'.",
    }),
  }),
  priority: z.enum(["high", "medium", "low"], {
    errorMap: () => ({
      message: "Invalid status. Choose from 'High', 'Medium', or 'Low'.",
    }),
  }),
  issueType: z.enum(["task", "development", "bug", "enhancement"], {
    errorMap: () => ({
      message: "Invalid status. Choose from 'Task', 'Development', 'Bug', or 'Enhancement'.",
    }),
  }),
  labels: z.array(z.string()).optional(),
  dueDate: z.date({
    required_error: "Due date is required",
    invalid_type_error: "Due date must be a Date object",
  }),
  attachments: z
    .array(
      z.instanceof(File, {
        message: "Each attachment must be a valid File object",
      })
    )
    .optional(),
});

export type InitialTask = z.infer<typeof InitialTaskSchema>;
