import { headers } from "next/headers";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { UserButton } from "@daveyplate/better-auth-ui";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return redirect("/");
  }

  // if (session?.user.role !== "user") {
  //   return redirect("/");
  // }

  return (
    <main>
      User layout
      <Link href="/">
        <Button>Go to homepage</Button>
      </Link>
      <UserButton></UserButton>
      {children}
    </main>
  );
}
