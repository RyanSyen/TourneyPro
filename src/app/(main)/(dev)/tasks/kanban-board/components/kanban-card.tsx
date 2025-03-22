"use client"

import { Draggable } from "@hello-pangea/dnd"
import { Badge } from "@/components/ui/badge"
import { InitialTask } from "@/types/initialTask"
import { ArrowUpRightIcon, CheckCircleIcon, ClockIcon, PaperClipIcon } from "@/icons/components"

interface KanbanCardProps {
  task: InitialTask
  index: number
}

export function KanbanCard({ task, index }: KanbanCardProps) {
  const priorityColors = {
    high: "text-red-500",
    medium: "text-yellow-500",
    low: "text-blue-500",
  }

  const typeIcons = {
    bug: (
      <Badge variant="error" background={"light"} className="h-5 px-1.5 text-xs">
        Bug
      </Badge>
    ),
    task: (
      <Badge variant="info" background={"light"} className="h-5 px-1.5 text-xs">
        Task
      </Badge>
    ),
    development: (
      <Badge variant="success" background={"light"} className="h-5 px-1.5 text-xs">
        Development
      </Badge>
    ),
    enhancement: (
      <Badge variant="epic" background={"light"} className="h-5 px-1.5 text-xs">
        Enhancement
      </Badge>
    ),
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2 rounded-md border bg-card p-3 shadow-sm"
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {typeIcons[task.issueType as keyof typeof typeIcons]}
            </div>
            <ArrowUpRightIcon className={`h-4 w-4 ${priorityColors[task.priority as keyof typeof priorityColors]}`} />
          </div>

          <h4 className="mb-2 font-medium">{task.summary}</h4>

          <div className="mb-3 text-sm text-muted-foreground">{task.description}</div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {task.status === "done" ? (
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="text-xs text-muted-foreground">{task.dueDate}</span>
            </div>

            <div className="flex items-center gap-2">
              {task.attachments.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <PaperClipIcon className="h-3.5 w-3.5" />
                  {task.attachments}
                </div>
              )}

              {/* {task.comments > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquareIcon className="h-3.5 w-3.5" />
                  {task.comments}
                </div>
              )} */}

              {/* <Avatar className="h-6 w-6">
                <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
              </Avatar> */}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

