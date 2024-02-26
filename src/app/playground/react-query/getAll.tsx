"use client";
import { useAllPosts } from "@/hooks/example";

const GetAll = () => {
  const { data: postData } = useAllPosts();

  return (
    <ul className="px-8 space-y-2">
      {postData?.data.map((todo: any) => (
        <li key={todo.id} className="list-decimal">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default GetAll;
