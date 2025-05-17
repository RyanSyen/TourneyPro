import { Button } from "@/components/ui/button";
import { IStepOneData } from "../shared/components/tournament-details-form";
import { IStepThreeData } from "./tournament-events";
import { IStepTwoData } from "./tournament-rules";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface props {
  step1: IStepOneData;
  step2: IStepTwoData;
  step3: IStepThreeData;
  handleFinalSubmit: () => void;
  prevStep: () => void;
  isSubmitting?: boolean;
}

export default function TournamentPreview({
  step1,
  step2,
  step3,
  handleFinalSubmit,
  prevStep,
  isSubmitting,
}: props) {
  console.log("step3", step3);
  const allKeys = step3.events.map(
    (evt) => `${evt.event}-${evt.type}-${evt.level}-${evt.ageGroup}`
  );
  console.log("all keys", allKeys);
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tournament Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Title:</strong> {step1.title}
          </p>
          <p>
            <strong>Description:</strong> {step1.description}
          </p>
          <p>
            <strong>Venue:</strong> {step1.location}
          </p>
          <p>
            <strong>Registration Date:</strong>{" "}
            {format(step1.registrationDate.from, "LLL dd, y")} -{" "}
            {format(step1.registrationDate.to, "LLL dd, y")}
          </p>
          <p>
            <strong>Tournament Date:</strong>{" "}
            {format(step1.date.from, "LLL dd, y")} -{" "}
            {format(step1.date.to, "LLL dd, y")}
          </p>
          <p>
            <strong>Is Public:</strong> {step1.isPublic.toString()}
          </p>
          <p>
            <strong>Tournament Type:</strong> {step1.type}
          </p>
          <div className="relative w-[300px] h-[200px] bg-center border border-slate-400 rounded-md">
            <Image
              src={step1.thumbnail}
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
              className="rounded-md"
              alt="tournament thumbnail image"
              priority
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rules & Match Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Scoring System:</strong> {step2.matchSettings.points}
          </p>
          <p>
            <strong>Change of Ends:</strong> {step2.matchSettings.changeOfEnds}
          </p>
          <p>
            <strong>Grace Period:</strong> {step2.matchSettings.gracePeriod}
          </p>
          <p>
            <strong>Allow Spin Serve:</strong>{" "}
            {step2.matchSettings.allowSpinServe.toString()}
          </p>
          <p>
            <strong>Allow deuce:</strong>{" "}
            {step2.matchSettings.allowDeuce.toString()}
          </p>
          <p>
            <strong>Rules:</strong> {step2.rules}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Accordion type="multiple" className="flex flex-col gap-4 w-full">
            {step3.events.map((evt) => {
              const key = `${evt.event}-${evt.type}-${evt.level}-${evt.ageGroup}`;
              return (
                <AccordionItem
                  key={key}
                  value={key}
                  className="border rounded-lg border-slate-700"
                >
                  <AccordionTrigger className="bg-slate-700 rounded-md px-4 !no-underline">
                    {`${evt.event} | ${evt.type} | ${evt.level} | ${evt.ageGroup}`}
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
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
      <section className="flex justify-end items-center gap-2 py-8">
        <Button
          type="button"
          variant={"tailAdminSecondary"}
          className="w-24"
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="tailAdminPrimary"
          onClick={handleFinalSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Confirm & Create Tournament"}
        </Button>
      </section>
    </div>
  );
}
