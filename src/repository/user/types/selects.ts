import { Prisma } from "@prisma/client";

export const userSelect = {
  id: true,
  email: true,
  name: true,
  createdAt: true,
  emailVerified: true,
  image: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;
