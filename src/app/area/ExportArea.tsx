"use client";
import jsPDF from "jspdf";
import { User } from "@/lib/dal/userDAL";

interface ExportAreaProps {
  users: User[];
}

export default function ExportArea({ users }: ExportAreaProps) {
  // No filter logic provided, so export all users for now
  const filtered = users;

  const handleExport = () => {
    if (filtered.length === 0) {
      alert("No data to export.");
      return;
    }
    const doc = new jsPDF();
    doc.setFont("times", "");
    doc.setFontSize(12);
    doc.text("Last Hope Church", 200, 10, { align: "right" });
    let y = 25;
    filtered.forEach((u, i) => {
      doc.text(
        `${i + 1})  Area: ${u.area || "-"}   State: ${u.state || "-"}   Country: ${u.country || "-"}`,
        10,
        y
      );
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
        doc.setFont("times", "");
        doc.setFontSize(12);
      }
    });
    doc.save("areas.pdf");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end">
      {/* dropdowns for filtering areas, cities, and states */}
      <div>
        <label className="block text-sm mb-1">Areas</label>
      </div>
      <div>
        <label className="block text-sm mb-1">Cities</label>
      </div>
      <div>
        <label className="block text-sm mb-1">States</label>
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
