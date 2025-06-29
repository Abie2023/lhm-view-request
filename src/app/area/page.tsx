import React from "react";
import { getAllUsers, User } from "@/lib/dal/userDAL";
import ExportRequest from "./ExportArea";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export const dynamic = "force-dynamic";
export default async function PartnersPage() {
  const users: User[] = await getAllUsers();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8 items-center p-4 sm:p-8">
          <div className="bg-white rounded shadow p-6 w-full">
            <h2 className="text-lg font-semibold mb-4">Areas</h2>
          </div>
          <div className="bg-white rounded shadow p-6 w-full">
            <h2 className="text-lg font-semibold mb-4">Export Data</h2>
            <ExportRequest users={users} />
          </div>
        </main>
      </div>
    </div>
  );
}
