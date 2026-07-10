import { useState, useEffect } from "react";
import { db } from "../../lib/db";
import { Download, MessageCircle, Edit2, CheckCircle, Sun, Leaf, Zap, IndianRupee, Loader2, AlertCircle } from "lucide-react";

function formatINR(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch (e) {
    return dateStr;
  }
}

function formatValidDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    d.setMonth(d.getMonth() + 1);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch (e) {
    return dateStr;
  }
}

export function QuotationView({ leadId, onNavigate }: { leadId?: string; onNavigate?: (s: string) => void }) {
  const [lead, setLead] = useState<any>(null);
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAmount, setEditAmount] = useState(0);
  const [editDate, setEditDate] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchQuoteData = async () => {
    try {
      setLoading(true);
      setError(null);

      let targetLeadId = leadId;

      if (!targetLeadId) {
        // Fetch the latest quotation
        const latestQuote = await db.getLatestQuotation();
        if (latestQuote) {
          setQuote(latestQuote);
          setLead(latestQuote.leads);
          return;
        } else {
          // If no quotes exist, fallback to mock defaults
          setLead({
            customer_name: "Arjun Bhattacharya",
            location: "Vill: Matigara, PO: Bagdogra, Siliguri, Darjeeling – 734010",
            phone: "+91 98765 43210",
            capacity: 5,
            budget: 280000,
          });
          setQuote({
            amount: 410250,
            date: "2026-06-12",
          });
          return;
        }
      }

      // Fetch lead details
      const leadData = await db.getLead(targetLeadId);
      setLead(leadData);

      // Fetch quote details
      const quoteData = await db.getQuotationForLead(targetLeadId);

      if (quoteData) {
        setQuote(quoteData);
      } else {
        // If lead exists but no quote is generated yet, pre-calculate quote amount and insert it
        const capacityVal = Number(leadData.capacity) || 5;
        const panelsQty = Math.round(capacityVal * 1000 / 330);
        const panelsTotal = panelsQty * 22500;
        const inverterTotal = 38000;
        const structureTotal = 18000 * (capacityVal / 5);
        const cablesTotal = 8500 * (capacityVal / 5);
        const meterTotal = 5500;
        const civilTotal = 15000 * (capacityVal / 5);

        const subtotalVal = panelsTotal + inverterTotal + structureTotal + cablesTotal + meterTotal + civilTotal;
        const gstVal = Math.round(subtotalVal * 0.05);
        const subsidyVal = 78000;
        const computedAmount = subtotalVal + gstVal - subsidyVal;

        const newQuote = await db.saveQuotation({
          lead_id: targetLeadId,
          amount: computedAmount,
          date: new Date().toISOString().split("T")[0],
        });
        setQuote(newQuote);
      }
    } catch (err: any) {
      console.error("Error loading quotation:", err);
      setError(err.message || "Failed to load quotation details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuoteData();
  }, [leadId]);

  const openEditModal = () => {
    setEditAmount(Number(netPayable));
    setEditDate(quote?.date || new Date().toISOString().split("T")[0]);
    setIsEditModalOpen(true);
  };

  const handleUpdateQuote = async () => {
    try {
      setUpdating(true);
      await db.updateQuotationAmount(quote.id, editAmount, editDate);
      setIsEditModalOpen(false);
      fetchQuoteData();
    } catch (err: any) {
      console.error("Error updating quote:", err);
      alert("Failed to update quotation: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 0", color: "#64748B" }}>
        <Loader2 size={36} color="#F59E0B" style={{ animation: "spin 1s linear infinite", marginBottom: 12 }} />
        <div style={{ fontSize: 14, fontWeight: 500 }}>Loading quotation document...</div>
      </div>
    );
  }

  if (error || !lead || !quote) {
    return (
      <div style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
        <div style={{ padding: "16px 24px", background: "#FEF2F2", borderRadius: 8, border: "1px solid #FCA5A5", display: "flex", alignItems: "center", gap: 10, color: "#991B1B" }}>
          <AlertCircle size={20} />
          <span>{error || "Quotation could not be loaded."}</span>
        </div>
      </div>
    );
  }

  const capacity = Number(lead.capacity) || 5;
  const panelsQty = Math.round(capacity * 1000 / 330);
  const structureTotal = Math.round(18000 * (capacity / 5));
  const cablesTotal = Math.round(8500 * (capacity / 5));
  const civilTotal = Math.round(15000 * (capacity / 5));

  const details = lead.components_details || [
    { name: "Tier-1 Panels", qty: panelsQty, price: 22500 },
    { name: "String Inverter", qty: 1, price: 38000 }
  ];

  const lineItems: any[] = [];
  let itemIndex = 1;

  details.forEach((c: any) => {
    let componentType = c.name;
    let spec = "Standard";
    let brand = "–";

    if (c.name === "Tier-1 Panels") {
      componentType = "Solar Panels";
      spec = "330W Polycrystalline";
      brand = "Vikram Solar";
    } else if (c.name === "Bifacial Panels") {
      componentType = "Solar Panels";
      spec = "Bifacial Mono PERC";
      brand = "Loom Solar";
    } else if (c.name === "String Inverter") {
      componentType = "String Inverter";
      spec = `${capacity}kW, Single Phase`;
      brand = "Growatt";
    } else if (c.name === "Hybrid Inverter") {
      componentType = "Hybrid Inverter";
      spec = `${capacity}kW, Hybrid`;
      brand = "Solis";
    } else if (c.name === "Battery Storage") {
      componentType = "Battery Storage";
      spec = "5kWh Lithium-Ion";
      brand = "Exide";
    } else if (c.name === "Net Meter") {
      componentType = "Net Meter";
      spec = "Bidirectional, WBSEDCL";
      brand = "Genus";
    }

    lineItems.push({
      no: itemIndex++,
      component: componentType,
      spec: spec,
      brand: brand,
      qty: Number(c.qty) || 1,
      unit: Number(c.price) || 0,
      total: (Number(c.qty) || 1) * (Number(c.price) || 0),
    });
  });

  // Always append structural defaults
  lineItems.push({ no: itemIndex++, component: "Mounting Structure", spec: "GI Hot Dip, Angled", brand: "Eneraque", qty: 1, unit: structureTotal, total: structureTotal });
  lineItems.push({ no: itemIndex++, component: "AC/DC Cables", spec: "4mm² Solar Cable", brand: "Havells", qty: 1, unit: cablesTotal, total: cablesTotal });
  lineItems.push({ no: itemIndex++, component: "Installation & Civil", spec: "Complete Turnkey", brand: "–", qty: 1, unit: civilTotal, total: civilTotal });

  const subtotal = lineItems.reduce((s, r) => s + r.total, 0);
  const gst = Math.round(subtotal * 0.05);
  const subsidy = 78000;
  const netPayable = quote.amount || (subtotal + gst - subsidy);

  const paymentMilestones = [
    { step: 1, label: "Advance on Booking", percent: "50%", amount: Math.round(netPayable * 0.5) },
    { step: 2, label: "Before Installation Begins", percent: "40%", amount: Math.round(netPayable * 0.4) },
    { step: 3, label: "After Completion & Testing", percent: "10%", amount: Math.round(netPayable * 0.1) },
  ];

  // Dynamic Savings Estimate Metrics
  const monthlySavingsVal = capacity * 120 * 8; // Assumes 4 units per kW per day, ₹8 per kWh tariff
  const annualSavingsVal = monthlySavingsVal * 12;
  const paybackVal = annualSavingsVal > 0 ? (Number(netPayable) / annualSavingsVal).toFixed(1) : "0.0";
  const co2Val = (capacity * 1.168).toFixed(1); // 0.8 kg CO2 offset factor per kWh

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const formattedAmount = formatINR(netPayable);
    const text = `Hello *${lead.customer_name}*,\n\nHere is your system quotation (*#QT-2026-${quote.id ? quote.id.substring(0, 4).toUpperCase() : "0142"}*) from *Shakambari Enterprises*.\n\n*System Capacity*: ${capacity} kW\n*Total Amount*: ${formattedAmount}\n*Date*: ${formatDate(quote.date)}\n\nThank you for choosing us!\n\nRegards,\nSales Team`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(lead.phone || "")}&text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <div style={{ padding: "28px 32px 120px", maxWidth: 1100, margin: "0 auto" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media print {
          body {
            background: #fff !important;
            color: #000 !important;
          }
          nav, header, aside, button, .no-print, [role="navigation"] {
            display: none !important;
          }
          #quote-document {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
          }
        }
      `}</style>
      {/* Quote document */}
      <div
        id="quote-document"
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
                <span style={{ fontWeight: 600, color: "#0F172A" }}>#QT-2026-{quote.id ? quote.id.substring(0, 4).toUpperCase() : "0142"}</span>
              </div>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>Date: {formatDate(quote.date)}</div>
              <div style={{ fontSize: 12, color: "#94A3B8" }}>Valid till: {formatValidDate(quote.date)}</div>
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
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{lead.customer_name}</div>
              <div style={{ fontSize: 13, color: "#64748B", marginTop: 4, lineHeight: 1.6 }}>
                {lead.location || "—"}<br />
                {lead.phone || ""}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                Site Details
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  ["Site Type", "Residential"],
                  ["Capacity", `${capacity} kW On-Grid`],
                  ["Roof Type", "RCC Flat"],
                  ["Load", `${capacity} kW Sanctioned`],
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
                { icon: IndianRupee, label: "Monthly Savings", value: formatINR(monthlySavingsVal) },
                { icon: Zap, label: "Annual Savings", value: formatINR(annualSavingsVal) },
                { icon: Sun, label: "Payback Period", value: `${paybackVal} years` },
                { icon: Leaf, label: "CO₂ Saved/Year", value: `${co2Val} tons` },
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
        className="no-print"
      >
        <button
          onClick={handleDownloadPDF}
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
          onClick={handleWhatsAppShare}
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
          onClick={openEditModal}
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
        {onNavigate && (
          <button
            onClick={() => onNavigate("leads")}
            style={{
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
            Back to Leads
          </button>
        )}
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

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(15, 23, 42, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          animation: "fadeIn 0.2s ease-out",
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 12,
            width: "100%",
            maxWidth: 400,
            padding: 28,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Edit Quotation Details</h3>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 6, textTransform: "uppercase" }}>
                Total Amount (₹)
              </label>
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "#0F172A",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 6, textTransform: "uppercase" }}>
                Quotation Date
              </label>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "#0F172A",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                disabled={updating}
                onClick={() => setIsEditModalOpen(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #E2E8F0",
                  borderRadius: 8,
                  background: "#fff",
                  color: "#64748B",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                disabled={updating}
                onClick={handleUpdateQuote}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #F59E0B, #D97706)",
                  color: "#0F172A",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: updating ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                {updating && <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
