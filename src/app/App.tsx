import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./components/Dashboard";
import { NewLeadForm } from "./components/NewLeadForm";
import { QuotationView } from "./components/QuotationView";
import { Pipeline } from "./components/Pipeline";
import { InstallationSchedule } from "./components/InstallationSchedule";
import { ServiceSupport } from "./components/ServiceSupport";

const screenMeta: Record<string, { title: string; subtitle?: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Welcome back, Rahul 👋" },
  leads: { title: "Leads", subtitle: "Capture and manage solar sales leads" },
  quotations: { title: "Quotation", subtitle: "Quote #QT-2026-0142 — Arjun Bhattacharya" },
  pipeline: { title: "Pipeline", subtitle: "Track leads across all stages" },
  installations: { title: "Installations", subtitle: "Schedule and manage solar installations" },
  service: { title: "Service & Support", subtitle: "Post-installation support tickets" },
  reports: { title: "Reports", subtitle: "Analytics and performance insights" },
  settings: { title: "Settings", subtitle: "Account and system preferences" },
};

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <div style={{ padding: 64, textAlign: "center", color: "#94A3B8" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14 }}>This screen is coming soon.</div>
    </div>
  );
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState("dashboard");

  const meta = screenMeta[activeScreen] || { title: activeScreen };

  const renderScreen = () => {
    switch (activeScreen) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveScreen} />;
      case "leads":
        return <NewLeadForm onNavigate={setActiveScreen} />;
      case "quotations":
        return <QuotationView />;
      case "pipeline":
        return <Pipeline />;
      case "installations":
        return <InstallationSchedule />;
      case "service":
        return <ServiceSupport />;
      default:
        return <PlaceholderScreen title={meta.title} />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        background: "#F8FAFC",
      }}
    >
      <Sidebar activeScreen={activeScreen} onNavigate={setActiveScreen} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <TopBar title={meta.title} subtitle={meta.subtitle} />
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
          }}
        >
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}
