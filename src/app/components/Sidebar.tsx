"use client";
import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 gap-6 min-h-full shadow-sm">
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href="/"
            className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100 font-medium"
          >
            Home
          </Link>
          <Link
            href="/partners"
            className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100 font-medium"
          >
            Partners
          </Link>
          <Link
            href="/request"
            className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100 font-medium"
          >
            Request
          </Link>
          <Link
            href="/area"
            className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100 font-medium"
          >
            Area
          </Link>
        </nav>
      </aside>
    </>
  );
}
