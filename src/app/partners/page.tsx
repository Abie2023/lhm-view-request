import React from "react";
import { getAllUsers, User } from "@/lib/dal/userDAL";
import ExportSection from "./ExportSection";
import FindPartnersSection from "./FindPartnersSection";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default async function PartnersPage() {
  const users: User[] = await getAllUsers();
  // Calculate total partners
  const totalPartners = users.length;
  // Calculate total registrations in the latest week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const totalWeek = users.filter(u => u.create_date && new Date(String(u.create_date)) >= oneWeekAgo).length;

  // Prepare dropdown data
  const nameOptions = users.map(u => [u.firstname, u.middlename, u.lastname].filter(Boolean).join(" ")).filter(Boolean);
  const memberIdOptions = users.map(u => String(u.id));
  const cityCounts: Record<string, number> = {};
  users.forEach(u => {
    if (u.city) cityCounts[String(u.city)] = (cityCounts[String(u.city)] || 0) + 1;
  });
  const topCities = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([city]) => city);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8 items-center p-4 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 w-full">
            <div className="bg-white rounded shadow p-6 text-center">
              <div className="text-3xl font-bold text-blue-700">{totalPartners}</div>
              <div className="text-gray-600 mt-2">Total Partners</div>
            </div>
            <div className="bg-white rounded shadow p-6 text-center">
              <div className="text-3xl font-bold text-green-700">{totalWeek}</div>
              <div className="text-gray-600 mt-2">Registrations (Last 7 Days)</div>
            </div>
          </div>
          <FindPartnersSection users={users} nameOptions={nameOptions} memberIdOptions={memberIdOptions} cityOptions={topCities} />
          <div className="bg-white rounded shadow p-6 w-full">
            <h2 className="text-lg font-semibold mb-4">Export Data</h2>
            <ExportSection users={users} />
          </div>
        </main>
      </div>
    </div>
  );
}
