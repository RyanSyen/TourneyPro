"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tournament, TournamentSchema } from "@/models/tournament";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { validateFileSize } from "@/helper/common";
import dayjs from "dayjs";
import Image from "next/image";
import { ErrorMessage } from "@hookform/error-message";
import {
  Popover,
  PopoverTrigger,
  PrimaryPopoverContent,
} from "@/components/ui/popover";
import { InfoCircleIcon } from "@/icons/components";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { Switch } from "@/components/ui/switch";
import Switch from "@/components/form/switch/Switch";
import { TournamentTypeLookup } from "@/lookups/tournament/tournamentTypeLookup";
import { Checkbox } from "@/components/ui/checkbox";
import { TournamentType } from "@/types/tournament";
import useTournamentStore from "../shared/data-store/useTournamentStore";
import { redirect } from "next/navigation";
import useMatchSettingsStore from "../shared/data-store/useMatchSettingsStore";

const CreateTournamentForm = ({
  isEdit = false,
  tournament,
}: {
  isEdit?: boolean;
  tournament?: Tournament;
}) => {
  const [isPublicChecked, setIsPublicChecked] = useState(isEdit ? tournament!.isPublic : true);
  const [previewImg, setPreviewImg] = useState(
    isEdit ? tournament!.thumbnail : ""
  );
  const { addTournament, updateTournament } = useTournamentStore();
  const{addMatchSettings} = useMatchSettingsStore();

  const defaultValues = isEdit
    ? {
        ...tournament,
        date: {
          from: dayjs(tournament?.date!.from).toDate(),
          to: dayjs(tournament?.date!.to).toDate(),
        },
      }
    : {
        title: "",
        description: "",
        thumbnail: "",
        isPublic: true,
        type: [],
        location: "",
        date: {
          from: dayjs().subtract(7, "days").toDate(),
          to: dayjs().toDate(),
        },
      };

  const form = useForm<Tournament>({
    resolver: zodResolver(TournamentSchema),
    defaultValues,
  });

  console.log("Form errors:", form.formState.errors);

  const onValidateFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const res = await validateFileSize(e);

      if (!res?.isValid) {
        toast.warning(res?.message || "An error occurred.");
      } else {
        setPreviewImg(res?.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.warning("An unexpected error occurred.");
    }
  };

  const onSubmit = async (data: Tournament) => {
    console.log("form submitted: ", data);
    console.log("previewImg: ", previewImg);
    console.log("isPublicChecked: ", isPublicChecked);
    const tournament = { ...data, thumbnail: previewImg, isPublic: isPublicChecked };
    if (isEdit) {
      updateTournament(tournament.id!, tournament);
      window.location.reload();
    } else {
      const tournamentId = await addTournament(tournament); 
      addMatchSettings(tournamentId); // should be handled at the services layer later
      redirect("/tournament/list");
    }
  };

  return (
    <Form {...form}>
      <form id="detailsForm" onSubmit={form.handleSubmit(onSubmit)}>
        <section
          className={`space-y-4 overflow-y-auto pr-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
        >
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Tournament Details
          </h4>
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
                      <Input placeholder="Malaysian Open 2024" {...field} />
                    </FormControl>
                    <ErrorMessage name="title" />
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
                      <Input
                        placeholder="rules, instructions, guidelines ..."
                        {...field}
                      />
                    </FormControl>
                    <ErrorMessage name="description" />
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
                            <Button
                              variant={"outline"}
                              className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
                            >
                              {/* {date?.from ? (
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
                              )} */}
                              {field.value?.from ? (
                                field.value.to ? (
                                  <>
                                    {format(field.value.from, "LLL dd, y")} -{" "}
                                    {format(field.value.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(field.value.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PrimaryPopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            initialFocus
                            mode="range"
                            numberOfMonths={2}
                            // defaultMonth={date?.from}
                            // selected={date}
                            // onSelect={setDate}
                            // disabled={(date) =>
                            //   date > new Date() || date < new Date("1900-01-01")
                            // }
                            defaultMonth={field.value?.from}
                            selected={field.value}
                            onSelect={(newDate) => field.onChange(newDate)}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PrimaryPopoverContent>
                      </Popover>
                      <ErrorMessage name="date.from" />
                      <ErrorMessage name="date.to" />
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
                      <Input placeholder="Stadium Bukit Jalil" {...field} />
                    </FormControl>
                    <span className="text-[#e50b0d]">
                      <ErrorMessage name="location" />
                    </span>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPublic"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center">
                      Open to public{" "}
                      <span className="text-[#e50b0d] text-xl">*</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="">
                            <InfoCircleIcon />
                          </TooltipTrigger>
                          <TooltipContent className="!bg-[#333] ">
                            <p className="text-[#fcfcfc]">
                              Default is public, set to false if its an internal
                              or private tournament.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Switch
                        label=""
                        defaultChecked={isPublicChecked}
                        onChange={() => setIsPublicChecked(!isPublicChecked)}
                      />
                    </FormControl>
                    <ErrorMessage name="isPublic" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={() => (
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
                                  // onCheckedChange={(checked) => {
                                  //   return checked
                                  //     ? field.onChange([
                                  //         ...field.value,
                                  //         type.id,
                                  //       ])
                                  //     : field.onChange(
                                  //         field.value?.filter(
                                  //           (value) => value !== type.id
                                  //         )
                                  //       );
                                  // }}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([
                                        ...(field.value || []),
                                        type.id,
                                      ]);
                                    } else {
                                      field.onChange(
                                        (field.value || []).filter(
                                          (value) => value !== type.id
                                        )
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {type.title}
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger className="pl-2">
                                      <InfoCircleIcon />
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
                    <ErrorMessage name="type" />
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
                      <InfoCircleIcon />
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
                render={() => (
                  <FormItem>
                    <FormLabel
                      htmlFor="file"
                      className="border border-[#fcfcfc] bg-transparent rounded-3xl py-2 px-6 hover:bg-[#fcfcfc] hover:text-blue-700 cursor-pointer"
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
                    <ErrorMessage name="thumbnail" />
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
          <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
        </section>
      </form>
    </Form>
  );
};

export default CreateTournamentForm;
