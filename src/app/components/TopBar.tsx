import { Search, Bell, ChevronDown } from "lucide-react";
import { useState } from "react";

interface TopBarProps {
  title: string;
  subtitle?: string;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

export function TopBar({ title, subtitle, searchQuery, onSearchChange }: TopBarProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #E2E8F0",
        padding: "0 32px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left: Title */}
      <div>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ margin: 0, fontSize: 13, color: "#64748B", marginTop: 1 }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Right: Search + Notif + User */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#F8FAFC",
            border: `1px solid ${searchFocused ? "#F59E0B" : "#E2E8F0"}`,
            borderRadius: 8,
            padding: "7px 12px",
            transition: "border-color 0.15s",
          }}
        >
          <Search size={16} color="#94A3B8" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search leads, quotes..."
            value={searchQuery || ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: 13,
              color: "#0F172A",
              width: 200,
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Bell */}
        <button
          style={{
            position: "relative",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: 8,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#F1F5F9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#F8FAFC";
          }}
        >
          <Bell size={17} color="#64748B" strokeWidth={1.5} />
          <span
            style={{
              position: "absolute",
              top: 7,
              right: 7,
              width: 8,
              height: 8,
              background: "#EF4444",
              borderRadius: "50%",
              border: "2px solid #fff",
            }}
          />
        </button>

        {/* User */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: 8,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#F1F5F9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3B82F6, #2563EB)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            RS
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", lineHeight: 1.2 }}>
              Rahul Sharma
            </div>
            <div style={{ fontSize: 11, color: "#64748B", lineHeight: 1.2 }}>
              Sales Executive
            </div>
          </div>
          <ChevronDown size={14} color="#94A3B8" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
