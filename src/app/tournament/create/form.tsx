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
import {
  Popover,
  PopoverTrigger,
  PrimaryPopoverContent,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserContext } from "@/context/UserProvider";

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
});

const CreateTournamentForm = () => {
  const userData = useUserContext();
  const [date, setDate] = useState<DateRange | undefined>({
    from: dayjs().subtract(7, "days").toDate(),
    to: dayjs().toDate(),
  });
  const [isPublicChecked, setIsPublicChecked] = useState(true);
  const [previewImg, setPreviewImg] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
    defaultValues: {
      // since formField is using controlled component, you need to provide default value for the field
      title: "",
      description: "",
      thumbnail: "",
      isPublic: true,
      shuttlecock: "",
      // date: "",
      pointsSystem: "",
      location: "",
      event: [],
    },
  });

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

  useEffect(() => {
    if (date) {
      form.setValue("date", date.toString());
    }

    form.setValue("isPublic", isPublicChecked);
  }, [form, date, isPublicChecked]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1000px]">
        <main
          className={`space-y-4 overflow-y-auto pr-4 bg-[#14141b] rounded-xl p-6`}
        >
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Tournament Details
          </h4>
          <section className="flex-wrap grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
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
          </section>
        </main>
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
