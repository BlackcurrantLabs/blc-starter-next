"use client";

import { use, useCallback, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getUserAction } from "./get-user.action";
import { createUserAction } from "./create-user.action";
import { useRouter } from "next/navigation";
import { UserSchema } from "@/database/zod/schemas/models";
import { updateUserAction } from "./update-user.action";
import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";

export const formSchema = UserSchema.omit({
  emailVerified: true,
  createdAt: true,
  updatedAt: true,
  married: true,
  phoneVerified: true,
}).extend({
  id: z.string().optional(),
  email: z.email().max(50),
  name: z.string().nonempty(),
  role: z.enum(["user", "admin"]),
});

export default function UserDetails({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const [mode, setMode] = useState<"ADD" | "EDIT">("ADD");
  const [banned, setBanned] = useState<boolean>(false);
  const router = useRouter();

  useMemo(() => {
    if (userId === "new") setMode("ADD");
    else setMode("EDIT");
  }, [userId]);

  const userForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      role: "user",
    },
  });

  useEffect(() => {
    if (userId !== "new") {
      const getUser = async () => {
        const user = await getUserAction(userId);
        userForm.reset({
          ...user,
          role: (user!.role as "admin" | "user" | null) ?? "user",
        });
        setBanned(user?.banned ?? false);
        console.log(user?.role);
      };
      getUser();
    }
  }, [userId]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(mode)
    try {
      if (mode === "ADD") {
        console.log("Adding user", values)
        const newUser = await createUserAction(values);
        router.replace(`/admin/user-details/${newUser.id}`, {
          scroll: false,
        });
      } else if (mode === "EDIT") {
        const updatedUser = await updateUserAction(values);
        userForm.reset({
          ...updatedUser,
          role: (updatedUser.role as "user" | "admin" | null) ?? undefined,
        });
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const toggleBan = useCallback(async () => {
    if (banned) {
      await authClient.admin.unbanUser({
        userId: userId,
      });
      setBanned(false);
    } else {
      await authClient.admin.banUser({
        userId: userId,
      });
      setBanned(true);
    }
  }, [banned]);

  return (
    <Form {...userForm}>
      {/* Action Strip */}
      {mode === "EDIT" && (
        <>
          <Badge>Banned: {JSON.stringify(banned)}</Badge>
          &nbsp;&nbsp;
          {banned && (
            <Button onClick={toggleBan} variant={"secondary"}>
              Unban
            </Button>
          )}
          {!banned && (
            <Button onClick={toggleBan} variant={"destructive"}>
              Ban
            </Button>
          )}
        </>
      )}
      <form
        onSubmit={userForm.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <h1 className="text-4xl">{mode.toLowerCase()} user</h1>
        <pre className="text-sm">{JSON.stringify(userForm.formState.errors, null, 2)}</pre>

        <FormField
          control={userForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" type="text" {...field} />
              </FormControl>
              <FormDescription>User Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={userForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="user@example.com"
                  readOnly={mode === "EDIT"}
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>User Email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={userForm.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                value={field.value ?? "user"}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="user">user</SelectItem>
                  <SelectItem value="admin">admin</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Assigned Role</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={userForm.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input
                  placeholder="Acme Inc"
                  type="text"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>User's company</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {mode === "ADD" ? "Create User" : "Update User"}
        </Button>
      </form>
    </Form>
  );
}
