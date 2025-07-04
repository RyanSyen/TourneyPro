import { headers } from "next/headers";
import { auth } from "../../auth";
import { cache } from "react";
import { getUserById } from "@/repository/user/queries";

// nextjs best practices
/*
- A DAL can be used to protect data fetched at request time. However, for static routes that share data between users,
data will be fetched at build time and not at request time. Use Middleware to protect static routes.

- For secure checks, you can check if the session is valid by comparing the session ID with your database.
Use React's cache function to avoid unnecessary duplicate requests to the database during a render pass.

- You may wish to consolidate related data requests in a JavaScript class that runs verifySession() before any methods.
*/

export const requireAuthUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;

  if (!userId) {
    throw new Error("User ID not found in session");
  }

  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
});
