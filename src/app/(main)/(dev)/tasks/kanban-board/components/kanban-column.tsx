"use client"

import { Droppable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { IInitialTask } from "@/types/initialTask"
import { MoreHorizontalIcon, PlusIcon } from "@/icons/components"
import { KanbanCard } from "./kanban-card"

interface KanbanColumnProps {
  id: string
  title: string
  color: string
  tasks: IInitialTask[]
}

export function KanbanColumn({ id, title, color, tasks }: KanbanColumnProps) {
  return (
    <div className="flex h-full min-w-[280px] flex-col rounded-lg bg-muted/50">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${color}`} />
          <h3 className="font-medium">{title}</h3>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{tasks.length}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </div>

      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="flex-1 overflow-y-auto p-2">
            {tasks.map((task, index) => (
              <KanbanCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="p-2">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add issue
        </Button>
      </div>
    </div>
  )
}

