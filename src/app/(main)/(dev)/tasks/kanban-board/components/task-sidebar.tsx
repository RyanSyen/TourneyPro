import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ClockIcon,
  FlagIcon,
  TagIcon,
  UserIcon,
} from "@/icons/components";
import { IInitialTask } from "@/types/initialTask";
import { format } from "date-fns";
import { PriorityBadge, PriorityType } from "./custom-priority-badge";

export default function TicketSidebar({ task }: { task: IInitialTask }) {
  return (
    <div className="space-y-6 text-sm">
      <div>
        <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">
          Details
        </h3>
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <UserIcon className="h-4 w-4" />
              <span>Assignee</span>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                {/* <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" /> */}
                <AvatarFallback>Dev</AvatarFallback>
              </Avatar>
              <span>Dev</span>
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <UserIcon className="h-4 w-4" />
              <span>Reporter</span>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                {/* <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" /> */}
                <AvatarFallback>Dev</AvatarFallback>
              </Avatar>
              <span>Dev</span>
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FlagIcon className="h-4 w-4" />
              <span>Priority</span>
            </div>
            <PriorityBadge
              priority={task.priority as PriorityType}
              variant="dot"
              showLabel={true}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">
          Dates
        </h3>
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>Created</span>
            </div>
            <span>{format(task.createdAt!, "dd/LL/y")}</span>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>Updated</span>
            </div>
            <span>{format(task.updatedAt!, "dd/LL/y")}</span>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>Due date</span>
            </div>
            <span>{format(task.dueDate!, "dd/LL/y")}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">
          Time tracking
        </h3>
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ClockIcon className="h-4 w-4" />
              <span>Time spent</span>
            </div>
            <span>4h 30m</span>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ClockIcon className="h-4 w-4" />
              <span>Time remaining</span>
            </div>
            <span>7h 30m</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: "38%" }}
            ></div>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">
          Labels
        </h3>
        <div className="flex flex-wrap gap-2">
          {task.labels.map((label) => (
            <div
              key={label}
              className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
            >
              <TagIcon className="h-3 w-3" />
              <span>{label}</span>
            </div>
          ))}
          {/* <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
            <TagIcon className="h-3 w-3" />
            <span>Frontend</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800">
            <TagIcon className="h-3 w-3" />
            <span>UI/UX</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
            <TagIcon className="h-3 w-3" />
            <span>Responsive</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
