"use server";

import z from "zod";
import prisma from "@/database/datasource";
import { formSchema } from "./page";

export async function updateUserAction(user: z.infer<typeof formSchema>) {
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    },
    omit: {
      createdAt: true,
    },
  });
  return updatedUser;
}
