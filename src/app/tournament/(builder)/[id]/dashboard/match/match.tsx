"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { setMatchSettings } from "@/app/service/tournament/matchService";
import { Button } from "@/components/ui/button";
import {
  ErrorFormMessage,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
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
import { toast } from "@/components/ui/use-toast";
import { GracePeriodLookup } from "@/lookups/tournament/gracePeriodLookup";
import { PointsLookup } from "@/lookups/tournament/pointsLookup";
import { SetsLookup } from "@/lookups/tournament/setsLookup";

export const formSchema = z.object({
  id: z.string(),
  points: z.string().min(1, {
    message: "Tournament point system is required.",
  }),
  changeOfEnds: z.string().min(1, {
    message: "Change of ends is required",
  }),
  gracePeriod: z.string().min(1, {
    message: "Grace period is required",
  }),
  allowSpinServe: z.boolean({
    required_error: "Allow spin serve is required.",
  }),
  allowDeuce: z.boolean({
    required_error: "Allow spin serve is required.",
  }),
});

export interface IMatch {
  id: string;
  points: string;
  changeOfEnds: string;
  gracePeriod: string;
  allowSpinServe: boolean;
  allowDeuce: boolean;
  tournamentId: string;
}

interface props {
  tournamentId: string;
  matchSettings: IMatch;
}

const MatchSettings = ({ tournamentId, matchSettings }: props) => {
  const [allowSpinServe, setAllowSpinServe] = useState(
    matchSettings.allowSpinServe
  );
  const [allowDeuce, setAllowDeuce] = useState(matchSettings.allowDeuce);
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
    defaultValues: {
      // since formField is using controlled component, you need to provide default value for the field
      id: matchSettings?.id || uuidv4(),
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

  const onSubmit = async (data: z.output<typeof formSchema>) => {
    console.log("form data: ", data);

    try {
      const parsedData = formSchema.parse(data);

      if (!parsedData) return;

      const payload: IMatch = {
        ...parsedData,
        tournamentId: tournamentId,
      };

      const result = await setMatchSettings(payload);

      if (result.success) setIsEdit(false);

      toast({
        variant: result!.success ? "success" : "destructive",
        title: result!.success ? "Success" : "Error",
        description: result!.message,
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Form {...form}>
      <form id="matchForm" onSubmit={form.handleSubmit(onSubmit)}>
        <section
          className={`space-y-4 overflow-y-auto pr-4 bg-[#14141b] rounded-xl px-6 py-3`}
        >
          <div className="flex items-center justify-between">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Match Settings
            </h4>
            <Button
              type="button"
              className={`flex gap-2 ${isEdit ? "hidden" : ""}`}
              variant={"secondary"}
              onClick={() => setIsEdit(true)}
            >
              <Pencil2Icon />
              Edit
            </Button>
          </div>
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
                    disabled={!isEdit}
                  >
                    <FormControl>
                      <SelectTrigger className="disabled:opacity-[0.8] disabled:cursor-default">
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
                  <ErrorFormMessage />
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
                    disabled={!isEdit}
                  >
                    <FormControl>
                      <SelectTrigger className="disabled:opacity-[0.8] disabled:cursor-default">
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
                  <ErrorFormMessage />
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
                            <InfoCircledIcon />
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
                      disabled={!isEdit}
                    >
                      <FormControl>
                        <SelectTrigger className="disabled:opacity-[0.8] disabled:cursor-default">
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
                    <ErrorFormMessage />
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
                          <InfoCircledIcon />
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
                    <Switch
                      className="disabled:opacity-[0.8] disabled:cursor-default"
                      checked={allowSpinServe}
                      onCheckedChange={(checked: boolean) => {
                        console.log("checked: ", checked);
                        setAllowSpinServe(checked);
                      }}
                      disabled={!isEdit}
                    />
                  </FormControl>
                  <ErrorFormMessage />
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
                          <InfoCircledIcon />
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
                    <Switch
                      className="disabled:opacity-[0.8] disabled:cursor-default"
                      checked={allowDeuce}
                      onCheckedChange={() => setAllowDeuce(!allowDeuce)}
                      disabled={!isEdit}
                    />
                  </FormControl>
                  <ErrorFormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <section
          className={`flex justify-end items-center gap-2 pt-4 ${
            isEdit ? "" : "hidden"
          }`}
        >
          <Button
            type="button"
            variant={"secondary"}
            className="w-24"
            onClick={() => setIsEdit(false)}
          >
            Back
          </Button>
          <Button type="submit" variant={"main"} className="w-24">
            Save
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default MatchSettings;
