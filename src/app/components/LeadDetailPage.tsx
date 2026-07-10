import { useState, useEffect } from "react";
import { db } from "../../lib/db";
import { ChevronLeft, Calendar, MapPin, Phone, Mail, Zap, FileText, Loader2, AlertCircle } from "lucide-react";

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

interface LeadDetailPageProps {
  leadId: string;
  onNavigate: (s: string) => void;
}

function formatBudget(num: number | null) {
  if (!num) return "—";
  return "₹" + (num / 100000).toFixed(1) + "L";
}

export function LeadDetailPage({ leadId, onNavigate }: LeadDetailPageProps) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await db.getLead(leadId);
        setLead(data);
      } catch (err: any) {
        console.error("Error fetching lead detail:", err);
        setError(err.message || "Failed to load lead details.");
      } finally {
        setLoading(false);
      }
    };

    if (leadId) {
      fetchLeadDetails();
    }
  }, [leadId]);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 0", color: "#64748B" }}>
        <Loader2 size={36} color="#F59E0B" style={{ animation: "spin 1s linear infinite", marginBottom: 12 }} />
        <div style={{ fontSize: 14, fontWeight: 500 }}>Loading lead details...</div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
        <div style={{ padding: "16px 24px", background: "#FEF2F2", borderRadius: 8, border: "1px solid #FCA5A5", display: "flex", alignItems: "center", gap: 10, color: "#991B1B" }}>
          <AlertCircle size={20} />
          <span>{error || "Lead not found."}</span>
        </div>
        <button
          onClick={() => onNavigate("leads")}
          style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", border: "1px solid #CBD5E1", borderRadius: 8, background: "#fff", cursor: "pointer", fontFamily: "inherit" }}
        >
          <ChevronLeft size={16} /> Back to Leads
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: "0 auto", animation: "fadeIn 0.2s ease-out" }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: "#94A3B8", marginBottom: 20 }}>
        <span style={{ cursor: "pointer", color: "#64748B" }} onClick={() => onNavigate("dashboard")}>Dashboard</span>
        <span style={{ margin: "0 6px" }}>›</span>
        <span style={{ cursor: "pointer", color: "#64748B" }} onClick={() => onNavigate("leads")}>Leads</span>
        <span style={{ margin: "0 6px" }}>›</span>
        <span style={{ color: "#0F172A", fontWeight: 600 }}>Lead Details</span>
      </div>

      {/* Profile Header */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          border: "1px solid #E2E8F0",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.08)",
          padding: 28,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F59E0B, #D97706)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0F172A",
              fontWeight: 800,
              fontSize: 20,
            }}
          >
            {lead.customer_name.split(" ").map(w => w[0]).join("").toUpperCase().substring(0, 2)}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#0F172A" }}>{lead.customer_name}</h2>
            <div style={{ display: "flex", gap: 16, marginTop: 4, flexWrap: "wrap" }}>
              {lead.phone && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748B" }}>
                  <Phone size={14} /> {lead.phone}
                </div>
              )}
              {lead.location && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748B" }}>
                  <MapPin size={14} /> {lead.location}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => onNavigate(`leads/${lead.id}/edit`)}
            style={{
              padding: "9px 16px",
              border: "1px solid #CBD5E1",
              borderRadius: 8,
              background: "#fff",
              color: "#334155",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#F8FAFC"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
          >
            Edit Profile
          </button>
          <button
            onClick={() => onNavigate(`quotations/${lead.id}`)}
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
              fontFamily: "inherit",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
          >
            <FileText size={15} />
            Generate Quote
          </button>
        </div>
      </div>

      {/* Details Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        {/* Left: General Details */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Requirement Details</h3>
            <div style={{ height: 1, background: "#F1F5F9", marginBottom: 16 }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.04em" }}>System Capacity</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <Zap size={16} color="#F59E0B" /> {lead.capacity} kW
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.04em" }}>Estimated Budget</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginTop: 4 }}>
                  {formatBudget(lead.budget)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.04em" }}>Status</div>
                <div style={{ marginTop: 6 }}>
                  <span
                    style={{
                      background: lead.status === "Won" ? "#ECFDF5" : lead.status === "Lost" ? "#FEF2F2" : "#FEF3C7",
                      color: lead.status === "Won" ? "#065F46" : lead.status === "Lost" ? "#991B1B" : "#92400E",
                      borderRadius: 20,
                      padding: "3px 10px",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {lead.status}
                  </span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.04em" }}>Created At</div>
                <div style={{ fontSize: 14, color: "#334155", marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
                  <Calendar size={14} color="#94A3B8" /> {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info Card */}
        <div
          style={{
            background: "#F8FAFC",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            padding: 20,
            height: "fit-content",
          }}
        >
          <h4 style={{ margin: "0 0 12px 0", fontSize: 13, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Quick Actions</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              onClick={() => onNavigate("leads")}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #CBD5E1",
                borderRadius: 8,
                background: "#fff",
                color: "#64748B",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Back to Leads List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
