import { auth } from "@/auth";
import { redirect } from "next/navigation";
export async function getServerSideProps() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return session;
}
