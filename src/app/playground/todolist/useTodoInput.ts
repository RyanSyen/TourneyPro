import { useState } from "react";

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

const useTodoInput = (todo: Todo) => {
  const [task, setTask] = useState(todo.text);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const onChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const onChangeIsCompleted = () => setIsCompleted((prev) => !prev);

  return { task, onChangeTask, isCompleted, onChangeIsCompleted };
};

export default useTodoInput;
