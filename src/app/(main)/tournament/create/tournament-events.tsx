import { TournamentEvent } from "@/form_schema/event";
import React, { useState } from "react";
import EventAccordion from "../shared/components/event-accordion";
import { Separator } from "@/components/ui/separator";
import EventForm from "../shared/components/event-form";
import CustomButton from "@/components/ui/button/CustomButton";
import { PlusIcon } from "@/icons/components";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface props {
  tournamentId: string;
  defaultValues: IStepThreeData;
  onSubmit: (data: IStepThreeData) => void;
  prevStep: () => void;
}

export interface IStepThreeData {
  events: TournamentEvent[];
}

function Events({ tournamentId, defaultValues, onSubmit, prevStep }: props) {
  const [event, setEvent] = useState<TournamentEvent>({
    event: "",
    ageGroup: "",
    type: "",
    level: "",
    prize: "",
    registrationFee: 0,
  });
  const [events, setEvents] = useState<TournamentEvent[]>(defaultValues.events);
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const onEditEvent = (event: TournamentEvent) => {
    console.log("edit Event: ", event);
    setIsEdit(true);
    setEvent(event);
  };

  const onDeleteEvent = async (id: number) => {
    try {
      const updatedEvents = events?.filter((cat) => cat.id !== id);
      setEvents(updatedEvents || []);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleSave = () => {
    if(events.length === 0) {
      toast.warning("Please add at least one event.");
      return;
    }

    onSubmit({
      events: events,
    });
  };

  return (
    <>
      <section
        className={`flex-1 space-y-4 overflow-y-auto h-fit pr-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
      >
        <div className="flex items-center gap-4">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Events
          </h4>
          <CustomButton
            startIcon={<PlusIcon />}
            size="sm"
            onClick={() => setShowForm(true)}
          >
            {isEdit ? "Edit" : "Create"} Event
          </CustomButton>
        </div>
        <section className={`${showForm ? "" : "hidden"} `}>
          <EventForm
            tournamentId={tournamentId}
            event={event}
            setEvent={setEvent}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setShowForm={setShowForm}
            previewList={events}
            setPreviewList={setEvents}
          />
        </section>

        <div>
          <Separator />
          <EventAccordion
            events={events}
            onEditEvent={onEditEvent}
            onDeleteEvent={onDeleteEvent}
          />
        </div>
      </section>
      <section className="flex justify-end items-center gap-2 py-8">
        <Button
          type="button"
          variant={"tailAdminSecondary"}
          className="w-24"
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button type="button" variant="tailAdminPrimary" onClick={handleSave}>
          Continue
        </Button>
      </section>
    </>
  );
}

export default Events;
