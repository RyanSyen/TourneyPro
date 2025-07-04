import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { userSelect } from "./types/selects";
import { handlePrismaError } from "../handle-prisma-error";

type UserPreview = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;

export async function getUserById(id: string): Promise<UserPreview | null> {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });
  } catch (error) {
    console.error(`getUserById ${id} error: ${error}`);
    handlePrismaError(error);
  }
}
