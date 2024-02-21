"use client";

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

import {
  addTodo,
  deleteTodo,
  fetchTodos,
} from "@/controller/(playground)/todoController";

import useTodoList from "./useTodoList";

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
  const { addTodoList } = useTodoList();

  const handleSubmit = async () => {
    // const newTodo = await addTodo(text);
    const newTodo = await addTodoList(text);
    console.log(newTodo);

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
        className="text-black p-1.5 rounded-md"
      />
      <button type="button" onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
};

const TodoList = (props: TodoList) => {
  return (
    <ul>
      {/* {props.list?.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          isCompleted={todo.isCompleted}
        />
      ))} */}
      {/* {props.list?.map(
        (todo: QueryDocumentSnapshot<DocumentData, DocumentData>) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            isCompleted={todo.isCompleted}
          />
        )
      )} */}
      {props.list?.map(
        (todo: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          console.log(todo.data);
          return <div key={todo.id}>test</div>;
        }
      )}
    </ul>
  );
};

const TodoItem = (props: Todo) => {
  const onToggleCompleteTodo = () => {
    console.log(!props.isCompleted);
  };

  const onDeleteTodo = async (id: string) => {
    // const res = await deleteTodo(id);
    // console.log("delete todo: ", res);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={props.isCompleted}
        onChange={onToggleCompleteTodo}
      />
      <span
        className={`${props.isCompleted ? "line-through" : "no-underline"}`}
      >
        {props.text}
      </span>
      <button onClick={() => onDeleteTodo(props.id)}>🗑️</button>
    </li>
  );
};

const Todo = () => {
  // const [list, setList] = useState();
  const { value, loading, error } = useTodoList();

  // useEffect(() => {
  //   async function initFetchTodos() {
  //     // const todos = await fetchTodos();
  //     const todos =

  //     console.log(todos);

  //     setList(todos.lists);
  //   }

  //   initFetchTodos();
  // }, []);

  return (
    <main>
      <TodoForm />
      <TodoList list={value?.docs} />
      <Image
        src={"/login.svg"}
        alt="login sports background"
        width={256}
        height={256}
      />
    </main>
  );
};

export default Todo;
