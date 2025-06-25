"use client";
import jsPDF from "jspdf";
import { User } from "@/lib/dal/userDAL";

interface ExportRequestProps {
  users: User[];
}

export default function ExportRequest({ users }: ExportRequestProps) {
  // Filter requests from the latest week only
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const filtered = users.filter(
    (u) => u.request && u.create_date && new Date(String(u.create_date)) >= oneWeekAgo
  );

  const handleExport = () => {
    if (filtered.length === 0) {
      alert("No data to export.");
      return;
    }
    const doc = new jsPDF();
    doc.setFont("times", "");
    doc.setFontSize(12);
    doc.text("Prayer Requests | Last Hope Church", 200, 10, { align: "right" });
    let y = 25;
    filtered.forEach((u, i) => {
      doc.text(
        `${i + 1})  ${u.firstname || ""} ${u.middlename || ""} ${u.lastname || ""}  Contact: ${u.contactno || "-"}`,
        10,
        y
      );
      y += 7;
      doc.text(` ${u.request || "-"}`, 10, y);
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
        doc.setFont("times", "");
        doc.setFontSize(12);
      }
    });
    doc.save("requests.pdf");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end">
      <div>
        <label className="block text-sm mb-1">Past week Requests</label>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        onClick={handleExport}
        type="button"
      >
        Export to PDF
      </button>
    </div>
  );
}
