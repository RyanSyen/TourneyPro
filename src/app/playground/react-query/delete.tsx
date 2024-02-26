"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useDeletePost } from "@/hooks/example";

const Delete = () => {
  const { mutate: deleteMutate, isError, isPending, isIdle } = useDeletePost();
  const [postData, setPostData] = useState();

  const test = () => {
    console.log("test");
  };

  const handleSubmit = async () => {
    deleteMutate(test(), {
      onSuccess: (response) => {
        alert("Deleted Successfully!");
      },
    });
  };

  if (isPending) {
    console.log("post is pending");
  }

  if (isIdle) {
    console.log("post is idle");
  }

  return (
    <div>
      <h1>Deleting an Existing Post</h1>

      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Delete Post
      </button>
    </div>
  );
};

export default Delete;
