"use client";
import useTaskStore from "../shared/data-store/useTaskStore";
import { KanbanBoard } from "./components/kanban-board";
import { useEffect, useState } from "react";
import { IInitialTask } from "@/types/initialTask";

export default function KanbanBoardPage() {
  const { fetchTasks, updateTask } = useTaskStore();
  const [tasks, setTasks] = useState<IInitialTask[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMatchSettings = async () => {
      try {
        setLoading(true);
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        // Handle error state if needed
      } finally {
        setLoading(false);
      }
    };

    loadMatchSettings();
  }, [fetchTasks, setTasks]);

  if (loading) return <div>Loading...</div>;

  if (!tasks) return <div>No tasks available</div>;

  console.log("tasks: ", tasks);

  return (
    <div>
      <KanbanBoard tasks={tasks} setTasks={setTasks} updateTask={updateTask} />
    </div>
  );
}
