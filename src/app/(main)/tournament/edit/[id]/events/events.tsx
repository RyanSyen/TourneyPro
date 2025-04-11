import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AgeGroupLookup } from "@/lookups/tournament/ageGroupLookup";
import { TournamentEventLookup } from "@/lookups/tournament/eventLookup";
import { EventTypeLookup } from "@/lookups/tournament/eliminationLookup";
import { LevelLookup } from "@/lookups/tournament/levelLookup";
import {
  type TournamentEvent,
  TournamentEventSchema,
} from "@/form_schema/event";
// import { toast } from "sonner";
import { ErrorMessage } from "@hookform/error-message";
import useTournamentEventStore from "../../../shared/data-store/useEventStore";
import { useParams } from "next/navigation";
import CustomButton from "@/components/ui/button/CustomButton";
import { PlusIcon } from "@/icons/components";
import { Spinner } from "@/components/ui/spinner";

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

export default function TournamentEvent({
  tournamentId,
}: {
  tournamentId: string;
}) {
  console.log("tournamentId: ", tournamentId);
  const [tournamentEvent, setTournamentEvent] = useState<
    TournamentEvent[] | undefined
  >(undefined);
  const params = useParams();
  const [isAddEvent, setIsAddEvent] = useState(false);
  const [isEditEvent, setIsEditEvent] = useState(false);
  const [ageGroupStr, setAgeGroupStr] = useState("");
  const [ageGroup, setAgeGroup] = useState<Option[]>([]);
  const [previewList, setPreviewList] = useState<TournamentEvent[]>(
    tournamentEvent || []
  );
  const [editEvent, setEditEvent] = useState<TournamentEvent>({
    id: "",
    event: "",
    ageGroup: "",
    type: "",
    level: "",
    prize: "",
    registrationFee: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const {
    fetchTournamentEvents,
    addTournamentEvent,
    updateTournamentEvent,
    deleteTournamentEvent,
  } = useTournamentEventStore();

  const form = useForm<TournamentEvent>({
    resolver: zodResolver(TournamentEventSchema),
    shouldFocusError: false,
    defaultValues: {
      id: editEvent.id || "",
      event: editEvent.event || "",
      ageGroup: editEvent.ageGroup || "",
      type: editEvent.type || "",
      level: editEvent.level || "",
      prize: editEvent.prize || "",
      registrationFee: editEvent.registrationFee || 0,
    },
  });

  useEffect(() => {
    const loadTournament = async () => {
      try {
        setLoading(true);
        const tournamentData = await fetchTournamentEvents(
          params.id!.toString()
        );
        console.log("tournament: ", tournamentData);
        setTournamentEvent(tournamentData);
        setPreviewList(tournamentData || []);
      } catch (error) {
        console.error("Error fetching tournament:", error);
        // Handle error state if needed
      } finally {
        setLoading(false);
      }
    };

    loadTournament();
  }, [fetchTournamentEvents, params.id]);

  useEffect(() => {
    if (ageGroupStr.length > 0) {
      form.setValue("ageGroup", ageGroupStr);
    }
  }, [ageGroupStr, form]);

  // onEditEvent is called, it will reset the form with Event values
  // and it will trigger rerender to update form default values
  useEffect(() => {
    if (editEvent && editEvent.event != "") {
      console.log("editEvent: ", editEvent);
      const ageGroupList = editEvent.ageGroup.split(",");
      const optionList = ageGroupList.map((opt) => ({
        label: opt,
        value: opt,
      }));
      setAgeGroup(optionList);
      form.reset(editEvent);
    }
  }, [editEvent, form]);

  const onEditEvent = (event: TournamentEvent) => {
    console.log("edit Event: ", event);
    setIsEditEvent(true);
    setEditEvent(event);
  };

  const resetEditEvent = () => {
    const defaultEvent: TournamentEvent = {
      id: "",
      event: "",
      ageGroup: "",
      type: "",
      level: "",
      prize: "",
      registrationFee: 0,
    };
    setEditEvent(defaultEvent);
    setAgeGroup([]);
    setAgeGroupStr("");
    form.reset(defaultEvent);
  };

  const onSubmit = async (data: z.output<typeof TournamentEventSchema>) => {
    console.log("form data: ", data);
    let result;

    try {
      const parsedData = TournamentEventSchema.parse(data);

      if (!parsedData) console.error("Error parsing data");

      /* eslint-disable @typescript-eslint/no-unused-vars */
      const payload: TournamentEvent = {
        ...parsedData,
        prize: parsedData.prize || "no prize",
        registrationFee: parsedData.registrationFee || 0,
      };

      if (isEditEvent) {
        const event = tournamentEvent!.find((cat) => cat.id === parsedData.id);

        if (event) {
          result = await updateTournamentEvent(event.id!, payload);
          const prevPreviewList = [...previewList].filter((cat) => {
            return cat.id !== parsedData.id;
          });
          setPreviewList([...prevPreviewList, payload]);
        }
        // if (result.success) setPreviewList([...prevPreviewList, payload]);
      } else {
        result = await addTournamentEvent(params.id!.toString(), payload);
        setPreviewList([...previewList, payload]);

        // if (result.success) setPreviewList([...previewList, payload]);
      }

      // if (result!.success) {
      //   toast.success("Success", result!.message);
      // } else {
      //   toast.error("Error", result!.message);
      // }

      setIsAddEvent(false);
      setIsEditEvent(false);
      resetEditEvent();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteTournamentEvent(params.id!.toString(), id);
      const updatedEvents = tournamentEvent?.filter((cat) => cat.id !== id);
      setPreviewList(updatedEvents || []);
      // if(result!.success) {
      //     toast.success("Success", result!.message);
      // } else {
      //     toast.error("Error", result!.message);
      // }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center gap-3">
        <Spinner size="large" />
      </div>
    );

  // if (!tournamentEvent || tournamentEvent.length == 0) return <div>No events found</div>;

  return (
    <section
      className={`flex-1 space-y-4 overflow-y-auto h-fit pr-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
    >
      <div className="flex items-center gap-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Events
        </h4>
        {/* <Button
          type="button"
          variant={"tailAdminPrimary"}
          onClick={() => setIsAddEvent(true)}
        >
          {isEditEvent ? "Edit" : "Add"}
        </Button> */}
        <CustomButton
          startIcon={<PlusIcon />}
          size="sm"
          onClick={() => setIsAddEvent(true)}
        >
          {isEditEvent ? "Edit" : "Create"} Event
        </CustomButton>
      </div>
      <section className={`${isAddEvent || isEditEvent ? "" : "hidden"} `}>
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
                      <Input
                        type="string"
                        value={field.value}
                        disabled
                        hidden
                      />
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
                name="ageGroup"
                render={({ field }) => {
                  console.log("ageGroup: ", field.value);
                  return (
                    <FormItem>
                      <FormLabel>
                        Age Group{" "}
                        <span className="text-[#e50b0d] text-xl">*</span>
                      </FormLabel>
                      <MultipleSelector
                        value={ageGroup}
                        onSearch={async (value) => {
                          const res = await ageSearch(value);
                          return res;
                        }}
                        defaultOptions={multiSelectAgeGrouplookup}
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
                        // inputProps={{ maxLength: 2 }}
                        hidePlaceholderWhenSelected
                        onChange={(options) => {
                          console.log("on change options: ", options);
                          setAgeGroup(options);
                          setAgeGroupStr(
                            options.map((obj) => obj.value).join(", ")
                          );
                        }}
                      />
                      <ErrorMessage name="ageGroup" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Event Type{" "}
                      <span className="text-[#e50b0d] text-xl">*</span>
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
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Level <span className="text-[#e50b0d] text-xl">*</span>
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
                            {level.title} - {level.tooltip}
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
                      onChange={
                        (e) => field.onChange(parseFloat(e.target.value)) //! idk why got this bug where I type number but react hook form throws 'Expected number, received string'
                      }
                    />
                    <ErrorMessage name="registrationFee" />
                  </FormItem>
                )}
              />
            </section>
            <section className="flex justify-end items-center gap-2 pt-4">
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => {
                  setAgeGroupStr("");
                  form.reset();
                  resetEditEvent();
                  setIsAddEvent(false);
                  setIsEditEvent(false);
                }}
                className="w-24"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant={"tailAdminPrimary"}
                className="w-24"
              >
                Proceed
              </Button>
            </section>
            <Separator className="my-4 py-[1px]" />
          </form>
        </Form>
      </section>

      <div>
        <div className="pb-2">Preview</div>
        <div>
          <Accordion
            type="single"
            collapsible
            className="flex flex-col gap-4 w-full py-4"
          >
            {previewList.map((evt) => {
              // console.log(cat);
              return (
                <AccordionItem
                  key={uuidv4()}
                  value={`${evt.event}${evt.type}${evt.level}`}
                  className="border rounded-lg border-slate-700"
                >
                  <AccordionTrigger className="bg-slate-700 rounded-md px-2 !no-underline">
                    {`${evt.event} | ${evt.type} | ${evt.level}`}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 flex-wrap grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
                      <div>
                        <Label>Event</Label>
                        <Input
                          className="cursor-default hover:border-[#444548] focus:border-[#444548]"
                          readOnly
                          value={evt.event}
                        />
                      </div>
                      <div>
                        <Label>Type</Label>
                        <Input
                          className="cursor-default hover:border-[#444548] focus:border-[#444548]"
                          readOnly
                          value={evt.type}
                        />
                      </div>
                      <div>
                        <Label>Age Group</Label>
                        <Input
                          className="cursor-default hover:border-[#444548] focus:border-[#444548]"
                          readOnly
                          value={evt.ageGroup}
                        />
                      </div>
                      <div>
                        <Label>Level</Label>
                        <Input
                          className="cursor-default hover:border-[#444548] focus:border-[#444548]"
                          readOnly
                          value={evt.level}
                        />
                      </div>
                      <div>
                        <Label>Prize</Label>
                        <Input
                          className="cursor-default hover:border-[#444548] focus:border-[#444548]"
                          readOnly
                          value={evt.prize == "" ? "No Prize" : evt.prize}
                        />
                      </div>
                      <div>
                        <Label>Registration Fee</Label>
                        <Input
                          className="cursor-default hover:border-[#444548] focus:border-[#444548]"
                          readOnly
                          // value={
                          //   evt.registrationFee == 0
                          //     ? "Free"
                          //     : evt.registrationFee
                          // }
                          value={evt.registrationFee}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 px-4 py-2">
                      <Button
                        variant={"secondary"}
                        onClick={() => onEditEvent(evt)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant={"tailAdminSecondary"}
                        onClick={() => onDelete(evt.id!)}
                      >
                        Delete
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
