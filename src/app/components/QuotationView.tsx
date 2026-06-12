import { Download, MessageCircle, Edit2, CheckCircle, Sun, Leaf, Zap, IndianRupee } from "lucide-react";

const lineItems = [
  { no: 1, component: "Solar Panels", spec: "330W Polycrystalline", brand: "Vikram Solar", qty: 16, unit: 22500, total: 360000 },
  { no: 2, component: "String Inverter", spec: "5kW, Single Phase", brand: "Growatt", qty: 1, unit: 38000, total: 38000 },
  { no: 3, component: "Mounting Structure", spec: "GI Hot Dip, Angled", brand: "Eneraque", qty: 1, unit: 18000, total: 18000 },
  { no: 4, component: "AC/DC Cables", spec: "4mm² Solar Cable", brand: "Havells", qty: 1, unit: 8500, total: 8500 },
  { no: 5, component: "Net Meter", spec: "Bidirectional, WBSEDCL", brand: "Genus", qty: 1, unit: 5500, total: 5500 },
  { no: 6, component: "Installation & Civil", spec: "Complete Turnkey", brand: "–", qty: 1, unit: 15000, total: 15000 },
];

const subtotal = lineItems.reduce((s, r) => s + r.total, 0);
const gst = Math.round(subtotal * 0.05);
const subsidy = 78000;
const netPayable = subtotal + gst - subsidy;

const paymentMilestones = [
  { step: 1, label: "Advance on Booking", percent: "50%", amount: Math.round(netPayable * 0.5) },
  { step: 2, label: "Before Installation Begins", percent: "40%", amount: Math.round(netPayable * 0.4) },
  { step: 3, label: "After Completion & Testing", percent: "10%", amount: Math.round(netPayable * 0.1) },
];

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function QuotationView() {
  return (
    <div style={{ padding: "28px 32px 120px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Quote document */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0px 1px 3px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ padding: "28px 36px 24px", borderBottom: "3px solid #F59E0B" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #F59E0B, #D97706)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sun size={28} color="#0F172A" strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#0F172A" }}>Shakambari Enterprises</div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>
                  Powering Futures with Solar Energy • GSTIN: 19AABCS1234F1Z5
                </div>
                <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 1 }}>
                  Siliguri, West Bengal — 734001 | +91 98765 00001
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#F59E0B" }}>QUOTATION</div>
              <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>
                <span style={{ fontWeight: 600, color: "#0F172A" }}>#QT-2026-0142</span>
              </div>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>Date: 12 Jun 2026</div>
              <div style={{ fontSize: 12, color: "#94A3B8" }}>Valid till: 12 Jul 2026</div>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div style={{ padding: "20px 36px", borderBottom: "1px solid #F1F5F9", background: "#F8FAFC" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                Bill To
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Arjun Bhattacharya</div>
              <div style={{ fontSize: 13, color: "#64748B", marginTop: 4, lineHeight: 1.6 }}>
                Vill: Matigara, PO: Bagdogra<br />
                Siliguri, Darjeeling – 734010<br />
                +91 98765 43210 | arjun.b@gmail.com
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                Site Details
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  ["Site Type", "Residential"],
                  ["Capacity", "5 kW On-Grid"],
                  ["Roof Type", "RCC Flat"],
                  ["Load", "5 kW Sanctioned"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 11, color: "#94A3B8" }}>{k}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Configuration Table */}
        <div style={{ padding: "24px 36px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            System Configuration
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#0F172A" }}>
                {["#", "Component", "Specification", "Brand", "Qty", "Unit Price", "Total"].map((h, i) => (
                  <th key={h} style={{
                    padding: "10px 14px",
                    textAlign: i >= 4 ? "right" : "left",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#94A3B8",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lineItems.map((row, i) => (
                <tr key={row.no} style={{ background: i % 2 === 0 ? "#fff" : "#F8FAFC", borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#94A3B8" }}>{row.no}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{row.component}</td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: "#64748B" }}>{row.spec}</td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: "#64748B" }}>{row.brand}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#0F172A", textAlign: "right" }}>{row.qty}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#0F172A", textAlign: "right" }}>{formatINR(row.unit)}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 600, color: "#0F172A", textAlign: "right" }}>{formatINR(row.total)}</td>
                </tr>
              ))}
              {/* Subtotal */}
              <tr style={{ borderTop: "2px solid #E2E8F0" }}>
                <td colSpan={6} style={{ padding: "10px 14px", textAlign: "right", fontSize: 13, fontWeight: 600, color: "#64748B" }}>
                  Subtotal
                </td>
                <td style={{ padding: "10px 14px", textAlign: "right", fontSize: 13, fontWeight: 700, color: "#0F172A" }}>
                  {formatINR(subtotal)}
                </td>
              </tr>
              {/* GST */}
              <tr>
                <td colSpan={6} style={{ padding: "8px 14px", textAlign: "right", fontSize: 13, color: "#64748B" }}>
                  GST @ 5%
                </td>
                <td style={{ padding: "8px 14px", textAlign: "right", fontSize: 13, color: "#64748B" }}>
                  {formatINR(gst)}
                </td>
              </tr>
              {/* Subsidy */}
              <tr>
                <td colSpan={6} style={{ padding: "8px 14px", textAlign: "right", fontSize: 13, color: "#059669", fontWeight: 600 }}>
                  PM Surya Ghar Subsidy (–)
                </td>
                <td style={{ padding: "8px 14px", textAlign: "right", fontSize: 13, color: "#059669", fontWeight: 600 }}>
                  ({formatINR(subsidy)})
                </td>
              </tr>
              {/* Net Payable */}
              <tr style={{ background: "#FEF3C7" }}>
                <td colSpan={6} style={{ padding: "13px 14px", textAlign: "right", fontSize: 15, fontWeight: 800, color: "#0F172A" }}>
                  Net Payable
                </td>
                <td style={{ padding: "13px 14px", textAlign: "right", fontSize: 15, fontWeight: 800, color: "#D97706" }}>
                  {formatINR(netPayable)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Savings + Payment Terms */}
        <div style={{ padding: "0 36px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Savings Estimate */}
          <div style={{ background: "#F0FDF4", borderRadius: 10, padding: 20, border: "1px solid #BBF7D0" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065F46", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
              <Leaf size={16} color="#10B981" strokeWidth={1.5} />
              Savings Estimate
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { icon: IndianRupee, label: "Monthly Savings", value: "₹2,400" },
                { icon: Zap, label: "Annual Savings", value: "₹28,800" },
                { icon: Sun, label: "Payback Period", value: "4.5 years" },
                { icon: Leaf, label: "CO₂ Saved/Year", value: "3.2 tons" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  style={{ background: "#fff", borderRadius: 8, padding: "10px 12px", border: "1px solid #D1FAE5" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <Icon size={13} color="#10B981" strokeWidth={1.5} />
                    <span style={{ fontSize: 11, color: "#64748B" }}>{label}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#065F46" }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Terms */}
          <div style={{ background: "#F8FAFC", borderRadius: 10, padding: 20, border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 14 }}>
              Payment Milestones
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {paymentMilestones.map((m, i) => (
                <div key={m.step} style={{ display: "flex", gap: 12, position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "#F59E0B",
                        color: "#0F172A",
                        fontSize: 12,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {m.step}
                    </div>
                    {i < paymentMilestones.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: "#E2E8F0", minHeight: 20 }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < paymentMilestones.length - 1 ? 16 : 0, flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{m.label}</div>
                    <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>
                      {m.percent} — <span style={{ fontWeight: 600, color: "#F59E0B" }}>{formatINR(m.amount)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terms */}
        <div style={{ padding: "0 36px 28px" }}>
          <div style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.6 }}>
            <strong style={{ color: "#64748B" }}>Terms & Conditions:</strong> This quotation is valid for 30 days from the date of issue.
            Prices are subject to change based on material costs and government subsidy availability.
            GST as applicable. Installation warranty: 1 year. Panel warranty: 25 years performance, 10 years product.
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 260,
          right: 0,
          background: "#fff",
          borderTop: "1px solid #E2E8F0",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 20,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "10px 20px",
            border: "1.5px solid #E2E8F0",
            borderRadius: 8,
            background: "#fff",
            color: "#0F172A",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <Download size={15} strokeWidth={1.5} />
          Download PDF
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "10px 20px",
            border: "none",
            borderRadius: 8,
            background: "#25D366",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <MessageCircle size={15} strokeWidth={1.5} />
          Send on WhatsApp
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "10px 20px",
            border: "1.5px solid #E2E8F0",
            borderRadius: 8,
            background: "#fff",
            color: "#64748B",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <Edit2 size={15} strokeWidth={1.5} />
          Edit Quote
        </button>
        <div style={{ flex: 1 }} />
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "10px 24px",
            border: "none",
            borderRadius: 8,
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#0F172A",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: "0 2px 8px rgba(245,158,11,0.3)",
          }}
        >
          <CheckCircle size={15} strokeWidth={1.5} />
          Mark as Approved
        </button>
      </div>
    </div>
  );
}
