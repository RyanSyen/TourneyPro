import { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { handlePrismaError } from "../handle-prisma-error";

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  try {
    return await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error(`updateUser ${id} error: ${error}`);
    handlePrismaError(error);
  }
}
