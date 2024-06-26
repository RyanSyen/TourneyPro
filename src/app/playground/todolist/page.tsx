"use client";

import {
  collection,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useClickAway } from "react-use";

import CustomBounceLoader from "@/components/spinner/customBounceLoader";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";

import { Task } from "./data/schema";
import { columns } from "./datatable/columns";
import { DataTable } from "./datatable/datatable";
import TaskDialog from "./taskDialog";
import { TaskProvider } from "./taskProvider";
import { addTodo, updateTodo } from "./todoService";
import useTodoInput from "./useTodoInput";

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface TodoList {
  // list?: [];
  list: QueryDocumentSnapshot<DocumentData, DocumentData>[] | undefined;
}

// interface Todo {
//   todo: QueryDocumentSnapshot<DocumentData, DocumentData>;
// }

const TodoForm = () => {
  const [text, setText] = useState("");
  const router = useRouter();
  const pathName = usePathname();

  const handleSubmit = async () => {
    // const newTodo = await addTodo(text);
    // console.log(newTodo);

    setText("");
    router.replace(pathName);
  };

  return (
    <form className="flex gap-4">
      <input
        type="text"
        placeholder="Add new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="outline-none p-1.5 rounded-md"
      />
      <button type="button" onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
};

const TodoList = (props: TodoList) => {
  return (
    <ul className="flex flex-col gap-4">
      {props.list?.map(
        (todo: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          const todoObj: Todo = {
            id: todo.id,
            text: todo.data().text,
            isCompleted: todo.data().isCompleted,
          };
          return <TodoItem key={todo.id} todo={todoObj} />;
        }
      )}
    </ul>
  );
};

const TodoItem = ({ todo }: { todo: Todo }) => {
  const { task, isCompleted, onChangeTask, onChangeIsCompleted } =
    useTodoInput(todo);
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickAway(inputRef, async (event: Event) => {
    const targetInput = event.target as HTMLInputElement;
    setIsEdit(false);

    // update todo
    // console.log("todo id: ", todo);
    const task = inputRef.current!.value;
    const res = await updateTodo(todo.id, task);
  });

  const onEditTask = () => {
    if (!isEdit) setIsEdit(true);
  };

  return (
    <li className="flex gap-3 items-center">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={onChangeIsCompleted}
      />
      <input
        ref={inputRef}
        type={isEdit ? "text" : "button"}
        className={`max-w-sm text-wrap text-left ${
          !isEdit ? "cursor-pointer" : ""
        }`}
        value={task}
        onClick={onEditTask}
        onChange={onChangeTask}
        data-input="taskInput"
      />
    </li>
  );
};

const Todo = () => {
  const [value, loading, error] = useCollection(collection(db, "todo"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (loading) return <CustomBounceLoader />;

  if (value) {
    console.log(value?.docs);
    const tasks: Task[] = value.docs.map((doc) => {
      return {
        id: `TASK-${doc.data().id}`,
        title: doc.data().title,
        label: doc.data().label,
        priority: doc.data().priority,
        status: doc.data().status,
      };
    });

    return (
      <TaskProvider>
        <main className="flex flex-col gap-8">
          {/* <TodoForm />
        <TodoList list={value?.docs} /> */}
          <div className="h-full flex flex-1 flex-col space-y-8 p-8 ">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Development Tasks
              </h2>
              <TaskDialog />
            </div>

            <DataTable data={tasks} columns={columns} />
          </div>
        </main>
      </TaskProvider>
    );
  }
};

export default Todo;
