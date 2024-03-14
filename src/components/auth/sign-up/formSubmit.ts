"use server";

import formSchema from "./formSchema";

export type FormState = {
  message: string;
};

export async function onSubmitAction(data: FormData): Promise<FormState> {
  console.log("data in formsubmit: ", data);
  // converts FormData obj to js obj
  const formData = Object.fromEntries(data);
  console.log("form data: ", formData);
  const parsed = formSchema.safeParse(formData);
  console.log("parsed data: ", parsed);
  if (!parsed.success) {
    console.log("failed");
    // why no return this
    return { message: "Invalid form data" };
  }

  if (parsed.data.email.includes("a")) return { message: "Invalid email" };

  return { message: "User registered" };
}
