import { useState } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/icons/components";
import { KanbanColumn } from "./kanban-column";
import CreateTaskModal from "./create-task";
import { issueStatusColumn } from "@/lookups/kanban-board/kanbanBoardLookup";
import { IInitialTask } from "@/types/initialTask";
import FilterTaskModal from "./filter-task";

interface props {
  tasks: IInitialTask[];
  setTasks: (tasks: IInitialTask[]) => void;
  updateTask: (taskId: string, task: IInitialTask) => void;
}

export function KanbanBoard({ tasks, setTasks, updateTask }: props) {
  // const [tasks, setTasks] = useState<IInitialTask[]>(initialTasks);
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
    const validStatuses = ["todo", "inprogress", "done"] as const;

    if (
      !validStatuses.includes(
        destination.droppableId as (typeof validStatuses)[number]
      )
    ) {
      throw new Error("Invalid status");
    }

    const updatedTask: IInitialTask = {
      ...task,
      status: destination.droppableId as (typeof validStatuses)[number],
    };
    updateTask(task.id!, updatedTask);

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
          <FilterTaskModal />
          <CreateTaskModal />
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-x-auto pb-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          {issueStatusColumn.map(
            (column: { id: string; label: string; color: string }) => (
              <KanbanColumn
                key={column.id}
                id={column.id}
                title={column.label}
                color={column.color}
                tasks={filteredTasks
                  .filter((task) => task.status === column.id)
                  .filter((task) => task.id !== undefined) as IInitialTask[]}
              />
            )
          )}
        </DragDropContext>
      </div>
    </div>
  );
}
