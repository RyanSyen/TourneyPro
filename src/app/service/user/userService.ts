import { z } from "zod";

import formSchema from "@/components/auth/sign-up/formSchema";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`;

export const getUserByEmail = (email: string) => {
  try {
    console.log("email: ", email);
    const res = fetch(`${BASE_URL}/email/${email}`, {
      method: "GET",
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("data: ", data);
        return data;
      })
      .then((data) => console.log(data));
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const registerUser = (data: z.output<typeof formSchema>) => {
  try {
    const parsed = formSchema.safeParse(data);

    if (parsed.success) {
      fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          const data = await res.json();
          console.log("data: ", data);
          return data;
        })
        .then((data) => console.log(data));
    }

    return { message: "Invalid form data" };
  } catch (error) {
    console.error("Error: ", error);
  }
};
