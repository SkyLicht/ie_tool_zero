import { auth } from "@/auth";
import React from "react";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <p>You are not logged in!</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}!</h1>
      <p></p>
      <div className="grid grid-cols-7 w-full gap-4">
        <div className="col-span-1 bg-red-200">1</div>
        <div className="col-span-1 bg-blue-200">2</div>
        <div className="col-span-1 bg-green-200">3</div>
        <div className="col-span-1 bg-yellow-200">4</div>
        <div className="col-span-1 bg-purple-200">5</div>
      </div>
    </div>
  );
}
