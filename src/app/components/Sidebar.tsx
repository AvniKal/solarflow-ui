import { useState } from "react";
import {
  LayoutDashboard, Users, FileText, Kanban, Zap, Headphones,
  BarChart2, Settings, Sun, ChevronLeft, ChevronRight
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Leads", id: "leads" },
  { icon: FileText, label: "Quotations", id: "quotations" },
  { icon: Kanban, label: "Pipeline", id: "pipeline" },
  { icon: Zap, label: "Installations", id: "installations" },
  { icon: Headphones, label: "Service & Support", id: "service" },
  { icon: BarChart2, label: "Reports", id: "reports" },
  { icon: Settings, label: "Settings", id: "settings" },
];

interface SidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function Sidebar({ activeScreen, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? 72 : 260,
        minWidth: collapsed ? 72 : 260,
        background: "#0F172A",
        transition: "width 0.2s ease, min-width 0.2s ease",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? "20px 0" : "20px 20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid #1E293B",
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Sun size={20} color="#0F172A" strokeWidth={2} />
        </div>
        {!collapsed && (
          <div>
            <div style={{ color: "#F8FAFC", fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>
              SolarFlow
            </div>
            <div style={{ color: "#64748B", fontSize: 11, fontWeight: 500 }}>
              Sales CRM
            </div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {navItems.map(({ icon: Icon, label, id }) => {
          const isActive = activeScreen === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              title={collapsed ? label : undefined}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: collapsed ? "10px 0" : "10px 16px",
                justifyContent: collapsed ? "center" : "flex-start",
                background: isActive ? "rgba(245, 158, 11, 0.12)" : "transparent",
                borderLeft: isActive ? "3px solid #F59E0B" : "3px solid transparent",
                color: isActive ? "#F59E0B" : "#94A3B8",
                cursor: "pointer",
                border: "none",
                borderRadius: 0,
                transition: "all 0.15s ease",
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "#1E293B";
                  (e.currentTarget as HTMLButtonElement).style.color = "#F8FAFC";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
                }
              }}
            >
              <Icon size={20} strokeWidth={1.5} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom: User card */}
      {!collapsed && (
        <div
          style={{
            borderTop: "1px solid #1E293B",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3B82F6, #2563EB)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            RS
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#F8FAFC", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Rahul Sharma
            </div>
            <div style={{ color: "#64748B", fontSize: 11 }}>Sales Executive</div>
          </div>
          <Settings size={16} color="#64748B" strokeWidth={1.5} style={{ flexShrink: 0 }} />
        </div>
      )}

      {collapsed && (
        <div
          style={{
            borderTop: "1px solid #1E293B",
            padding: "12px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3B82F6, #2563EB)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            RS
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          background: "#1E293B",
          border: "none",
          color: "#64748B",
          padding: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          gap: 6,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#F8FAFC";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#64748B";
        }}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        {!collapsed && <span style={{ fontSize: 12 }}>Collapse</span>}
      </button>
    </aside>
  );
}
