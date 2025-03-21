// import Link from "next/link";
import { auth } from "@/server/auth";
// import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      {session?.user.name}
      <br />
      {session?.user.email}
    </div>
  );
}
