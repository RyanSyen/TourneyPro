"use client";

import { type MatchSettings, MatchSettingsSchema } from "@/models/matchSetting";
import { IMatchSettings } from "@/types/matchSetting";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import useMatchSettingsStore from "../../../shared/data-store/useMatchSettingsStore";

interface props {
  tournamentId: string;
  matchSettings: Omit<IMatchSettings, "createdAt" | "updatedAt">;
  setOpenDialog: (open: boolean) => void;
}

export default function MatchSettings({
  tournamentId,
  matchSettings,
  setOpenDialog,
}: props) {
  const [allowSpinServe, setAllowSpinServe] = useState(
    matchSettings.allowSpinServe ?? false
  );
  const [allowDeuce, setAllowDeuce] = useState<boolean>(
    matchSettings.allowDeuce ?? true
  );
  const { updateMatchSettings } = useMatchSettingsStore();

  const form = useForm<z.infer<typeof MatchSettingsSchema>>({
    resolver: zodResolver(MatchSettingsSchema),
    shouldFocusError: false,
    defaultValues: {
      // since formField is using controlled component, you need to provide default value for the field
      tournamentId: matchSettings?.tournamentId || uuidv4(),
      points: matchSettings?.points || "21",
      changeOfEnds: matchSettings?.changeOfEnds || "1",
      gracePeriod: matchSettings?.gracePeriod || "3",
      allowSpinServe: matchSettings?.allowSpinServe || false,
      allowDeuce: matchSettings?.allowDeuce || true,
    },
  });

  useEffect(() => {
    form.setValue("allowDeuce", allowDeuce);
  }, [form, allowDeuce]);

  useEffect(() => {
    form.setValue("allowSpinServe", allowSpinServe);
  }, [form, allowSpinServe]);

  const onSubmit = async (data: z.output<typeof MatchSettingsSchema>) => {
    const updatedMatchSettings: MatchSettings = {
      ...data,
      tournamentId: tournamentId,
    };
    updateMatchSettings(tournamentId, updatedMatchSettings);
    setOpenDialog(false);
  };

  return (
    <Form {...form}>
      <form id="matchForm" onSubmit={form.handleSubmit(onSubmit)}>
        <section
          className={`space-y-4 overflow-y-auto pr-4 rounded-2xl border border-gray-200 px-6 py-3 dark:border-gray-800 dark:bg-white/[0.03]`}
        >
          <div className="flex-wrap grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Points <span className="text-[#e50b0d] text-xl">*</span>
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
                  <FormLabel>
                    Number of sets{" "}
                    <span className="text-[#e50b0d] text-xl">*</span>
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
                    <FormLabel>
                      Grace Period (minutes){" "}
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
                      <span className="text-[#e50b0d] text-xl pl-1">*</span>
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
                  <FormLabel className="flex items-center">
                    Allow Spin Serve{" "}
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
                    <span className="text-[#e50b0d] text-xl pl-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Switch
                        label=""
                        defaultChecked={allowSpinServe}
                        onChange={(checked: boolean) =>
                          setAllowSpinServe(checked)
                        }
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
                  <FormLabel className="flex items-center">
                    Allow Deuce{" "}
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
                    <span className="text-[#e50b0d] text-xl pl-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Switch
                        label=""
                        className="disabled:opacity-[0.8] disabled:cursor-default"
                        defaultChecked={allowDeuce}
                        onChange={(checked: boolean) => setAllowDeuce(checked)}
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
