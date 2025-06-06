import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TournamentEvent } from "@/form_schema/event";
import { v4 as uuidv4 } from "uuid";


interface Props {
  events: TournamentEvent[];
  onEditEvent: React.Dispatch<TournamentEvent>;
  onDeleteEvent: React.Dispatch<number>;
}

function EventAccordion({ events, onEditEvent, onDeleteEvent }: Props) {
  // Use ID or fallback to event name+type+level for unique value
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const allKeys = events.map(
    (evt) => `${evt.id ?? `${evt.event}-${evt.type}-${evt.level}`}`
  );

  const toggleExpandAll = () => {
    if (expandedItems.length === events.length) {
      setExpandedItems([]); // collapse all
    } else {
      setExpandedItems(allKeys); // expand all
    }
  };

  return (
    <div className="w-full space-y-4 py-4">
      <div className="flex justify-end">
        <Button
          variant="tailAdminSecondary"
          className="w-32"
          onClick={toggleExpandAll}
          disabled={events.length === 0}
        >
          {expandedItems.length === events.length ? "Collapse All" : "Expand All"}
        </Button>
      </div>

      <Accordion
        type="multiple"
        value={expandedItems}
        onValueChange={setExpandedItems}
        className="flex flex-col gap-4 w-full"
      >
        {events.map((evt) => {
          const key = `${evt.id ?? `${evt.event}-${evt.type}-${evt.level}`}`;
          return (
            <AccordionItem
              key={uuidv4()}
              value={key}
              className="border rounded-lg border-slate-700"
            >
              <AccordionTrigger className="bg-slate-700 rounded-md px-4 !no-underline">
                {`${evt.event} | ${evt.type} | ${evt.level}`}
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 flex-wrap grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
                  <div className="grid gap-2">
                    <Label>Event</Label>
                    <Input readOnly value={evt.event} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Type</Label>
                    <Input readOnly value={evt.type} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Age Group</Label>
                    <Input readOnly value={evt.ageGroup} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Level</Label>
                    <Input readOnly value={evt.level} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Prize</Label>
                    <Input readOnly value={evt.prize || "No Prize"} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Registration Fee</Label>
                    <Input readOnly value={evt.registrationFee} />
                  </div>
                </div>
                <div className="flex justify-end gap-2 px-4 py-2">
                  <Button variant={"tailAdminSecondary"} onClick={() => onEditEvent(evt)}>
                    Edit
                  </Button>
                  <Button variant={"destructive"} onClick={() => onDeleteEvent(evt.id!)}>
                    Delete
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default EventAccordion;
