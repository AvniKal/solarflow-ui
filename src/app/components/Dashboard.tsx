import { useState } from "react";

import { Users, FileText, Zap, Clock, TrendingUp, TrendingDown, Eye, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

import { LeadDetails } from "./LeadDetails";

const kpiCards = [
  {
    label: "Total Leads",
    value: "148",
    trend: "+12%",
    trendUp: true,
    trendLabel: "this month",
    icon: Users,
    accent: "#3B82F6",
  },
  {
    label: "Quotes Sent",
    value: "64",
    trend: "+8%",
    trendUp: true,
    trendLabel: "this month",
    icon: FileText,
    accent: "#8B5CF6",
  },
  {
    label: "Installations",
    value: "31",
    trend: "+5%",
    trendUp: true,
    trendLabel: "this month",
    icon: Zap,
    accent: "#10B981",
  },
  {
    label: "Pending Follow-ups",
    value: "19",
    trend: "-3%",
    trendUp: false,
    trendLabel: "this month",
    icon: Clock,
    accent: "#EF4444",
  },
];

const monthlyLeadsData = [
  { month: "Jan", leads: 24 },
  { month: "Feb", leads: 31 },
  { month: "Mar", leads: 28 },
  { month: "Apr", leads: 42 },
  { month: "May", leads: 38 },
  { month: "Jun", leads: 51 },
];

const leadStatusData = [
  { name: "New", value: 38, color: "#3B82F6" },
  { name: "Quoted", value: 28, color: "#F59E0B" },
  { name: "Negotiating", value: 18, color: "#8B5CF6" },
  { name: "Won", value: 42, color: "#10B981" },
  { name: "Lost", value: 22, color: "#EF4444" },
];

const recentLeads = [
  {
    id: 1,
    name: "Arjun Bhattacharya",
    location: "Siliguri, WB",
    capacity: "5 kW",
    budget: "₹2.8L",
    status: "Quoted",
    updated: "2 hrs ago",
  },
  {
    id: 2,
    name: "Priya Devi Sarkar",
    location: "Jalpaiguri, WB",
    capacity: "3 kW",
    budget: "₹1.9L",
    status: "New",
    updated: "4 hrs ago",
  },
  {
    id: 3,
    name: "Suresh Mahato",
    location: "Darjeeling, WB",
    capacity: "10 kW",
    budget: "₹5.5L",
    status: "Negotiating",
    updated: "Yesterday",
  },
  {
    id: 4,
    name: "Ranjit Kumar Ghosh",
    location: "Cooch Behar, WB",
    capacity: "7 kW",
    budget: "₹3.8L",
    status: "Won",
    updated: "2 days ago",
  },
  {
    id: 5,
    name: "Mamata Pradhan",
    location: "Alipurduar, WB",
    capacity: "4 kW",
    budget: "₹2.2L",
    status: "Lost",
    updated: "3 days ago",
  },
];

const statusStyles: Record<string, { bg: string; color: string }> = {
  New: { bg: "#EFF6FF", color: "#1D4ED8" },
  Quoted: { bg: "#FEF3C7", color: "#92400E" },
  Negotiating: { bg: "#F3E8FF", color: "#6B21A8" },
  Won: { bg: "#ECFDF5", color: "#065F46" },
  Lost: { bg: "#FEF2F2", color: "#991B1B" },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#0F172A", borderRadius: 8, padding: "8px 14px",
        color: "#F8FAFC", fontSize: 13,
      }}>
        <div style={{ fontWeight: 600 }}>{label}</div>
        <div style={{ color: "#F59E0B" }}>{payload[0].value} leads</div>
      </div>
    );
  }
  return null;
};

export function Dashboard({ onNavigate }: { onNavigate: (s: string) => void }) {
  
  
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [leads, setLeads] = useState(recentLeads);return (
    <div style={{ padding: 32, maxWidth: 1280, margin: "0 auto" }}>
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 28 }}>
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 24,
                borderLeft: `4px solid ${card.accent}`,
                boxShadow: "0px 1px 3px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 12, color: "#64748B", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {card.label}
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: "#0F172A", lineHeight: 1 }}>
                    {card.value}
                  </div>
                </div>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `${card.accent}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={22} color={card.accent} strokeWidth={1.5} />
                </div>
              </div>
              <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 3,
                    background: card.trendUp ? "#ECFDF5" : "#FEF2F2",
                    color: card.trendUp ? "#059669" : "#DC2626",
                    borderRadius: 20,
                    padding: "2px 8px",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {card.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {card.trend}
                </span>
                <span style={{ fontSize: 12, color: "#94A3B8" }}>{card.trendLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20, marginBottom: 28 }}>
        {/* Bar Chart */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0px 1px 3px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>Monthly Leads Overview</div>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>Lead generation trend — Jan to Jun 2026</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: "#F59E0B" }} />
              <span style={{ fontSize: 12, color: "#64748B" }}>Leads</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyLeadsData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC" }} />
              <Bar dataKey="leads" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0px 1px 3px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A", marginBottom: 4 }}>
            Lead Status Breakdown
          </div>
          <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 16 }}>
            Distribution across pipeline stages
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={leadStatusData}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
              >
                {leadStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} leads`]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", marginTop: 4 }}>
            {leadStatusData.map((item) => (
              <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#64748B" }}>{item.name}</span>
                <span style={{ fontSize: 12, color: "#0F172A", fontWeight: 600, marginLeft: "auto" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
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
          <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>Recent Leads</div>
          <button
            onClick={() => onNavigate("leads")}
            style={{
              background: "none",
              border: "none",
              color: "#F59E0B",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            View All →
          </button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["Customer Name", "Location", "Capacity", "Budget", "Status", "Last Updated", "Actions"].map((col) => (
                <th
                  key={col}
                  style={{
                    padding: "11px 20px",
                    textAlign: "left",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#64748B",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    borderBottom: "1px solid #E2E8F0",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((leads, i) => {
              const s = statusStyles[leads.status];
              return (
                <tr
                  key={leads.id}
                  style={{
                    background: i % 2 === 0 ? "#fff" : "#FAFBFC",
                    transition: "background 0.1s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = "#FEF3C7";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = i % 2 === 0 ? "#fff" : "#FAFBFC";
                  }}
                >
                  <td style={{ padding: "13px 20px", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>
                    {leads.name}
                  </td>
                  <td style={{ padding: "13px 20px", fontSize: 13, color: "#64748B" }}>{leads.location}</td>
                  <td style={{ padding: "13px 20px", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>
                    {leads.capacity}
                  </td>
                  <td style={{ padding: "13px 20px", fontSize: 13, color: "#0F172A" }}>{leads.budget}</td>
                  <td style={{ padding: "13px 20px" }}>
                    <span
                      style={{
                        background: s.bg,
                        color: s.color,
                        borderRadius: 20,
                        padding: "3px 10px",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {leads.status}
                    </span>
                  </td>
                  <td style={{ padding: "13px 20px", fontSize: 12, color: "#94A3B8" }}>{leads.updated}</td>
                  <td style={{ padding: "13px 20px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => setSelectedLead(leads)}
                          style={{
                          background: "#F1F5F9",
                          border: "none",
                          borderRadius: 6,
                          width: 30,
                          height: 30,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Eye size={14} color="#64748B" strokeWidth={1.5} />
                      </button>
                      <button
                        style={{
                          background: "#F1F5F9",
                          border: "none",
                          borderRadius: 6,
                          width: 30,
                          height: 30,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Edit2 size={14} color="#64748B" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Pagination */}
        <div
          style={{
            padding: "14px 24px",
            borderTop: "1px solid #F1F5F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 13, color: "#64748B" }}>Showing 5 of 148 leads</span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: 6,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={14} color="#64748B" />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                style={{
                  background: p === 1 ? "#F59E0B" : "#F8FAFC",
                  border: `1px solid ${p === 1 ? "#F59E0B" : "#E2E8F0"}`,
                  borderRadius: 6,
                  width: 32,
                  height: 32,
                  fontSize: 13,
                  fontWeight: p === 1 ? 700 : 400,
                  color: p === 1 ? "#0F172A" : "#64748B",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {p}
              </button>
            ))}
            <button
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: 6,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronRight size={14} color="#64748B" />
            </button>
          </div>
        </div>
            </div>

      {selectedLead && (
  <LeadDetails
    lead={selectedLead}
    onClose={() => setSelectedLead(null)}
  onSave={(updatedLead) => {
  setLeads(
    leads.map((lead) =>
      lead.id === updatedLead.id ? updatedLead : lead
    )
  );

  setSelectedLead(null);
}}
    
  />
)}

    </div>
  );
}
  
