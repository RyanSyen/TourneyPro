import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

const COLLECTION = "todo";

const addTodo = (task: string) => {
  const todoRef = collection(db, COLLECTION);

  return addDoc(todoRef, {
    text: task,
    isCompleted: false,
    created: serverTimestamp(),
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

const updateIsCompleted = (id: string, isCompleted: boolean) => {
  const todoRef = doc(db, COLLECTION, id);

  return updateDoc(todoRef, {
    isCompleted: isCompleted,
    lastUpdated: serverTimestamp(),
  });
};

export { addTodo, updateIsCompleted, updateTodo };
