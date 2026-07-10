import { useState, useEffect } from "react";
import { db } from "../../lib/db";
import { Eye, Edit2, ChevronLeft, ChevronRight, Plus, AlertCircle, Loader2 } from "lucide-react";

interface Lead {
  id: string;
  customer_name: string;
  phone: string | null;
  location: string | null;
  capacity: number;
  budget: number | null;
  status: string;
  created_at: string;
}

const statusStyles: Record<string, { bg: string; color: string }> = {
  New: { bg: "#EFF6FF", color: "#1D4ED8" },
  Quoted: { bg: "#FEF3C7", color: "#92400E" },
  Negotiating: { bg: "#F3E8FF", color: "#6B21A8" },
  Won: { bg: "#ECFDF5", color: "#065F46" },
  Lost: { bg: "#FEF2F2", color: "#991B1B" },
};

function formatBudget(num: number | null) {
  if (!num) return "—";
  return "₹" + (num / 100000).toFixed(1) + "L";
}

function formatRelativeTime(dateStr: string) {
  try {
    const date = new Date(dateStr);
    const diffMs = new Date().getTime() - date.getTime();
    if (isNaN(diffMs)) return "—";
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hrs ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  } catch (e) {
    return "—";
  }
}

interface LeadsPageProps {
  onNavigate: (s: string) => void;
  searchQuery: string;
}

export function LeadsPage({ onNavigate, searchQuery }: LeadsPageProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 5;

  const fetchLeads = async (search: string, currentPage: number) => {
    try {
      setLoading(true);
      setError(null);

      const { data, count } = await db.getLeads(search, currentPage, pageSize);

      setLeads(data || []);
      setTotalCount(count || 0);
    } catch (err: any) {
      console.error("Error fetching leads:", err);
      setError(err.message || "Failed to load leads.");
    } finally {
      setLoading(false);
    }
  };

  // Debounced search trigger
  useEffect(() => {
    const handler = setTimeout(() => {
      // Reset page to 1 when search query changes
      setPage(1);
      fetchLeads(searchQuery, 1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Handle page changes
  useEffect(() => {
    fetchLeads(searchQuery, page);
  }, [page]);

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <div style={{ padding: 32, maxWidth: 1280, margin: "0 auto", animation: "fadeIn 0.3s ease-out" }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Header card with Add Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0F172A" }}>All Leads</h2>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: "#64748B" }}>
            Viewing and managing {totalCount} lead records in real-time.
          </p>
        </div>

        <button
          onClick={() => onNavigate("leads/new")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "9px 16px",
            border: "none",
            borderRadius: 8,
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#0F172A",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(245,158,11,0.25)",
            transition: "transform 0.15s, box-shadow 0.15s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(245,158,11,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(245,158,11,0.25)";
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Lead
        </button>
      </div>

      {/* Table Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0px 1px 3px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.04)",
          overflow: "hidden",
          border: "1px solid #E2E8F0",
        }}
      >
        {error && (
          <div
            style={{
              padding: "16px 24px",
              background: "#FEF2F2",
              borderBottom: "1px solid #FCA5A5",
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#991B1B",
              fontSize: 14,
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "100px 0",
              color: "#64748B",
            }}
          >
            <Loader2
              size={36}
              color="#F59E0B"
              style={{ animation: "spin 1s linear infinite", marginBottom: 12 }}
            />
            <div style={{ fontSize: 14, fontWeight: 500 }}>Fetching leads from database...</div>
          </div>
        ) : leads.length === 0 ? (
          <div style={{ padding: "80px 0", textAlign: "center", color: "#94A3B8" }}>
            <div style={{ fontSize: 44, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>No Leads Found</div>
            <div style={{ fontSize: 14 }}>Try adjusting your search query or add a new lead record.</div>
          </div>
        ) : (
          <>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8FAFC" }}>
                  {["Customer Name", "Location", "Capacity", "Budget", "Status", "Last Updated", "Actions"].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: "12px 20px",
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#64748B",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        borderBottom: "1px solid #E2E8F0",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => {
                  const s = statusStyles[lead.status] || { bg: "#F1F5F9", color: "#475569" };
                  return (
                    <tr
                      key={lead.id}
                      style={{
                        background: i % 2 === 0 ? "#fff" : "#FAFBFC",
                        borderBottom: "1px solid #F1F5F9",
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#FEF3C7";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#FAFBFC";
                      }}
                    >
                      <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>
                        {lead.customer_name}
                        {lead.phone && (
                          <div style={{ fontSize: 11, fontWeight: 400, color: "#64748B", marginTop: 2 }}>
                            {lead.phone}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "#64748B" }}>
                        {lead.location || "—"}
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>
                        {lead.capacity} kW
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "#0F172A" }}>
                        {formatBudget(lead.budget)}
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <span
                          style={{
                            background: s.bg,
                            color: s.color,
                            borderRadius: 20,
                            padding: "3px 10px",
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 12, color: "#94A3B8" }}>
                        {formatRelativeTime(lead.created_at)}
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => onNavigate(`leads/${lead.id}`)}
                            title="View Detail"
                            style={{
                              background: "#F1F5F9",
                              border: "none",
                              borderRadius: 6,
                              width: 32,
                              height: 32,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#E2E8F0";
                              e.currentTarget.style.color = "#0F172A";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#F1F5F9";
                            }}
                          >
                            <Eye size={14} color="#475569" strokeWidth={2} />
                          </button>
                          <button
                            onClick={() => onNavigate(`leads/${lead.id}/edit`)}
                            title="Edit Lead"
                            style={{
                              background: "#F1F5F9",
                              border: "none",
                              borderRadius: 6,
                              width: 32,
                              height: 32,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#E2E8F0";
                              e.currentTarget.style.color = "#0F172A";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#F1F5F9";
                            }}
                          >
                            <Edit2 size={14} color="#475569" strokeWidth={2} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination footer */}
            <div
              style={{
                padding: "14px 24px",
                borderTop: "1px solid #F1F5F9",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#FCFDFE",
              }}
            >
              <span style={{ fontSize: 13, color: "#64748B" }}>
                Showing <strong>{leads.length}</strong> of <strong>{totalCount}</strong> leads
              </span>

              {totalPages > 1 && (
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    style={{
                      background: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: 6,
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: page === 1 ? "not-allowed" : "pointer",
                      opacity: page === 1 ? 0.5 : 1,
                      transition: "background 0.15s",
                    }}
                  >
                    <ChevronLeft size={15} color="#64748B" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const p = idx + 1;
                    const isActive = p === page;
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        style={{
                          background: isActive ? "#F59E0B" : "#fff",
                          border: `1px solid ${isActive ? "#F59E0B" : "#E2E8F0"}`,
                          borderRadius: 6,
                          width: 32,
                          height: 32,
                          fontSize: 13,
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? "#0F172A" : "#64748B",
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        {p}
                      </button>
                    );
                  })}

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    style={{
                      background: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: 6,
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: page === totalPages ? "not-allowed" : "pointer",
                      opacity: page === totalPages ? 0.5 : 1,
                      transition: "background 0.15s",
                    }}
                  >
                    <ChevronRight size={15} color="#64748B" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
