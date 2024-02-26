"use client";

import { useState } from "react";

import { useUpdatePost } from "@/hooks/example";

const Put = () => {
  const { mutate: editMutate, isIdle, isPending, isError } = useUpdatePost();
  const [postData, setPostData] = useState();

  const test = () => {
    console.log("test");
  };

  const handleSubmit = async () => {
    editMutate(test(), {
      onSuccess: (response) => {
        setPostData(response.data.body);
      },
    });
  };

  return (
    <div>
      <h1>Update an Existing Post</h1>

      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Update Post
      </button>

      <h2>Updated Data</h2>
      <div>{postData}</div>
    </div>
  );
};

export default Put;
