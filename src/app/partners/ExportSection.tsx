"use client";
import React from "react";
import jsPDF from "jspdf";
import { User } from "@/lib/dal/userDAL";

interface ExportSectionProps {
  users: User[];
}

export default function ExportSection({ users }: ExportSectionProps) {
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");

  // Filter users by month/year if both are selected
  const filtered = users.filter(u => {
    if (!u.create_date) return false;
    const d = new Date(String(u.create_date));
    if (month && year) {
      if (d.getMonth() + 1 !== Number(month)) return false;
      if (d.getFullYear() !== Number(year)) return false;
      return true;
    }
    return false;
  });

  const handleExport = () => {
    if (filtered.length === 0) {
      alert("No data to export.");
      return;
    }
    const doc = new jsPDF();
    doc.setFont("times", "");
    doc.setFontSize(12);
    doc.text("ShepherdView | Last Hope Ministries", 200, 10, { align: "right" });
    let y = 25;
    filtered.forEach((u, i) => {
      doc.text(`${i + 1}. Name: ${u.firstname || ""} ${u.middlename || ""} ${u.lastname || ""}     ID: ${u.id}`, 10, y);
      y += 7;
      doc.text(` City: ${u.city || "-"}    Contact: ${u.contactno}`, 10, y);
      y += 7;
      if (u.area || u.address) {
        doc.text(` Area: ${u.area || "-"}   Address: ${u.address || "-"}`, 10, y);
        y += 7;
      }
      y += 3;
      if (y > 270) { doc.addPage(); y = 20; doc.setFont("times", ""); doc.setFontSize(12); }
    });
    doc.save("partners.pdf");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end">
      <div>
        <label className="block text-sm mb-1">Month</label>
        <select className="p-2 border rounded" value={month} onChange={e => setMonth(e.target.value)}>
          <option value="">All</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString(undefined, { month: "long" })}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Year</label>
        <select className="p-2 border rounded" value={year} onChange={e => setYear(e.target.value)}>
          <option value="">All</option>
          {Array.from(new Set(users.map(u => new Date(String(u.create_date)).getFullYear()))).map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition" onClick={handleExport} type="button">
        Export to PDF
      </button>
    </div>
  );
}
