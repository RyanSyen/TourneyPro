"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCreatePost } from "@/hooks/example";

const Post = () => {
  const { mutate: addMutate, isError, isPending, isIdle } = useCreatePost();
  const [postData, setPostData] = useState();

  const test = () => {
    console.log("test");
  };

  const handleSubmit = async () => {
    addMutate(test(), {
      onSuccess: (response) => {
        setPostData(response.data.body);
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
      <h1>Create New Post</h1>

      <Button
        onClick={() => {
          handleSubmit();
        }}
      >
        Add Post
      </Button>

      <h2>Newly Created Data</h2>
      <div>{postData}</div>
    </div>
  );
};

export default Post;
