import React from "react";
import { getAllUsers, User } from "@/lib/dal/userDAL";
import UserCard from "./UserCard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export const dynamic = "force-dynamic";
export default async function Home() {
  const users: User[] = await getAllUsers();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8 items-center p-4 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
