"use server"

import z from 'zod';
import { auth } from "@/auth"
import { headers } from "next/headers"
import { formSchema } from './page';

export async function createUserAction(user: z.infer<typeof formSchema>) {
  const newUser = await auth.api.createUser({
    body: {
      name: user.name,
      email: user.email,
      password: crypto.randomUUID(),
      role: user.role as 'user' | 'admin' ?? 'user',
      data: {
        // company,
        ...user,
      }
    },
    headers: await headers(),
  })

  return newUser.user
}