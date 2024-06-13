"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns/format";
import dayjs from "dayjs";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { setTournament } from "@/app/service/tournament/tournamentService";
import { ITournamentDetails } from "@/app/tournament/(builder)/create/detailsForm";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ErrorFormMessage,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input, PrimaryInput } from "@/components/ui/input";
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
import { toast } from "@/components/ui/use-toast";
import { validateFileSize } from "@/helper/common";
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
  type: z
    .array(z.enum(["circuit", "standalone"]))
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one tournament type.",
    }),
  date: z.string({
    required_error: "Tournament date is required.",
  }),
  location: z.string().min(1, {
    message: "Tournament points system is required.",
  }),
});

type TournamentType = "circuit" | "standalone";

const Details = ({
  tournamentData,
}: {
  tournamentData: { message: ITournamentDetails };
}) => {
  const t = tournamentData.message;
  const [date, setDate] = useState<DateRange | undefined>({
    from: dayjs(t.startDate).toDate(),
    to: dayjs(t.endDate).toDate(),
  });
  const [isPublicChecked, setIsPublicChecked] = useState(t.isPublic);
  const [previewImg, setPreviewImg] = useState(t.thumbnail);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
    defaultValues: {
      // since formField is using controlled component, you need to provide default value for the field
      title: t.title,
      description: t.description,
      thumbnail: t.thumbnail,
      isPublic: t.isPublic,
      type: t.type,
      location: t.location,
    },
  });

  useEffect(() => {
    if (date) {
      form.setValue("date", date.toString());
    }

    form.setValue("isPublic", isPublicChecked);

    if (previewImg) {
      form.setValue("thumbnail", previewImg);
    }
  }, [form, date, isPublicChecked, previewImg]);

  const onSubmit = async (data: z.output<typeof formSchema>) => {
    try {
      const parsed = formSchema.safeParse(data);

      if (!parsed.success) throw new Error("Invalid form data");

      const reqData: ITournamentDetails = {
        id: t.id,
        title: parsed.data.title,
        description: parsed.data.description || "",
        thumbnail: parsed.data.thumbnail,
        isPublic: parsed.data.isPublic,
        type: parsed.data.type,
        startDate: date?.from?.toUTCString() || "",
        endDate: date?.to?.toUTCString() || "",
        location: parsed.data.location,
        organizer: t.organizer,
        status: t.status,
        createdAt: t.createdAt,
        updatedAt: dayjs().toString(),
      };

      console.log("requestData: ", reqData);

      const res = await setTournament(reqData);

      toast({
        variant: res!.success ? "success" : "destructive",
        title: res!.success ? "Success" : "Error",
        description: res!.message,
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const onValidateFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const res = await validateFileSize(e);

      if (!res?.isValid) {
        toast({
          variant: "warn",
          title: res?.message || "An error occurred.",
          description: "",
        });
      } else {
        setPreviewImg(res?.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      toast({
        variant: "warn",
        title: "An unexpected error occurred.",
        description: "",
      });
    }
  };

  return (
    <Form {...form}>
      <form id="detailsForm" onSubmit={form.handleSubmit(onSubmit)}>
        <section
          className={`space-y-4 overflow-y-auto pr-4 bg-[#14141b] rounded-xl p-6`}
        >
          <div className="flex-wrap grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
            <div className="flex flex-col gap-5">
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
                                  checked={field.value?.includes(
                                    type.id as TournamentType
                                  )}
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
                        onChange={(e) => onValidateFile(e)}
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
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                      alt="tournament thumbnail image"
                      priority
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
        <section className="flex justify-end items-center gap-2 py-8">
          <Button variant={"main"} type="submit">
            Update
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default Details;
