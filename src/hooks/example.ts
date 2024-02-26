"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import exampleService from "@/app/service/test/example";

const queryKey = "posts";
const queryLimit = 10;

const useAllPosts = () => {
  return useQuery({
    queryKey: [queryKey, queryLimit],
    queryFn: () => exampleService.getAllPosts(),
  });
};

const usePostById = () => {
  return useQuery({
    queryKey: [queryKey, queryLimit],
    queryFn: () => exampleService.getByPostId(),
  });
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: exampleService.addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: exampleService.updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: exampleService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
};

export {
  useAllPosts,
  useCreatePost,
  useDeletePost,
  usePostById,
  useUpdatePost,
};
