"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const handleNav = () => setOpen(false);

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-20 w-full">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image
            src="/lasthope.jpg"
            alt="Logo"
            width={180}
            height={180}
            className="rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:scale-105 transition-transform"
            priority
          />
        </Link>
      </div>
      {/* Hamburger for mobile, far right */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 ml-auto"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        style={{ marginLeft: "auto" }}
      >
        <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-100 mb-1 rounded transition-all" />
        <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-100 mb-1 rounded transition-all" />
        <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-100 rounded transition-all" />
      </button>
      {/* Mobile menu overlay */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed top-0 right-0 w-50 h-full bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col p-8 gap-10 animate-slide-in-right">
            <button
              className="self-end mb-8 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
              style={{ position: "relative" }}
            >
              <span
                className="block w-5 h-0.5 bg-gray-800 dark:bg-gray-100 rotate-45 absolute left-0 top-2"
              />
              <span
                className="block w-5 h-0.5 bg-gray-800 dark:bg-gray-100 -rotate-45 absolute left-0 top-2"
              />
            </button>
            <Link
              href="/"
              className="text-lg font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              onClick={handleNav}
            >
              Home
            </Link>
            <Link
              href="/partners"
              className="text-lg font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              onClick={handleNav}
            >
              Partners
            </Link>
            <Link
              href="/request"
              className="text-lg font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              onClick={handleNav}
            >
              Request
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}
