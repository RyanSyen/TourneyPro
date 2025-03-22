export const issueTypes = [
  { value: "task", label: "Task", icon: "🔵" },
  { value: "development", label: "Development", icon: "🟢" },
  { value: "bug", label: "Bug", icon: "🔴" },
  { value: "enhancement", label: "Enhancement", icon: "🟣" },
];

export const priorities = [
  { value: "high", label: "High", icon: ">>>" },
  { value: "medium", label: "Medium", icon: ">>" },
  { value: "low", label: "Low", icon: ">" },
];

export const issueStatus = [
  {value: 'todo', label: "To Do"},
  {value: 'in-progress', label: "To Do"},
  {value: 'done', label: "To Do"},
]

export const issueStatusColumn = [
  {id: 'todo', label: "To Do", color: "bg-blue-500"},
  {id: 'inprogress', label: "In Progress", color: "bg-yellow-500"},
  {id: 'done', label: "Done", color: "bg-green-500"},
]

export const users = [
  {
    value: "alex",
    label: "Alex Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    value: "sarah",
    label: "Sarah Miller",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    value: "john",
    label: "John Doe",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    value: "emily",
    label: "Emily Chen",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    value: "michael",
    label: "Michael Brown",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export const projects = [
  { value: "FE", label: "Frontend Project" },
  { value: "BE", label: "Backend API" },
  { value: "MOB", label: "Mobile App" },
];

export const suggestedLabels = [
  "frontend",
  "backend",
  "api",
  "ui",
  "ux",
  "documentation",
  "testing",
  "performance",
  "security",
  "research",
];
