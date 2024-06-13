"use client";

import { PlusCircle, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ITournamentDetails } from "@/app/tournament/(builder)/create/detailsForm";
import {
  Timeline,
  TimelineDescription,
  TimelineIcon,
  TimelineItem,
  TimelineTitle,
} from "@/components/common/timeline";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableRow } from "@/components/ui/table";
import { capitalizeFirstLetter } from "@/helper/common";
import { tournamentStatusLookup } from "@/lookups/tournament/statusLookup";

const Overview = ({
  tournamentData,
}: {
  tournamentData: { message: ITournamentDetails };
}) => {
  const [selectedStatus, setSelectedStatus] = useState(
    tournamentStatusLookup[0].title
  );
  const tournament = tournamentData.message;
  const status = tournamentStatusLookup.find((t) => t.id === tournament.status);
  console.log("tournament.status: ", tournament.status);

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
        <div className="relative w-100 ">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={tournament.thumbnail}
              fill
              alt="tournament thumbnail"
              style={{ objectFit: "cover" }}
              className="rounded-xl"
            />
          </AspectRatio>
        </div>

        <Card>
          <CardHeader className="space-y-0">
            <CardTitle className="scroll-m-20  text-xl font-semibold tracking-tight first:mt-0">
              {capitalizeFirstLetter(tournament.title)}
            </CardTitle>
            <CardDescription className="border-b pb-2 m-0">
              {tournament.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="scroll-m-20 text-lg font-medium tracking-tight">
                Tournament Setup
              </div>
              <Badge variant="secondary" className="!text-slate-400">
                Not Completed
              </Badge>
            </div>
            {/* <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  className="w-full"
                  defaultValue="Gamer Gear Pro Controller"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="status">Status</Label>
                <Select
                  defaultValue={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger id="status" aria-label="Select status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {tournamentStatusLookup.map((status) => {
                      return (
                        <SelectItem key={status.id} value={status.title}>
                          <Image
                            src={`/images/tournament/status/${status.icon}.svg`}
                            width={16}
                            height={16}
                            alt={`${status.icon} icon`}
                            color="#fcfcfc"
                          />
                          {status.title}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div> */}
            <div className="flex items-center gap-2">
              <Image
                src={`/images/tournament/status/${status?.icon}.svg`}
                width={16}
                height={16}
                alt={`${status?.icon} icon`}
              />
              {status?.title}
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 relative">
              <Timeline>
                {tournamentStatusLookup
                  .filter((t) => t.id != 0)
                  .map((t) => {
                    return (
                      <TimelineItem key={t.id}>
                        <TimelineIcon>
                          <Image
                            src={`/images/tournament/status/${t.icon}.svg`}
                            alt={`tournament status icon: ${t.title}`}
                            width={18}
                            height={18}
                          />
                        </TimelineIcon>
                        <TimelineTitle
                          className={`${
                            status?.id == t.id
                              ? "text-[#fcfcfc] flex gap-2"
                              : "text-gray-400"
                          }`}
                        >
                          {t.title}
                          {status?.id == t.id && (
                            <Image
                              src={`/images/tournament/status/circle-check.svg`}
                              alt={`tournament status icon: ${t.title}`}
                              width={18}
                              height={18}
                              style={{ width: "auto", height: "auto" }}
                            />
                          )}
                        </TimelineTitle>
                        {/* <TimelineDescription>{t.title}</TimelineDescription> */}
                        <div className="absolute top-0 bg-[#e05] w-100 h-100"></div>
                      </TimelineItem>
                    );
                  })}
              </Timeline>
            </div>
          </CardContent>
        </Card>
        {/* <Card x-chunk="dashboard-07-chunk-5">
          <CardHeader>
            <CardTitle>Archive Product</CardTitle>
            <CardDescription>
              Lipsum dolor sit amet, consectetur adipiscing elit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div></div>
            <Button size="sm" variant="secondary">
              Archive Product
            </Button>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default Overview;
