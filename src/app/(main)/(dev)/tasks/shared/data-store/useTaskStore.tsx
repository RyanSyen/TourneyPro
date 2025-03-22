import { InitialTask } from "@/models/initialTask";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { IInitialTask } from "@/types/initialTask";

interface TaskStore {
  tasks: IInitialTask[];
  fetchTasks: () => Promise<IInitialTask[] | undefined>;
  fetchTask: (taskId: string) => Promise<IInitialTask | undefined>;
  addTask: (task: Omit<InitialTask, "id">) => Promise<void>;
  updateTask: (taskId: string, task: IInitialTask) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  fetchTasks: async () => {
    const res = await fetch("/api/task");
    const data = await res.json();
    set({ tasks: data });
    return data;
  },

  fetchTask: async (taskId: string) => {
    console.log("taskId: ", taskId);
    const res = await fetch(`/api/task/${taskId}`);
    const data = await res.json();
    return data;
  },

  addTask: async (task) => {
    const newTask = { id: uuidv4(), ...task };
    const res = await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    set((state) => ({
      tasks: [...state.tasks, data],
    }));
  },

  updateTask: async (taskId, updatedTask) => {
    await fetch(`/api/task/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({ taskId, updatedTask }),
      headers: { "Content-Type": "application/json" },
    });
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, ...updatedTask } : t
      ),
    }));
  },

  deleteTask: async (taskId) => {
    await fetch(`/api/task/${taskId}`, { method: "DELETE" });
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
    }));
  },
}));

export default useTaskStore;
