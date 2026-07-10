import { useState } from "react";
import { Plus, Eye, UserCheck, CheckCircle, Filter } from "lucide-react";

const tickets = [
  { id: "TKT-0241", customer: "Arjun Bhattacharya", issue: "Inverter Fault", date: "Jun 10, 2026", assignee: "Bikash Roy", priority: "High", status: "Open" },
  { id: "TKT-0240", customer: "Ratan Tamang", issue: "Panel Output Low", date: "Jun 9, 2026", assignee: "Sanjay Tiwari", priority: "Medium", status: "In Progress" },
  { id: "TKT-0239", customer: "Kabita Das", issue: "Net Meter Problem", date: "Jun 8, 2026", assignee: "Bikash Roy", priority: "High", status: "In Progress" },
  { id: "TKT-0238", customer: "NK Enterprises", issue: "Wiring Issue", date: "Jun 7, 2026", assignee: "Ravi Gupta", priority: "Medium", status: "Open" },
  { id: "TKT-0237", customer: "Puja Aich", issue: "App/Monitoring Issue", date: "Jun 6, 2026", assignee: "Sanjay Tiwari", priority: "Low", status: "Resolved" },
  { id: "TKT-0236", customer: "Highlands Hotel", issue: "Inverter Fault", date: "Jun 5, 2026", assignee: "Bikash Roy", priority: "High", status: "Resolved" },
  { id: "TKT-0235", customer: "Mithun Barman", issue: "Panel Output Low", date: "Jun 4, 2026", assignee: "Ravi Gupta", priority: "Low", status: "Closed" },
];

const statusStyles: Record<string, { bg: string; color: string }> = {
  Open: { bg: "#EFF6FF", color: "#1D4ED8" },
  "In Progress": { bg: "#FEF3C7", color: "#92400E" },
  Resolved: { bg: "#ECFDF5", color: "#065F46" },
  Closed: { bg: "#F1F5F9", color: "#64748B" },
};

const priorityStyles: Record<string, { bg: string; color: string }> = {
  High: { bg: "#FEF2F2", color: "#DC2626" },
  Medium: { bg: "#FEF3C7", color: "#D97706" },
  Low: { bg: "#F1F5F9", color: "#64748B" },
};

const issueTypeColors: Record<string, string> = {
  "Inverter Fault": "#EF4444",
  "Panel Output Low": "#F97316",
  "Net Meter Problem": "#8B5CF6",
  "Wiring Issue": "#3B82F6",
  "App/Monitoring Issue": "#06B6D4",
};

const filterTabs = ["All", "Open", "In Progress", "Resolved", "Closed"];

export function ServiceSupport() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All"
    ? tickets
    : tickets.filter((t) => t.status === activeTab);

  const counts = {
    All: tickets.length,
    Open: tickets.filter((t) => t.status === "Open").length,
    "In Progress": tickets.filter((t) => t.status === "In Progress").length,
    Resolved: tickets.filter((t) => t.status === "Resolved").length,
    Closed: tickets.filter((t) => t.status === "Closed").length,
  };

  return (
    <div style={{ padding: 32, maxWidth: 1280, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Service Tickets</h2>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: "#64748B" }}>
            Track and manage post-installation service requests
          </p>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            color: "#0F172A",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: "0 2px 8px rgba(245,158,11,0.3)",
          }}
        >
          <Plus size={15} strokeWidth={2} />
          Raise New Ticket
        </button>
      </div>

      {/* Filter bar */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "14px 20px",
          marginBottom: 20,
          boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {/* Status tabs */}
        <div style={{ display: "flex", gap: 6, flex: 1 }}>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: "none",
                background: activeTab === tab ? "#FEF3C7" : "transparent",
                color: activeTab === tab ? "#92400E" : "#64748B",
                fontSize: 13,
                fontWeight: activeTab === tab ? 700 : 400,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              {tab}
              <span
                style={{
                  marginLeft: 6,
                  background: activeTab === tab ? "#F59E0B" : "#E2E8F0",
                  color: activeTab === tab ? "#0F172A" : "#64748B",
                  borderRadius: 10,
                  padding: "1px 6px",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {counts[tab as keyof typeof counts]}
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Filter size={14} color="#94A3B8" strokeWidth={1.5} />
            <select
              style={{
                border: "1.5px solid #E2E8F0",
                borderRadius: 8,
                padding: "6px 10px",
                fontSize: 12,
                color: "#64748B",
                background: "#fff",
                fontFamily: "inherit",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option>All Issue Types</option>
              <option>Inverter Fault</option>
              <option>Panel Output Low</option>
              <option>Wiring Issue</option>
              <option>Net Meter Problem</option>
              <option>App/Monitoring Issue</option>
            </select>
          </div>
          <select
            style={{
              border: "1.5px solid #E2E8F0",
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 12,
              color: "#64748B",
              background: "#fff",
              fontFamily: "inherit",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>This month</option>
            <option>Custom range</option>
          </select>
        </div>
      </div>

      {/* Tickets table */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.04)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["Ticket ID", "Customer Name", "Issue Type", "Date Raised", "Assigned To", "Priority", "Status", "Actions"].map((col) => (
                <th key={col} style={{
                  padding: "11px 20px",
                  textAlign: "left",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  borderBottom: "1px solid #E2E8F0",
                  whiteSpace: "nowrap",
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((ticket, i) => {
              const ss = statusStyles[ticket.status];
              const ps = priorityStyles[ticket.priority];
              const issueColor = issueTypeColors[ticket.issue];

              return (
                <tr
                  key={ticket.id}
                  style={{ background: i % 2 === 0 ? "#fff" : "#FAFBFC", borderBottom: "1px solid #F1F5F9", transition: "background 0.1s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "#FEF3C7"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = i % 2 === 0 ? "#fff" : "#FAFBFC"; }}
                >
                  <td style={{ padding: "13px 20px", fontSize: 12, fontWeight: 700, color: "#3B82F6", fontFamily: "monospace" }}>
                    {ticket.id}
                  </td>
                  <td style={{ padding: "13px 20px", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>
                    {ticket.customer}
                  </td>
                  <td style={{ padding: "13px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: issueColor, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#0F172A" }}>{ticket.issue}</span>
                    </div>
                  </td>
                  <td style={{ padding: "13px 20px", fontSize: 13, color: "#64748B" }}>{ticket.date}</td>
                  <td style={{ padding: "13px 20px", fontSize: 13, color: "#0F172A" }}>{ticket.assignee}</td>
                  <td style={{ padding: "13px 20px" }}>
                    <span style={{
                      background: ps.bg, color: ps.color,
                      borderRadius: 20, padding: "3px 10px",
                      fontSize: 12, fontWeight: 600,
                    }}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td style={{ padding: "13px 20px" }}>
                    <span style={{
                      background: ss.bg, color: ss.color,
                      borderRadius: 20, padding: "3px 10px",
                      fontSize: 12, fontWeight: 600,
                    }}>
                      {ticket.status}
                    </span>
                  </td>
                  <td style={{ padding: "13px 20px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        title="View"
                        style={{ background: "#F1F5F9", border: "none", borderRadius: 6, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                      >
                        <Eye size={13} color="#64748B" strokeWidth={1.5} />
                      </button>
                      <button
                        title="Assign"
                        style={{ background: "#EFF6FF", border: "none", borderRadius: 6, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                      >
                        <UserCheck size={13} color="#3B82F6" strokeWidth={1.5} />
                      </button>
                      <button
                        title="Resolve"
                        style={{ background: "#ECFDF5", border: "none", borderRadius: 6, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                      >
                        <CheckCircle size={13} color="#10B981" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#94A3B8", fontSize: 14 }}>
            No tickets found for this filter.
          </div>
        )}
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 20 }}>
        {[
          { label: "Open", count: counts.Open, color: "#3B82F6", bg: "#EFF6FF" },
          { label: "In Progress", count: counts["In Progress"], color: "#D97706", bg: "#FEF3C7" },
          { label: "Resolved", count: counts.Resolved, color: "#059669", bg: "#ECFDF5" },
          { label: "Closed", count: counts.Closed, color: "#64748B", bg: "#F1F5F9" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff",
              borderRadius: 10,
              padding: "16px 20px",
              boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.count}</div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18 }}>
                {s.label === "Open" ? "🔵" : s.label === "In Progress" ? "🟡" : s.label === "Resolved" ? "🟢" : "⚫"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
