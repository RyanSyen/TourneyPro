"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { addDays } from "date-fns";
import { format } from "date-fns/format";
import dayjs from "dayjs";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CustomDatePicker from "@/components/common/customDatePicker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ErrorFormMessage,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input, PrimaryInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  Popover,
  PopoverTrigger,
  PrimaryPopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserContext } from "@/context/UserProvider";
import {
  AgeGroupLookup,
  IAgeGroupLookup,
} from "@/lookups/tournament/ageGroupLookup";
import { TournamentCategoryLookup } from "@/lookups/tournament/categoryLookup";
import { EventTypeLookup } from "@/lookups/tournament/eliminationLookup";
import { LevelLookup } from "@/lookups/tournament/levelLookup";
import { TournamentTypeLookup } from "@/lookups/tournament/tournamentTypeLookup";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Tournament name is required.",
  }),
  description: z.string().optional(),
  thumbnail: z.string().min(1, {
    message: "Tournament thumbnail is required",
  }),
  isPublic: z.boolean({
    required_error: "Tournament visibility is required.",
  }),
  type: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one tournament type.",
  }),
  shuttlecock: z.string().min(1, {
    message: "Tournament shuttlecock is required.",
  }),
  date: z.string({
    required_error: "Tournament date is required.",
  }),
  pointsSystem: z.string().min(1, {
    message: "Tournament points system is required.",
  }),
  location: z.string().min(1, {
    message: "Tournament points system is required.",
  }),
  event: z
    .object({
      id: z.string(),
      name: z.string(),
      type: z.string().optional(),
      openedCategory: z.boolean(),
    })
    .array(),
  registrationDate: z.string({
    required_error: "Tournament date is required.",
  }),
  registrationDateline: z.string({
    required_error: "Tournament date is required.",
  }),
  withdrawalDateline: z.string().optional(),
});

const eventFormSchema = z.object({
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  type: z.string().min(1, {
    message: "Event type is required.",
  }),
  level: z.string().min(1, {
    message: "Category level is required",
  }),
  prize: z.string().optional(),
  registrationFee: z.number().optional(),
});

interface Event {
  category: string;
  ageGroup: string;
  type: string;
  level: string;
  prize: string;
  registrationFee: number;
}

const multiSelectAgeGrouplookup: Option[] = AgeGroupLookup.map((group) => ({
  label: group.age,
  value: group.age,
}));

const ageSearch = async (value: string): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = multiSelectAgeGrouplookup.filter((group) =>
        group.value.includes(value)
      );
      resolve(res);
    }, 500);
  });
};

const CreateTournamentForm = () => {
  const userData = useUserContext();
  const [date, setDate] = useState<DateRange | undefined>({
    from: dayjs().subtract(7, "days").toDate(),
    to: dayjs().toDate(),
  });
  const [isPublicChecked, setIsPublicChecked] = useState(true);
  const [previewImg, setPreviewImg] = useState("");
  const [eventList, setEventList] = useState<Event[]>([]);
  const [eventDraft, setEventDraft] = useState<Event>({
    category: "",
    ageGroup: "",
    type: "",
    level: "",
    prize: "",
    registrationFee: 0,
  });
  const [ageGroupDraft, setAgeGroupDraft] = useState<number[]>([]);
  const [isAddEvent, setIsAddEvent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
    defaultValues: {
      // since formField is using controlled component, you need to provide default value for the field
      title: "",
      description: "",
      thumbnail: "",
      isPublic: true,
      type: [],
      shuttlecock: "",
      // date: "",
      pointsSystem: "",
      location: "",
      event: [],
    },
  });

  const eventForm = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    shouldFocusError: false,
    defaultValues: {
      // since formField is using controlled component, you need to provide default value for the field
      category: "",
      type: "",
      level: "",
      prize: "",
      registrationFee: 0,
    },
  });

  // const debounce = (func: () => void, delay: number) => {
  //   let debounceTimer: number;
  //   return function () {
  //     const context = this;
  //     const args = arguments;
  //     clearTimeout(debounceTimer);
  //     debounceTimer = setTimeout(() => func.apply(context, args), delay);
  //   };
  // };
  const debounce = <T extends Function>(func: T, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const onHandlePrizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setEventDraft((prev) => ({ ...prev, prize: e.target.value }));
  };

  const onHandleRegistrationFeeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setEventDraft((prev) => ({
      ...prev,
      registrationFee: parseInt(e.target.value),
    }));
  };

  const onOptimisedHandlePrizeChange = debounce(onHandlePrizeChange, 500);
  const onOptimisedHandleRegistrationFeeChange = debounce(
    onHandleRegistrationFeeChange,
    500
  );

  const validateFileSize = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      const file = e.target.files[0];
      const maxSize = process.env.NEXT_PUBLIC_IMG_UPLOAD_MAX_SIZE!;
      if (file.size > parseInt(maxSize)) {
        alert("File size exceeds 5MB. Please select a smaller file.");
        e.target.value = ""; // Clear the selected file
      }
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // console.log("current image: ", state.image || user?.photoUrl);
        // console.log(e.target?.result);
        // console.log(
        //   "same image? : ",
        //   (state.image || user?.photoUrl) === e.target?.result
        // );
        if (e.target && e.target.result) {
          // const currentImg = state.image || user?.photoUrl;
          const targetImg = e.target?.result?.toString();
          // setIsDuplicateImg(currentImg === targetImg);
          // setState({ ...state, image: targetImg });
          // setIsOpenDialog(true);
          setPreviewImg(targetImg);
        }
      };
      reader.readAsDataURL(file);
      //   console.log(reader);
      //   console.log(reader.result);
    } else {
      console.log("no file selected");
    }
  };

  const onSubmit = (data: z.output<typeof formSchema>) => {
    console.log("form data: ", data);
  };

  const onSelectCategory = (value: string) => {
    console.log("selected category: ", value);
  };

  useEffect(() => {
    if (date) {
      form.setValue("date", date.toString());
    }

    form.setValue("isPublic", isPublicChecked);
  }, [form, date, isPublicChecked]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 max-w-[1000px]"
      >
        <section
          className={`space-y-4 overflow-y-auto pr-4 bg-[#14141b] rounded-xl p-6`}
        >
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Tournament Details
          </h4>
          <div className="flex-wrap grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <span className="text-[#e50b0d] text-xl">*</span>
                    </FormLabel>
                    <FormControl>
                      <PrimaryInput
                        placeholder="Malaysian Open 2024"
                        {...field}
                      />
                    </FormControl>
                    <ErrorFormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description{" "}
                      <span className="text-[#e50b0d] text-xl">*</span>
                    </FormLabel>
                    <FormControl>
                      <PrimaryInput
                        placeholder="rules, instructions, guidelines ..."
                        {...field}
                      />
                    </FormControl>
                    <ErrorFormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Dates <span className="text-[#e50b0d] text-xl">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant={"lineInput"} size={"input"}>
                              {date?.from ? (
                                date.to ? (
                                  <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(date.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PrimaryPopoverContent
                          className="w-auto p-0"
                          align="start"
                          variant={"primary"}
                        >
                          <Calendar
                            initialFocus
                            mode="range"
                            numberOfMonths={2}
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PrimaryPopoverContent>
                      </Popover>
                      <ErrorFormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Location <span className="text-[#e50b0d] text-xl">*</span>
                    </FormLabel>
                    <FormControl>
                      <PrimaryInput
                        placeholder="Stadium Bukit Jalil"
                        {...field}
                      />
                    </FormControl>
                    <ErrorFormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center">
                      Open to public{" "}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="pl-2">
                            <InfoCircledIcon />
                          </TooltipTrigger>
                          <TooltipContent className="!bg-[#333] ">
                            <p className="text-[#fcfcfc]">
                              Default is public, set to false if its an internal
                              or private tournament.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span className="text-[#e50b0d] text-xl pl-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={isPublicChecked}
                        onCheckedChange={setIsPublicChecked}
                      />
                    </FormControl>
                    <ErrorFormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center">
                      Type{" "}
                      <span className="text-[#e50b0d] text-xl pl-1">*</span>
                    </FormLabel>
                    {TournamentTypeLookup.map((type) => (
                      <FormField
                        key={type.id}
                        control={form.control}
                        name="type"
                        render={({ field }) => {
                          // console.log(field.value);
                          // console.log(type);
                          return (
                            <FormItem
                              key={type.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(type.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          type.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== type.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {type.title}
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger className="pl-2">
                                      <InfoCircledIcon />
                                    </TooltipTrigger>
                                    <TooltipContent
                                      align="end"
                                      side="right"
                                      className="!bg-[#333] "
                                    >
                                      <p className="text-[#fcfcfc]">
                                        {type.tooltip}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <ErrorFormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Thumbnail section */}
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <FormLabel>Thumbnail</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoCircledIcon />
                    </TooltipTrigger>
                    <TooltipContent className="!bg-[#333]">
                      <p className="text-[#fcfcfc]">
                        Thumbnail is a still image that acts as the preview
                        image for your content.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="file"
                      className="border border-[#fcfcfc] bg-transparent rounded-3xl py-2 px-6 hover:bg-[#fcfcfc] hover:text-[#e50b0d] cursor-pointer"
                    >
                      Upload
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="file"
                        type="file"
                        accept="image/*"
                        onChange={validateFileSize}
                        className="hidden"
                      />
                    </FormControl>
                    <ErrorFormMessage className="py-2" />
                  </FormItem>
                )}
              />
              <div className="mt-4">
                {previewImg ? (
                  <div className="relative w-[300px] h-[200px] bg-center border border-slate-400 rounded-md">
                    <Image
                      src={previewImg}
                      fill
                      sizes="100%"
                      objectFit="contain"
                      alt="tournament thumbnail image"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center bg-slate-700 rounded-md w-[300px] h-[200px] px-4 text-center font-light text-sm text-slate-400 ">
                    Preview will be displayed here.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section
          className={`space-y-4 overflow-y-auto pr-4 bg-[#14141b] rounded-xl p-6`}
        >
          <div className="flex gap-4">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Event Category
            </h4>
            <Button
              type="button"
              variant={"main"}
              onClick={() => setIsAddEvent(true)}
            >
              Add
            </Button>
          </div>
          <div className={`add-category-form ${isAddEvent ? "" : "hidden"}`}>
            <div className="flex flex-col gap-4">
              <div className="flex-wrap grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
                <div className="flex flex-col gap-2">
                  <FormLabel>
                    Category <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(value) =>
                      setEventDraft((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {TournamentCategoryLookup.map((cat) => (
                        <SelectItem key={cat.id} value={cat.title}>
                          {cat.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel>
                    Event Type <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(value) =>
                      setEventDraft((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {EventTypeLookup.map((type) => (
                        <SelectItem key={type.id} value={type.title}>
                          {type.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel>
                    Age Group <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <MultipleSelector
                    onSearch={async (value) => {
                      const res = await ageSearch(value);
                      return res;
                    }}
                    defaultOptions={multiSelectAgeGrouplookup}
                    creatable
                    placeholder="Select or insert age group"
                    loadingIndicator={
                      <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
                        loading...
                      </p>
                    }
                    emptyIndicator={
                      <p className="w-full text-center text-lg leading-10 text-muted-foreground">
                        no results found.
                      </p>
                    }
                    // inputProps={{ maxLength: 2 }}
                    // hidePlaceholderWhenSelected
                    onChange={(options) =>
                      setEventDraft((prev) => {
                        const ageGroupString = options
                          .map((obj) => obj.value)
                          .join(", ");
                        return { ...prev, ageGroup: ageGroupString };
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel>
                    Level <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(value) =>
                      setEventDraft((prev) => ({ ...prev, level: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {LevelLookup.map((level) => (
                        <SelectItem
                          key={level.id}
                          value={level.title}
                          className="flex items-center"
                        >
                          {level.title} - {level.tooltip}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel>
                    Prize <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <PrimaryInput
                    placeholder="RM100 Cash"
                    onChange={onOptimisedHandlePrizeChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel>
                    Registration Fee (RM){" "}
                    <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <PrimaryInput
                    type="number"
                    placeholder="50"
                    onChange={onOptimisedHandleRegistrationFeeChange}
                  />
                </div>
              </div>
            </div>
            <section className="flex justify-end items-center gap-2 pt-8">
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => {
                  setEventDraft({
                    category: "",
                    ageGroup: "",
                    type: "",
                    level: "",
                    prize: "",
                    registrationFee: 0,
                  });
                  setIsAddEvent(false);
                }}
                className="w-24"
              >
                Back
              </Button>
              <Button
                type="button"
                variant={"main"}
                onClick={() => console.log("event: ", eventDraft)}
                className="w-24"
              >
                Proceed
              </Button>
            </section>
          </div>
          <div className={`${isAddEvent ? "hidden" : ""}`}>Preview</div>
        </section>
        <section className="flex justify-end items-center gap-2 pt-8">
          <Button type="submit" variant={"main"} className="w-24">
            Draft
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default CreateTournamentForm;
