"use server";

import { redirect } from "next/navigation";

export async function handleSignOut() {
  redirect("/"); // Redirect to the homepage after sign-out
}
