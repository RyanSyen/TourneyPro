"use client";

import { useState } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { Input } from "@/components/ui/input";
import { InitialTask } from "@/types/initialTask";
import { SearchIcon } from "@/icons/components";
import { KanbanColumn } from "./kanban-column";
import CreateIssueModal from "./create-issue";
import { issueStatusColumn } from "@/lookups/kanban-board/kanbanBoardLookup";
import FilterIssueModal from "./filter";

const initialTasks: InitialTask[] = [
  {
    id: "task-1",
    summary: "Implement authentication flow",
    description: "Create login, signup, and password reset screens",
    status: "todo",
    priority: "high",
    issueType: "task",
    labels: ["documentation"],
    dueDate: "Mar 25",
    attachments: [1, 1],
  },
  {
    id: "task-2",
    summary: "Design system components",
    description: "Create reusable UI components for the design system",
    status: "inprogress",
    priority: "medium",
    issueType: "task",
    labels: ["documentation"],
    dueDate: "Mar 28",
    attachments: [1, 1],
  },
  {
    id: "task-3",
    summary: "Fix navigation bug on mobile",
    description: "Menu doesn't close after selection on mobile devices",
    status: "done",
    priority: "high",
    issueType: "bug",
    labels: ["documentation"],
    dueDate: "Mar 23",
    attachments: [1, 1],
  },
  {
    id: "task-4",
    summary: "Implement dark mode",
    description: "Add dark mode toggle and styles across the application",
    status: "done",
    priority: "medium",
    issueType: "development",
    labels: ["documentation"],
    dueDate: "Mar 20",
    attachments: [1, 1],
  },
  {
    id: "task-5",
    summary: "Performance optimization",
    description: "Improve loading times and reduce bundle size",
    status: "todo",
    priority: "medium",
    issueType: "task",
    labels: ["documentation"],
    dueDate: "Mar 30",
    attachments: [1, 1],
  },
  {
    id: "task-6",
    summary: "Add analytics tracking",
    description: "Implement event tracking for user interactions",
    status: "inprogress",
    priority: "low",
    issueType: "enhancement",
    labels: ["documentation"],
    dueDate: "Apr 2",
    attachments: [1, 1],
  },
  {
    id: "task-7",
    summary: "Refactor API service layer",
    description: "Improve error handling and response parsing",
    status: "done",
    priority: "medium",
    issueType: "enhancement",
    labels: ["documentation"],
    dueDate: "Mar 27",
    attachments: [1, 1],
  },
  {
    id: "task-8",
    summary: "User profile page",
    description: "Create user profile page with edit capabilities",
    status: "todo",
    priority: "medium",
    issueType: "development",
    labels: ["documentation"],
    dueDate: "Apr 5",
    attachments: [1, 1],
  },
  {
    id: "task-9",
    summary: "Implement file upload",
    description: "Add drag and drop file upload with progress indicator",
    status: "inprogress",
    priority: "high",
    issueType: "task",
    labels: ["documentation"],
    dueDate: "Mar 29",
    attachments: [1, 1],
  },
  {
    id: "task-10",
    summary: "Fix accessibility issues",
    description: "Address WCAG compliance issues across the app",
    status: "todo",
    priority: "high",
    issueType: "bug",
    labels: ["documentation"],
    dueDate: "Apr 1",
    attachments: [1, 1],
  },
  {
    id: "task-11",
    summary: "Implement notification system",
    description: "Create in-app notification center with real-time updates",
    status: "todo",
    priority: "medium",
    issueType: "development",
    labels: ["documentation"],
    dueDate: "Apr 10",
    attachments: [1, 1],
  },
  {
    id: "task-12",
    summary: "Update documentation",
    description: "Update component library documentation with new examples",
    status: "done",
    priority: "low",
    issueType: "task",
    labels: ["documentation"],
    dueDate: "Mar 22",
    attachments: [1, 1],
  },
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState<InitialTask[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter(
    (task) =>
      task.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or if the item is dropped in the same place
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Find the task that was dragged
    const task = tasks.find((task) => task.id === draggableId);
    if (!task) return;

    // Create a new array without the dragged task
    const newTasks = tasks.filter((task) => task.id !== draggableId);

    // Create a new task with the updated status
    const updatedTask = { ...task, status: destination.droppableId };

    // Insert the updated task at the new position
    newTasks.splice(destination.index, 0, updatedTask);

    // Update the state
    setTasks(newTasks);
  };

  return (
    <div className="flex h-full flex-col p-4">
      <h1 className="text-xl font-semibold">Kanban Board</h1>
      <div className="my-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <Separator orientation="vertical" className="h-6" /> */}
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search issues"
              className="pl-8 w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FilterIssueModal />
          <CreateIssueModal />
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-x-auto pb-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          {issueStatusColumn.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.label}
              color={column.color}
              tasks={filteredTasks.filter((task) => task.status === column.id)}
            />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
