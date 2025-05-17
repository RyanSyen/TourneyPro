import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm, UseFormReturn, useWatch } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TournamentEvent, TournamentEventSchema } from "@/form_schema/event";
import { ErrorMessage } from "@hookform/error-message";
import { TournamentEventLookup } from "@/lookups/tournament/eventLookup";
import { LevelLookup } from "@/lookups/tournament/levelLookup";
import { EventTypeLookup } from "@/lookups/tournament/eliminationLookup";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { AgeGroupLookup } from "@/lookups/tournament/ageGroupLookup";

interface props {
  tournamentId: string;
  event: TournamentEvent;
  setEvent: React.Dispatch<React.SetStateAction<TournamentEvent>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  previewList: TournamentEvent[];
  setPreviewList: React.Dispatch<React.SetStateAction<TournamentEvent[]>>;
}

interface MultipleAgeGroupSelectorProps {
  uniqueKey: React.Key;
/* eslint-disable @typescript-eslint/no-explicit-any */
  form: UseFormReturn<TournamentEvent, any, undefined>;
  ageGroup: Option[];
  ageGroupStr: string;
  ageSearch: (value: string) => Promise<Option[]>;
  filteredAgeGroupOptions: Option[];
  setAgeGroup: React.Dispatch<React.SetStateAction<Option[]>>;
  setAgeGroupStr: React.Dispatch<React.SetStateAction<string>>;
  isAgeGroupDisabled: boolean;
}

const multiSelectAgeGrouplookup: Option[] = AgeGroupLookup.map((group) => ({
  label: group.age,
  value: group.age,
}));

const MultipleAgeGroupSelector = ({
  uniqueKey,
  form,
  ageGroup,
  ageGroupStr,
  ageSearch,
  filteredAgeGroupOptions,
  setAgeGroup,
  setAgeGroupStr,
  isAgeGroupDisabled,
}: MultipleAgeGroupSelectorProps) => {
  useEffect(() => {
    if (ageGroupStr.length > 0) {
      form.setValue("ageGroup", ageGroupStr);
    }
  }, [ageGroupStr, form]);
  // console.log("key: ", uniqueKey);
  return (
    <MultipleSelector
      key={uniqueKey}
      value={ageGroup}
      onSearch={async (value) => {
        const res = await ageSearch(value);
        return res;
      }}
      defaultOptions={filteredAgeGroupOptions}
      options={filteredAgeGroupOptions}
      creatable
      placeholder="Select or insert age group"
      loadingIndicator={
        <div className="py-2 text-center text-lg leading-10 text-muted-foreground">
          <div className="flex justify-center items-center gap-3">
            <Spinner size="large" />
          </div>
        </div>
      }
      emptyIndicator={
        <p className="w-full text-center text-lg leading-10 text-muted-foreground">
          no results found.
        </p>
      }
      hidePlaceholderWhenSelected
      onChange={(options) => {
        console.log("on change options: ", options);
        setAgeGroup(options);
        setAgeGroupStr(options.map((obj) => obj.value).join(", "));
      }}
      disabled={isAgeGroupDisabled}
    />
  );
};

function EventForm({
  event,
  setEvent,
  isEdit,
  setIsEdit,
  setShowForm,
  previewList,
  setPreviewList,
}: props) {
  const [ageGroupStr, setAgeGroupStr] = useState("");
  const [ageGroup, setAgeGroup] = useState<Option[]>([]);
  const [tournamentEvent, setTournamentEvent] = useState<
    TournamentEvent[] | undefined
  >(undefined);

  // const {
  //   fetchTournamentEvents,
  //   addTournamentEvent,
  //   updateTournamentEvent,
  //   deleteTournamentEvent,
  // } = useTournamentEventStore();

  const form = useForm<TournamentEvent>({
    resolver: zodResolver(TournamentEventSchema),
    shouldFocusError: false,
    defaultValues: {
      id: event.id || "",
      event: event.event || "",
      ageGroup: event.ageGroup || "",
      type: event.type || "",
      level: event.level || "",
      prize: event.prize || "",
      registrationFee: event.registrationFee || 0,
    },
  });

  const watchedEvent = useWatch({ control: form.control, name: "event" });
  const watchedType = useWatch({ control: form.control, name: "type" });
  const watchedLevel = useWatch({ control: form.control, name: "level" });
  const isAgeGroupDisabled = !watchedEvent || !watchedType || !watchedLevel;

  const filteredAgeGroupOptions = useMemo(() => {
    if (!watchedEvent || !watchedType || !watchedLevel)
      return multiSelectAgeGrouplookup;

    const usedAgeGroups = previewList
      .filter(
        (e) =>
          e.event === watchedEvent &&
          e.type === watchedType &&
          e.level === watchedLevel &&
          (!isEdit || e.id !== event.id)
      )
      .flatMap((e) => e.ageGroup.split(","));

    const ageGroupList = multiSelectAgeGrouplookup.filter(
      (opt) => !usedAgeGroups.includes(opt.value)
    );

    console.log("ageGroupList: ", ageGroupList);
    return ageGroupList;
  }, [watchedEvent, watchedType, watchedLevel, previewList, isEdit, event.id]);

  const ageSearch = async (value: string): Promise<Option[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const formVals = form.getValues();
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const currentEvent = form.getValues("event");
    //     const currentType = form.getValues("type");
    //     const currentLevel = form.getValues("level");

    const usedAgeGroups = previewList
      .filter(
        (e) =>
          e.event === formVals.event &&
          e.type === formVals.type &&
          e.level === formVals.level &&
          (!isEdit || e.id !== event.id)
      )
      .flatMap((e) => e.ageGroup.split(","));

    // console.log("usedAgeGroups: ", usedAgeGroups);

    const res = AgeGroupLookup.filter(
      (group) => !usedAgeGroups.includes(group.age)
    )
      .filter((group) => group.age.includes(value))
      .map((group) => ({
        value: group.age,
        label: group.age,
      }));

    return res;
    //     resolve(res);
    //   }, 500);
    // });
  };

  const resetForm = () => {
    const defaultEvent: TournamentEvent = {
      id: "",
      event: "",
      ageGroup: "",
      type: "",
      level: "",
      prize: "",
      registrationFee: 0,
    };
    setEvent(defaultEvent);
    setAgeGroup([]);
    setAgeGroupStr("");
    form.reset(defaultEvent);
  };

  const onSubmit = async (data: z.output<typeof TournamentEventSchema>) => {
    // console.log("form data: ", data);

    try {
      const usedAgeGroups = previewList
        .filter(
          (e) =>
            e.event === data.event &&
            e.type === data.type &&
            e.level === data.level &&
            (!isEdit || e.id !== data.id)
        )
        .flatMap((e) => e.ageGroup.split(","));

      const selectedAgeGroups = data.ageGroup.split(",");
      const duplicateGroups = selectedAgeGroups.filter((age) =>
        usedAgeGroups.includes(age)
      );

      if (duplicateGroups.length > 0) {
        console.log(
          `These age groups are already used for this event: ${duplicateGroups.join(
            ", "
          )}`
        );
        return;
      }
      const parsedData = TournamentEventSchema.parse(data);

      if (!parsedData) console.error("Error parsing data");

      const payload: TournamentEvent = {
        ...parsedData,
        prize: parsedData.prize || "no prize",
        registrationFee: parsedData.registrationFee || 0,
      };

      if (isEdit) {
        const event = tournamentEvent!.find((cat) => cat.id === parsedData.id);

        if (event) {
          // result = await updateTournamentEvent(event.id!, payload);
          const prevPreviewList = [...previewList].filter((cat) => {
            return cat.id !== parsedData.id;
          });
          setPreviewList([...prevPreviewList, payload]);
        }
        // if (result.success) setPreviewList([...prevPreviewList, payload]);
      } else {
        console.log("adding tournament event");
        // result = await addTournamentEvent(tournamentId, payload);
        setTournamentEvent((prev) => {
          if (prev) {
            return [...prev, payload];
          }
          return [payload];
        });
        setPreviewList([...previewList, payload]);

        // if (result.success) setPreviewList([...previewList, payload]);
      }

      // if (result!.success) {
      //   toast.success("Success", result!.message);
      // } else {
      //   toast.error("Error", result!.message);
      // }

      setIsEdit(false);
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Form {...form}>
      <form
        id="eventsForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 max-w-[1000px] space-y-4 overflow-y-auto pr-4 rounded-2xl border border-gray-200 px-6 py-3 dark:border-gray-800 dark:bg-white/[0.03]"
      >
        <section className={`flex-wrap grid grid-cols-2 gap-x-12 gap-y-8`}>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => {
              // console.log("id: ", field.value);
              return (
                <FormItem className="hidden">
                  <FormLabel>ID</FormLabel>
                  <Input type="string" value={field.value} disabled hidden />
                  <ErrorMessage name="id" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="event"
            render={({ field }) => {
              // console.log("Event value: ", field.value);
              return (
                <FormItem>
                  <FormLabel>
                    Event <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Event" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TournamentEventLookup.map((cat) => (
                        <SelectItem key={cat.id} value={cat.title}>
                          {cat.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="event" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Event Level <span className="text-[#e50b0d] text-xl">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Event level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LevelLookup.map((level) => (
                      <SelectItem
                        key={level.id}
                        value={level.title}
                        className="flex items-center"
                      >
                        {level.desc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage name="level" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Event Type <span className="text-[#e50b0d] text-xl">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an event type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {EventTypeLookup.map((type) => (
                      <SelectItem key={type.id} value={type.title}>
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage name="type" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ageGroup"
            render={({ field }) => {
              console.log("ageGroup: ", field.value);
              return (
                <FormItem>
                  <FormLabel>
                    Age Group <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <MultipleAgeGroupSelector
                    uniqueKey={uuidv4().toString()}
                    form={form}
                    ageGroup={ageGroup}
                    ageGroupStr={ageGroupStr}
                    ageSearch={ageSearch}
                    filteredAgeGroupOptions={filteredAgeGroupOptions}
                    setAgeGroup={setAgeGroup}
                    setAgeGroupStr={setAgeGroupStr}
                    isAgeGroupDisabled={isAgeGroupDisabled}
                  />
                  <ErrorMessage name="ageGroup" />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="prize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prize</FormLabel>
                <Input
                  placeholder="RM100 Cash"
                  value={field.value}
                  onChange={field.onChange}
                />
                <ErrorMessage name="prize" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registrationFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Fee (RM) </FormLabel>
                <Input
                  type="number"
                  placeholder="50"
                  value={field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? undefined : parseFloat(val));
                  }}
                />
                <ErrorMessage name="registrationFee" />
              </FormItem>
            )}
          />
        </section>
        <section className="flex justify-end items-center gap-2 pt-4">
          <Button
            type="button"
            variant={"tailAdminSecondary"}
            onClick={() => {
              resetForm();
              setAgeGroupStr("");
              setIsEdit(false);
              setShowForm(false);
            }}
            className="w-24"
          >
            Cancel
          </Button>
          <Button type="submit" variant={"tailAdminPrimary"} className="w-24">
            Create
          </Button>
        </section>
        <Separator className="my-4 py-[1px]" />
      </form>
    </Form>
  );
}

export default EventForm;
