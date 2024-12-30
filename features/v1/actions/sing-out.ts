"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/auth";

export async function handleSignOut() {
  redirect("/"); // Redirect to the homepage after sign-out
}
