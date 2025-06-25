import React from "react";
import { getAllUsers, User } from "@/lib/dal/userDAL";
import ExportRequest from "./ExportRequest";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default async function PartnersPage() {
  const users: User[] = await getAllUsers();
  // Get latest 10 requests (assuming requests are sorted by create_date desc)
  const latestRequests = users
    .filter((u) => u.request)
    .sort(
      (a, b) =>
        new Date(String(b.create_date)).getTime() -
        new Date(String(a.create_date)).getTime()
    )
    .slice(0, 10);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8 items-center p-4 sm:p-8">
          <div className="bg-white rounded shadow p-6 w-full">
            <h2 className="text-lg font-semibold mb-4">Latest Requests</h2>
            <ul className="divide-y divide-gray-200">
              {latestRequests.map((u) => (
                <li key={u.id} className="py-2">
                  <span className="font-semibold">
                    {String(u.firstname || "")} {String(u.middlename || "")} {String(u.lastname || "")}
                  </span>{" "}
                  --{" "}
                  <span className="italic">{String(u.request)}</span>
                </li>
              ))}
            </ul>
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
