import { useState } from "react";
import { Sun, CheckCircle, Circle, ChevronDown, Home, Building2, Factory } from "lucide-react";

const componentOptions = [
  "Tier-1 Panels",
  "String Inverter",
  "Hybrid Inverter",
  "Bifacial Panels",
  "Battery Storage",
  "Net Meter",
];

const roofTypes = ["RCC Flat", "Tin Sheet", "Metal Truss", "Terracotta Tiles"];
const budgetRanges = ["₹1L – ₹2L", "₹2L – ₹3L", "₹3L – ₹5L", "₹5L – ₹8L", "₹8L+"];

const paymentModes = [
  { id: "cash", label: "Cash", icon: "💵" },
  { id: "emi", label: "EMI", icon: "📅" },
  { id: "loan", label: "Bank Loan", icon: "🏦" },
  { id: "subsidy", label: "Subsidy", icon: "🏛️" },
];

const siteTypes = [
  { id: "residential", label: "Residential", icon: Home },
  { id: "commercial", label: "Commercial", icon: Building2 },
  { id: "industrial", label: "Industrial", icon: Factory },
];

const requiredFields = [
  { label: "Customer Name", key: "name" },
  { label: "Phone Number", key: "phone" },
  { label: "Email Address", key: "email" },
  { label: "Site Address", key: "address" },
  { label: "System Capacity", key: "capacity" },
  { label: "Budget Range", key: "budget" },
];

export function NewLeadForm({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [siteType, setSiteType] = useState("residential");
  const [capacity, setCapacity] = useState(5);
  const [paymentMode, setPaymentMode] = useState("cash");
  const [selectedComponents, setSelectedComponents] = useState<string[]>(["Tier-1 Panels", "String Inverter"]);
  const [roofType, setRoofType] = useState("RCC Flat");
  const [budget, setBudget] = useState("₹2L – ₹3L");

  const [form, setForm] = useState({
    name: "Arjun Bhattacharya",
    phone: "+91 98765 43210",
    email: "arjun.b@gmail.com",
    address: "",
    load: "",
    notes: "",
  });

  const filledCount = [form.name, form.phone, form.email, form.address, capacity > 0 ? "y" : "", budget].filter(Boolean).length;

  const toggleComponent = (c: string) => {
    setSelectedComponents((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  return (
    <div style={{ padding: 32, maxWidth: 1280, margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: "#94A3B8", marginBottom: 20 }}>
        <span style={{ cursor: "pointer", color: "#64748B" }} onClick={() => onNavigate("dashboard")}>Dashboard</span>
        <span style={{ margin: "0 6px" }}>›</span>
        <span style={{ cursor: "pointer", color: "#64748B" }}>Leads</span>
        <span style={{ margin: "0 6px" }}>›</span>
        <span style={{ color: "#0F172A", fontWeight: 600 }}>New Lead</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "65fr 35fr", gap: 24 }}>
        {/* Left: Form */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 32,
            boxShadow: "0px 1px 3px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ margin: "0 0 4px 0", fontSize: 20, fontWeight: 700, color: "#0F172A" }}>
            Capture New Lead
          </h2>
          <p style={{ margin: "0 0 28px 0", fontSize: 13, color: "#64748B" }}>
            Fill in customer and site details to create a new solar lead.
          </p>

          {/* Section 1: Customer Info */}
          <SectionHeader label="1. Customer Information" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
            <FormField label="Full Name" placeholder="e.g. Arjun Bhattacharya" value={form.name}
              onChange={(v) => setForm({ ...form, name: v })} />
            <FormField label="Phone Number" placeholder="+91 98765 43210" value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })} />
            <FormField label="Email Address" placeholder="customer@email.com" value={form.email}
              onChange={(v) => setForm({ ...form, email: v })} />
            <FormField label="Site Address" placeholder="Village, Block, District" value={form.address}
              onChange={(v) => setForm({ ...form, address: v })} />
          </div>

          <Divider />

          {/* Section 2: Site & System */}
          <SectionHeader label="2. Site & System Requirements" />
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Site Type
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              {siteTypes.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSiteType(id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    border: `1.5px solid ${siteType === id ? "#F59E0B" : "#E2E8F0"}`,
                    borderRadius: 8,
                    background: siteType === id ? "#FEF3C7" : "#fff",
                    color: siteType === id ? "#92400E" : "#64748B",
                    fontWeight: siteType === id ? 600 : 400,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  <Icon size={15} strokeWidth={1.5} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              System Capacity: <span style={{ color: "#F59E0B", fontWeight: 700 }}>{capacity} kW</span>
            </label>
            <input
              type="range"
              min={1}
              max={50}
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F59E0B" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94A3B8", marginTop: 4 }}>
              <span>1 kW</span><span>25 kW</span><span>50 kW</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
            <FormField label="Sanctioned Load (kW)" placeholder="e.g. 5" value={form.load}
              onChange={(v) => setForm({ ...form, load: v })} />
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Roof Type
              </label>
              <div style={{ position: "relative" }}>
                <select
                  value={roofType}
                  onChange={(e) => setRoofType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 36px 9px 12px",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#0F172A",
                    background: "#fff",
                    appearance: "none",
                    fontFamily: "inherit",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {roofTypes.map((r) => <option key={r}>{r}</option>)}
                </select>
                <ChevronDown size={14} color="#94A3B8" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            </div>
          </div>

          <Divider />

          {/* Section 3: Commercial Preferences */}
          <SectionHeader label="3. Commercial Preferences" />
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Budget Range
            </label>
            <div style={{ position: "relative" }}>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 36px 9px 12px",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "#0F172A",
                  background: "#fff",
                  appearance: "none",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                {budgetRanges.map((b) => <option key={b}>{b}</option>)}
              </select>
              <ChevronDown size={14} color="#94A3B8" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Payment Mode
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {paymentModes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMode(m.id)}
                  style={{
                    border: `1.5px solid ${paymentMode === m.id ? "#F59E0B" : "#E2E8F0"}`,
                    borderRadius: 10,
                    padding: "12px 8px",
                    background: paymentMode === m.id ? "#FEF3C7" : "#fff",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{m.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: paymentMode === m.id ? "#92400E" : "#64748B" }}>
                    {m.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Preferred Components
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {componentOptions.map((c) => {
                const selected = selectedComponents.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => toggleComponent(c)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 20,
                      border: `1.5px solid ${selected ? "#F59E0B" : "#E2E8F0"}`,
                      background: selected ? "#F59E0B" : "#fff",
                      color: selected ? "#0F172A" : "#64748B",
                      fontSize: 12,
                      fontWeight: selected ? 600 : 400,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.15s",
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Remarks */}
          <div style={{ marginBottom: 32 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Remarks / Notes
            </label>
            <textarea
              placeholder="Any special requirements, access constraints, or notes about this lead..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={4}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1.5px solid #E2E8F0",
                borderRadius: 8,
                fontSize: 13,
                color: "#0F172A",
                background: "#F8FAFC",
                fontFamily: "inherit",
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#F59E0B"; }}
              onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; }}
            />
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12 }}>
            <button
              style={{
                flex: 1,
                padding: "12px 24px",
                border: "1.5px solid #E2E8F0",
                borderRadius: 8,
                background: "#fff",
                color: "#64748B",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#94A3B8";
                (e.currentTarget as HTMLButtonElement).style.color = "#0F172A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E8F0";
                (e.currentTarget as HTMLButtonElement).style.color = "#64748B";
              }}
            >
              Save Lead
            </button>
            <button
              onClick={() => onNavigate("quotations")}
              style={{
                flex: 2,
                padding: "12px 24px",
                border: "none",
                borderRadius: 8,
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                color: "#0F172A",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 2px 8px rgba(245,158,11,0.3)",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(245,158,11,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(245,158,11,0.3)";
              }}
            >
              Save & Generate Quote →
            </button>
          </div>
        </div>

        {/* Right: Preview Card */}
        <div>
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0px 1px 3px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.04)",
              marginBottom: 16,
              position: "sticky",
              top: 80,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A", marginBottom: 16 }}>Lead Preview</div>

            {/* Solar illustration */}
            <div
              style={{
                background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
                borderRadius: 10,
                padding: 16,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Sun size={32} color="#F59E0B" strokeWidth={1.5} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>
                  Recommended System
                </div>
                <div style={{ fontSize: 13, color: "#92400E", fontWeight: 600 }}>
                  {capacity} kW On-Grid {siteType === "residential" ? "Residential" : siteType === "commercial" ? "Commercial" : "Industrial"}
                </div>
              </div>
            </div>

            {/* Price estimate */}
            <div
              style={{
                background: "#ECFDF5",
                border: "1px solid #A7F3D0",
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 12, color: "#065F46", fontWeight: 500 }}>Estimated Range</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#059669" }}>
                ₹{(capacity * 0.42).toFixed(1)}L – ₹{(capacity * 0.54).toFixed(1)}L
              </span>
            </div>

            {/* Customer details preview */}
            {form.name && (
              <div style={{ marginBottom: 16, padding: "12px", background: "#F8FAFC", borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>Customer</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{form.name}</div>
                {form.phone && <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{form.phone}</div>}
              </div>
            )}

            {/* Checklist */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#64748B", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Required Fields
              </div>
              {requiredFields.map(({ label, key }) => {
                const filled = key === "name" ? !!form.name : key === "phone" ? !!form.phone : key === "email" ? !!form.email : key === "address" ? !!form.address : key === "capacity" ? capacity > 0 : !!budget;
                return (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    {filled
                      ? <CheckCircle size={15} color="#10B981" strokeWidth={2} />
                      : <Circle size={15} color="#CBD5E1" strokeWidth={1.5} />}
                    <span style={{ fontSize: 12, color: filled ? "#059669" : "#94A3B8" }}>{label}</span>
                  </div>
                );
              })}

              <div
                style={{
                  marginTop: 14,
                  background: "#F8FAFC",
                  borderRadius: 8,
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 12, color: "#64748B" }}>Completion</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B" }}>
                  {filledCount}/{requiredFields.length}
                </span>
              </div>
              <div style={{ marginTop: 8, height: 6, background: "#E2E8F0", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(filledCount / requiredFields.length) * 100}%`, background: "#F59E0B", borderRadius: 6, transition: "width 0.3s" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </div>
      <div style={{ height: 1, background: "#F1F5F9", marginTop: 8 }} />
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "#F1F5F9", margin: "0 0 24px 0" }} />;
}

function FormField({
  label, placeholder, value, onChange
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "9px 12px",
          border: `1.5px solid ${focused ? "#F59E0B" : "#E2E8F0"}`,
          borderRadius: 8,
          fontSize: 13,
          color: "#0F172A",
          background: "#F8FAFC",
          fontFamily: "inherit",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.15s",
        }}
      />
    </div>
  );
}
