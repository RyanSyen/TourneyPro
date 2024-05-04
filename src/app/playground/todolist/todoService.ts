import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { z } from "zod";

import { db } from "@/lib/firebase";

import { Task } from "./data/schema";
import { todoSchema } from "./taskForm";

const COLLECTION = "todo";

const addTodo = async (data: z.infer<typeof todoSchema>, id?: string) => {
  console.log("task id: ", id);
  const lastTaskId = await getLastTaskId();
  console.log("lastTaskId: ", lastTaskId);
  const taskId =
    id == null || id == undefined
      ? parseInt(lastTaskId) + 1
      : id.replace(/^TASK-/i, "");

  const todoRef = doc(db, COLLECTION, taskId.toString());

  const parsed = todoSchema.safeParse(data);

  if (!parsed.success) throw new Error("Invalid form data");

  return setDoc(todoRef, {
    id: taskId.toString(),
    title: data.title,
    label: data.label,
    priority: data.priority,
    status: data.status,
    lastUpdated: serverTimestamp(),
  });
};

const updateTodo = (id: string, task: string) => {
  console.log(`update todo where id: ${id} and task ${task}`);
  try {
    const todoRef = doc(db, COLLECTION, id);

    return updateDoc(todoRef, {
      text: task,
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error("Err msg: ", error);
  }
};

const updateIsCompleted = (taskId: string) => {
  const id = taskId.replace(/^TASK-/i, "");
  const todoRef = doc(db, COLLECTION, id);

  return updateDoc(todoRef, {
    status: "done",
    lastUpdated: serverTimestamp(),
  });
};

const getLastTaskId = async () => {
  const todoRef = collection(db, COLLECTION);
  const q = query(todoRef, orderBy("id", "desc"));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return 0;
  }

  const lastTaskId = querySnapshot.docs[0].data().id;

  return lastTaskId;
};

export { addTodo, getLastTaskId, updateIsCompleted, updateTodo };
