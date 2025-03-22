"use client";

import { useEffect, useState } from "react";
import { useMobile } from "@/hooks/useMobile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDownIcon,
  Link2Icon,
  PencilIcon,
} from "@/icons/components";
import { StatusBadge } from "./custom-status-badge";
import useTaskStore from "../../shared/data-store/useTaskStore";
import { redirect, useParams } from "next/navigation";
import { IInitialTask } from "@/types/initialTask";
import TicketSidebar from "./task-sidebar";

export default function Task() {
  const { fetchTask } = useTaskStore();
  const isMobile = useMobile();
  const params = useParams();
  const [task, setTask] = useState<IInitialTask | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTournament = async () => {
      try {
        setLoading(true);
        const task = await fetchTask(params.id!.toString());
        setTask(task);
      } catch (error) {
        console.error("Error fetching task:", error);
        // Handle error state if needed
      } finally {
        setLoading(false);
      }
    };

    loadTournament();
  }, [fetchTask, params.id]);

  if (!params.id) {
    redirect("/not-found");
  }

  const copyTaskLinkToClipboard = () => {
    // navigator.clipboard.writeText("/tasks/" + params.id);
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    navigator.clipboard.writeText(`${baseUrl}/tasks/${params.id}`);
  };

  if (loading) return <div>Loading...</div>;

  if (!task) return <div>Task not found</div>;

  console.log("isMobile: ", isMobile);

  return (
    <div
      className={`space-y-4 overflow-y-auto pr-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
    >
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold sm:text-2xl">
                {task.summary}
              </h1>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={copyTaskLinkToClipboard}
              >
                <Link2Icon className="h-4 w-4" />
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm">
              <PencilIcon className="h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              {/* <Badge className="bg-green-500 hover:bg-green-600">
                <CheckCircle2 className="mr-1 h-3 w-3" /> In Progress
              </Badge> */}
              <StatusBadge status="todo" variant={"glow"} />
              {/* <Button variant="ghost" size="sm" className="h-7 text-xs">
                <ArrowUp className="mr-1 h-3 w-3" />
                High
              </Button> */}
            </div>

            <Tabs defaultValue="details" className="mb-6">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2 text-sm font-medium">Description</h2>
                    <Card>
                      <CardContent className="p-4 text-sm">
                        {task.description}
                      </CardContent>
                    </Card>
                  </div>

                  {/* comments not ready  */}
                  {/* <TicketComments /> */}

                  {/* <div>
                    <h2 className="mb-2 text-sm font-medium">Add comment</h2>
                    <Card>
                      <CardContent className="p-4">
                        <Textarea
                          placeholder="Add a comment..."
                          className="mb-3 min-h-24 resize-none"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="flex items-center justify-between">
                          <Button variant="ghost" size="sm">
                            <Paperclip className="mr-1 h-4 w-4" />
                            Attach
                          </Button>
                          <Button size="sm" disabled={!comment.trim()}>
                            Save
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div> */}
                </div>
              </TabsContent>
              <TabsContent value="activity">To be developed</TabsContent>
            </Tabs>
          </div>

          {isMobile ? (
            <>
              <div>test</div>
              <div className="mb-6">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() =>
                    document
                      .getElementById("mobile-sidebar")
                      ?.classList.toggle("hidden")
                  }
                >
                  <span>Ticket Details</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
                <div id="mobile-sidebar" className="hidden mt-2">
                  <Card>
                    <CardContent className="p-4">
                      <TicketSidebar task={task} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <div>
              <Card>
                <CardContent className="p-4">
                  <TicketSidebar task={task} />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
