"use client";
import React from "react";
import { User } from "@/lib/dal/userDAL";

export default function UserCard({ user }: { user: User }) {
  const [expanded, setExpanded] = React.useState(false);
  // Helper to format date fields
  const formatDate = (value: unknown, type: "date" | "dob" = "date"): string => {
    if (typeof value === "string" || (typeof value === "object" && value instanceof Date)) {
      try {
        const d = new Date(value as string | Date);
        if (isNaN(d.getTime())) {
          return value ? String(value) : "";
        }
        if (type === "date") {
          return d.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "2-digit" });
        }
        if (type === "dob") {
          return d.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
        }
      } catch (e) {
        return value ? String(value) : "";
      }
    }
    return value ? String(value) : "";
  };
  const safeString = (value: unknown): string => (value ? String(value) : "");
  const isNonEmpty = (value: unknown): boolean => typeof value === "string" ? value.trim() !== "" : !!value;

  // Overlay for expanded mode
  const overlay = expanded ? (
    <div className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300" aria-hidden="true" />
  ) : null;

  return (
    <>
      {overlay}
      <div
        className={`bg-white rounded-xl shadow p-8 sm:p-10 transition-all duration-500 cursor-pointer border border-gray-200
          ${expanded ?
            "fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 scale-105" :
            "relative w-full max-w-md mx-auto my-4 hover:shadow-lg hover:scale-[1.02]"}
        `}
        style={{
          fontSize: expanded ? "1.15rem" : "1rem",
          boxShadow: expanded ? "0 8px 40px 0 rgba(0,0,0,0.18)" : undefined,
        }}
        onClick={() => setExpanded((e) => !e)}
        tabIndex={0}
        aria-expanded={expanded}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-bold text-2xl sm:text-2xl text-gray-900 tracking-tight">
              {user.firstname} {user.middlename || ""} {user.lastname || ""}
            </div>
            <div className="text-gray-500 text-xs ml-2 whitespace-nowrap font-mono font-semibold">
              ID: {user.id}
            </div>
          </div>
          <div className="text-gray-700 text-base">City: {user.city}</div>
          {isNonEmpty(user.area) && (
            <div className="text-gray-700 text-base">Area: {safeString(user.area)}</div>
          )}
        </div>
        {expanded && (
          <div className="mt-8 flex flex-col gap-4 text-lg text-gray-800">
            {isNonEmpty(user.create_date) && (
              <div>
                <span className="font-semibold">Date:</span> {formatDate(user.create_date, "date")}
              </div>
            )}
            {isNonEmpty(user.dob) && (
              <div>
                <span className="font-semibold">DOB:</span> {formatDate(user.dob, "dob")}
              </div>
            )}
            {isNonEmpty(user.state) && (
              <div>
                <span className="font-semibold">State:</span> {safeString(user.state)}
              </div>
            )}
            {isNonEmpty(user.address) && (
              <div>
                <span className="font-semibold">Address:</span> {safeString(user.address)}
              </div>
            )}
            {isNonEmpty(user.contactno) && (
              <div>
                <span className="font-semibold">Contact:</span> {safeString(user.contactno)}
              </div>
            )}
            {isNonEmpty(user.reference) && (
              <div>
                <span className="font-semibold">Reference:</span> {safeString(user.reference)}
              </div>
            )}
            {isNonEmpty(user.author) && (
              <div>
                <span className="font-semibold">Author:</span> {safeString(user.author)}
              </div>
            )}
            {isNonEmpty(user.request) && (
              <div>
                <span className="font-semibold">Request:</span> {safeString(user.request)}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
