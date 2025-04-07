import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { InitialTask, InitialTaskSchema } from "@/form_schema/initialTask";
import dayjs from "dayjs";
import {
  issueStatus,
  issueTypes,
  priorities,
  suggestedLabels,
} from "@/lookups/kanban-board/kanbanBoardLookup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, CloseLineIcon, PaperClipIcon } from "@/icons/components";
import useTaskStore from "../../shared/data-store/useTaskStore";

interface props {
  setOpenDialog: (open: boolean) => void;
}

export default function CreateIssueForm({ setOpenDialog }: props) {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; base64: string }[]>([]);
  const { addTask } = useTaskStore();

  const form = useForm<InitialTask>({
    resolver: zodResolver(InitialTaskSchema),
    defaultValues: {
      summary: "",
      description: "",
      status: "todo",
      priority: "low",
      issueType: "task",
      labels: [],
      dueDate: dayjs().add(1, "day").toDate(),
      attachments: [],
    },
  });

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const newFiles = Array.from(e.target.files);
  //     setUploadedFiles((prev) => [...prev, ...newFiles]);
  //     form.setValue("attachments", [...uploadedFiles, ...newFiles]);
  //   }
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
  
      // Convert files to Base64
      const convertToBase64 = (file: File): Promise<{ name: string; base64: string }> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve({ name: file.name, base64: reader.result as string });
          reader.onerror = reject;
        });
      };
  
      Promise.all(newFiles.map((file) => convertToBase64(file))).then((base64Files) => {
        setUploadedFiles((prev) => [...prev, ...base64Files]);
        form.setValue("attachments", [...uploadedFiles, ...base64Files]);
      });
    }
  };
  
  

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    form.setValue("attachments", newFiles);
  };

  const addLabel = (label: string) => {
    if (!selectedLabels.includes(label)) {
      const newLabels = [...selectedLabels, label];
      setSelectedLabels(newLabels);
      form.setValue("labels", newLabels);
    }
  };

  const removeLabel = (label: string) => {
    const newLabels = selectedLabels.filter((l) => l !== label);
    setSelectedLabels(newLabels);
    form.setValue("labels", newLabels);
  };

  const onSubmit = async (data: InitialTask) => {
    console.log("data: ", data);
    addTask(data);
    setOpenDialog(false);
    window.location.reload();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <section
          className={`space-y-10 overflow-y-auto max-h-[400px] pr-4 rounded-2xl border border-gray-200 px-6 py-3 dark:border-gray-800 dark:bg-white/[0.03]`}
        >
          <div className="flex flex-col gap-8">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="issueType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select issue type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {issueTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center">
                              <span className="mr-2">{type.icon}</span>
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select issue type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {issueStatus.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center">
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Summary <span className="text-[#e50b0d] text-xl">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter summary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-[#e50b0d] text-xl">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the issue in detail"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <div className="flex items-center">
                            <span className="mr-2">{priority.icon}</span>
                            {priority.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon
                            width="16"
                            height="16"
                            className="ml-auto h-4 w-4 opacity-50"
                          />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Assignee</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            <div className="flex items-center">
                              <Avatar className="mr-2 h-6 w-6">
                                <AvatarImage
                                  src={
                                    users.find(
                                      (user) => user.value === field.value
                                    )?.avatar
                                  }
                                  alt={
                                    users.find(
                                      (user) => user.value === field.value
                                    )?.label || ""
                                  }
                                />
                                <AvatarFallback>
                                  {users
                                    .find((user) => user.value === field.value)
                                    ?.label.charAt(0) || "?"}
                                </AvatarFallback>
                              </Avatar>
                              {
                                users.find((user) => user.value === field.value)
                                  ?.label
                              }
                            </div>
                          ) : (
                            "Select assignee"
                          )}
                          <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search user..." />
                        <CommandList>
                          <CommandEmpty>No user found.</CommandEmpty>
                          <CommandGroup>
                            {users.map((user) => (
                              <CommandItem
                                key={user.value}
                                value={user.value}
                                onSelect={(value) => {
                                  form.setValue("assignee", value);
                                }}
                              >
                                <div className="flex items-center">
                                  <Avatar className="mr-2 h-6 w-6">
                                    <AvatarImage
                                      src={user.avatar}
                                      alt={user.label}
                                    />
                                    <AvatarFallback>
                                      {user.label.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {user.label}
                                </div>
                                <CheckLineIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    field.value === user.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Leave empty to assign to yourself later
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reporter"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Reporter</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            <div className="flex items-center">
                              <Avatar className="mr-2 h-6 w-6">
                                <AvatarImage
                                  src={
                                    users.find(
                                      (user) => user.value === field.value
                                    )?.avatar
                                  }
                                  alt={
                                    users.find(
                                      (user) => user.value === field.value
                                    )?.label || ""
                                  }
                                />
                                <AvatarFallback>
                                  {users
                                    .find((user) => user.value === field.value)
                                    ?.label.charAt(0) || "?"}
                                </AvatarFallback>
                              </Avatar>
                              {
                                users.find((user) => user.value === field.value)
                                  ?.label
                              }
                            </div>
                          ) : (
                            "Select reporter"
                          )}
                          <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search user..." />
                        <CommandList>
                          <CommandEmpty>No user found.</CommandEmpty>
                          <CommandGroup>
                            {users.map((user) => (
                              <CommandItem
                                key={user.value}
                                value={user.value}
                                onSelect={(value) => {
                                  form.setValue("reporter", value);
                                }}
                              >
                                <div className="flex items-center">
                                  <Avatar className="mr-2 h-6 w-6">
                                    <AvatarImage
                                      src={user.avatar}
                                      alt={user.label}
                                    />
                                    <AvatarFallback>
                                      {user.label.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {user.label}
                                </div>
                                <CheckLineIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    field.value === user.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

          <FormField
            control={form.control}
            name="labels"
            render={() => (
              <FormItem>
                <FormLabel>Labels</FormLabel>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {selectedLabels.map((label) => (
                      <Badge
                        key={label}
                        variant="light"
                        className="flex items-center gap-1"
                      >
                        {label}
                        <CloseLineIcon
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeLabel(label)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {suggestedLabels
                      .filter((label) => !selectedLabels.includes(label))
                      .map((label) => (
                        <Badge
                          key={label}
                          variant="info"
                          className="cursor-pointer"
                          onClick={() => addLabel(label)}
                        >
                          {label}
                        </Badge>
                      ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attachments"
            render={() => (
              <FormItem>
                <FormLabel>Attachments</FormLabel>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-md border p-2"
                      >
                        <PaperClipIcon className="h-4 w-4" />
                        <span className="text-sm">{file.name}</span>
                        <CloseLineIcon
                          className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                          onClick={() => removeFile(index)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      multiple
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                    >
                      <PaperClipIcon className="mr-2 h-4 w-4" />
                      Attach files
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="flex justify-end items-center gap-2 pt-4">
          <Button
            type="button"
            variant={"tailAdminSecondary"}
            className="w-24"
            onClick={() => setOpenDialog(false)}
          >
            Back
          </Button>
          <Button type="submit" variant={"tailAdminPrimary"} className="w-24">
            Save
          </Button>
        </section>
      </form>
    </Form>
  );
}
