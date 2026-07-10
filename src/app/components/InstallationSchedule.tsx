import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Edit2 } from "lucide-react";

const today = new Date(2026, 5, 12); // June 12 2026

const installations: Record<number, { customer: string; initials: string; color: string }[]> = {
  3: [{ customer: "Arjun B.", initials: "AB", color: "#F59E0B" }],
  7: [{ customer: "Rina S.", initials: "RS", color: "#3B82F6" }],
  10: [{ customer: "NK Ent.", initials: "NK", color: "#8B5CF6" }, { customer: "Kabita D.", initials: "KD", color: "#10B981" }],
  14: [{ customer: "Mithun B.", initials: "MB", color: "#F97316" }],
  17: [{ customer: "Puja A.", initials: "PA", color: "#3B82F6" }],
  21: [{ customer: "Highlands H.", initials: "HH", color: "#F59E0B" }],
  24: [{ customer: "Ratan T.", initials: "RT", color: "#10B981" }],
  28: [{ customer: "Sujata M.", initials: "SM", color: "#8B5CF6" }],
};

const upcomingRows = [
  { id: 1, customer: "Arjun Bhattacharya", address: "Matigara, Siliguri", size: "5 kW", installer: "Bikash Roy", date: "Jun 3, 2026", status: "Completed" },
  { id: 2, customer: "NK Enterprises", address: "Sevoke Road, Siliguri", size: "20 kW", installer: "Sanjay Tiwari", date: "Jun 10, 2026", status: "In Progress" },
  { id: 3, customer: "Kabita Das", address: "Jalpaiguri Town", size: "5 kW", installer: "Bikash Roy", date: "Jun 10, 2026", status: "Scheduled" },
  { id: 4, customer: "Mithun Barman", address: "English Bazaar, Malda", size: "8 kW", installer: "Sanjay Tiwari", date: "Jun 14, 2026", status: "Scheduled" },
  { id: 5, customer: "Highlands Hotel", address: "Cart Road, Darjeeling", size: "25 kW", installer: "Ravi Gupta", date: "Jun 21, 2026", status: "Delayed" },
];

const statusStyles: Record<string, { bg: string; color: string }> = {
  Scheduled: { bg: "#EFF6FF", color: "#1D4ED8" },
  "In Progress": { bg: "#FEF3C7", color: "#92400E" },
  Completed: { bg: "#ECFDF5", color: "#065F46" },
  Delayed: { bg: "#FEF2F2", color: "#991B1B" },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function InstallationSchedule() {
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 5 = June
  const [currentYear, setCurrentYear] = useState(today.getFullYear()); // 2026
  const [selectedDate, setSelectedDate] = useState<number | null>(12);
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  return (
    <div style={{ padding: 32, maxWidth: 1280, margin: "0 auto" }}>
      {/* Calendar */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0px 1px 3px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.04)",
          marginBottom: 24,
        }}
      >
        {/* Calendar header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 17, color: "#0F172A" }}>
            {MONTHS[currentMonth]} {currentYear}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={() => { setCurrentMonth(today.getMonth()); setCurrentYear(today.getFullYear()); setSelectedDate(12); }}
              style={{
                padding: "6px 14px",
                border: "1.5px solid #E2E8F0",
                borderRadius: 8,
                background: "#fff",
                fontSize: 12,
                fontWeight: 600,
                color: "#64748B",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Today
            </button>
            <button
              onClick={prevMonth}
              style={{
                background: "#F8FAFC",
                border: "1.5px solid #E2E8F0",
                borderRadius: 8,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={15} color="#64748B" />
            </button>
            <button
              onClick={nextMonth}
              style={{
                background: "#F8FAFC",
                border: "1.5px solid #E2E8F0",
                borderRadius: 8,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronRight size={15} color="#64748B" />
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
          {DAYS.map((d) => (
            <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#94A3B8", padding: "4px 0", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {/* Empty cells for first day offset */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
            const isSelected = day === selectedDate;
            const hasInstalls = !!installations[day];
            const installs = installations[day] || [];

            return (
              <div
                key={day}
                onClick={() => setSelectedDate(day)}
                onMouseEnter={() => setHoveredDate(day)}
                onMouseLeave={() => setHoveredDate(null)}
                style={{
                  position: "relative",
                  minHeight: 72,
                  borderRadius: 8,
                  padding: "6px 8px",
                  background: isSelected ? "#FEF3C7" : hoveredDate === day ? "#F8FAFC" : "#fff",
                  border: isSelected ? "1.5px solid #F59E0B" : isToday ? "1.5px solid #3B82F6" : "1.5px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.1s",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: isToday || isSelected ? 700 : 400,
                    color: isToday ? "#3B82F6" : isSelected ? "#92400E" : "#0F172A",
                    marginBottom: 4,
                  }}
                >
                  {day}
                </div>
                {installs.map((inst, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      marginBottom: 2,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: inst.color,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 10, color: "#64748B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
                      {inst.customer}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ marginTop: 16, display: "flex", gap: 16, alignItems: "center" }}>
          {[
            { color: "#F59E0B", label: "Scheduled" },
            { color: "#10B981", label: "Completed" },
            { color: "#EF4444", label: "Delayed" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
              <span style={{ fontSize: 12, color: "#64748B" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming installations table */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0px 1px 3px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid #F1F5F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>Upcoming Installations</div>
          <button
            style={{
              background: "linear-gradient(135deg, #F59E0B, #D97706)",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              color: "#0F172A",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            + Schedule New
          </button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["Customer", "Address", "System Size", "Installer", "Scheduled Date", "Status", "Actions"].map((col) => (
                <th key={col} style={{
                  padding: "11px 20px",
                  textAlign: "left",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  borderBottom: "1px solid #E2E8F0",
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {upcomingRows.map((row, i) => {
              const s = statusStyles[row.status];
              return (
                <tr
                  key={row.id}
                  style={{ background: i % 2 === 0 ? "#fff" : "#FAFBFC", borderBottom: "1px solid #F1F5F9" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "#FEF3C7"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = i % 2 === 0 ? "#fff" : "#FAFBFC"; }}
                >
                  <td style={{ padding: "13px 20px", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{row.customer}</td>
                  <td style={{ padding: "13px 20px", fontSize: 12, color: "#64748B" }}>{row.address}</td>
                  <td style={{ padding: "13px 20px", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{row.size}</td>
                  <td style={{ padding: "13px 20px", fontSize: 13, color: "#64748B" }}>{row.installer}</td>
                  <td style={{ padding: "13px 20px", fontSize: 13, color: "#0F172A" }}>{row.date}</td>
                  <td style={{ padding: "13px 20px" }}>
                    <span style={{
                      background: s.bg, color: s.color,
                      borderRadius: 20, padding: "3px 10px",
                      fontSize: 12, fontWeight: 600,
                    }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: "13px 20px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{ background: "#F1F5F9", border: "none", borderRadius: 6, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <Eye size={13} color="#64748B" strokeWidth={1.5} />
                      </button>
                      <button style={{ background: "#F1F5F9", border: "none", borderRadius: 6, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <Edit2 size={13} color="#64748B" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
