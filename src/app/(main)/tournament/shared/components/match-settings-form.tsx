import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { MatchSettings, MatchSettingsSchema } from "@/form_schema/matchSetting";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Switch from "@/components/form/switch/Switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoCircleIcon } from "@/icons/components";
import { PointsLookup } from "@/lookups/tournament/pointsLookup";
import { SetsLookup } from "@/lookups/tournament/setsLookup";
import { GracePeriodLookup } from "@/lookups/tournament/gracePeriodLookup";
import { Button } from "@/components/ui/button";

interface props {
  form?: UseFormReturn<MatchSettings>;
  isEdit?: boolean;
  defaultValues: MatchSettings;
}

function MatchSettingsForm({ form, isEdit, defaultValues }: props) {
  if (!form) {
    form = useForm<MatchSettings>({
      resolver: zodResolver(MatchSettingsSchema),
      shouldFocusError: false,
      defaultValues: defaultValues,
    });
  }

  return (
    <section
      className={`space-y-4 overflow-y-auto pr-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
    >
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Match Settings
      </h4>
      <Form {...form}>
        <section
          className={`space-y-4 overflow-y-auto pr-4 rounded-2xl border border-gray-200 px-6 py-3 dark:border-gray-800 dark:bg-white/[0.03]`}
        >
          <div className="flex-wrap grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-0">
                    Points{" "}
                    <span className="text-[#e50b0d] text-xl pl-1">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="disabled:opacity-[0.8] disabled:cursor-default w-full">
                        <SelectValue placeholder="Select the points" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PointsLookup.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.points.toString()}
                        >
                          {item.points}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="points" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="changeOfEnds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-0">
                    Number of sets
                    <span className="text-[#e50b0d] text-xl pl-1">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="disabled:opacity-[0.8] disabled:cursor-default w-full">
                        <SelectValue placeholder="Select the number of sets" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SetsLookup.map((item) => (
                        <SelectItem key={item.id} value={item.sets.toString()}>
                          {item.sets}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="changeOfEnds" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gracePeriod"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center gap-0">
                      Grace Period (minutes)
                      <span className="text-[#e50b0d] text-xl pl-1">*</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger type="button" className="pl-2">
                            <InfoCircleIcon />
                          </TooltipTrigger>
                          <TooltipContent
                            align="start"
                            side="top"
                            className="!bg-[#333] "
                          >
                            <p className="text-[#fcfcfc] max-w-[300px] text-wrap">
                              The player must be present in the court within the
                              grace period after the umpire has reached the
                              court. Else, the opponent will win by walkover.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                      value={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="disabled:opacity-[0.8] disabled:cursor-default w-full">
                          <SelectValue placeholder="Select a grace period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GracePeriodLookup.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.period.toString()}
                          >
                            {item.period}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorMessage name="gracePeriod" />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="allowSpinServe"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-0">
                    Allow Spin Serve
                    <span className="text-[#e50b0d] text-xl pl-1">*</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger type="button" className="pl-2">
                          <InfoCircleIcon />
                        </TooltipTrigger>
                        <TooltipContent
                          align="start"
                          side="top"
                          className="!bg-[#333] "
                        >
                          <p className="text-[#fcfcfc] max-w-[300px] text-wrap">
                            A spin serve involves spinning the shuttle before
                            releasing the shuttle or hitting the feathers to
                            create a spin.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Switch
                        label=""
                        // defaultChecked={allowSpinServe}
                        // onChange={(checked: boolean) =>
                        //   setAllowSpinServe(checked)
                        // }
                        defaultChecked={field.value}
                        onChange={field.onChange}
                      />
                      <input value={field.value.toString()} readOnly hidden />
                    </div>
                  </FormControl>
                  <ErrorMessage name="allowSpinServe" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allowDeuce"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-0">
                    Allow Deuce
                    <span className="text-[#e50b0d] text-xl pl-1">*</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger type="button" className="pl-2">
                          <InfoCircleIcon />
                        </TooltipTrigger>
                        <TooltipContent
                          align="start"
                          side="top"
                          className="!bg-[#333] "
                        >
                          <p className="text-[#fcfcfc] max-w-[300px] text-wrap">
                            Deuce refers to a tied score where either one side
                            must lead by 2 points in order to win the game.E.g.
                            22-20
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Switch
                        label=""
                        className="disabled:opacity-[0.8] disabled:cursor-default"
                        // defaultChecked={allowDeuce}
                        // onChange={(checked: boolean) => setAllowDeuce(checked)}
                        defaultChecked={field.value}
                        onChange={field.onChange}
                      />
                      <input value={field.value.toString()} readOnly hidden />
                    </div>
                  </FormControl>
                  <ErrorMessage name="allowDeuce" />
                </FormItem>
              )}
            />
          </div>
        </section>

        {isEdit && (
          <section className="flex justify-end items-center gap-2 pt-4">
            <Button type="submit" variant={"tailAdminPrimary"} className="w-24">
              Save
            </Button>
          </section>
        )}
      </Form>
    </section>
  );
}

export default MatchSettingsForm;
