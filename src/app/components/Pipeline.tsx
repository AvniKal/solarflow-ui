import { Plus, Home, Building2, Clock } from "lucide-react";

const stages = [
  { id: "new", label: "New Inquiry", color: "#3B82F6", count: 8 },
  { id: "req", label: "Req. Gathered", color: "#8B5CF6", count: 5 },
  { id: "quoted", label: "Quote Sent", color: "#F59E0B", count: 6 },
  { id: "neg", label: "Negotiation", color: "#F97316", count: 4 },
  { id: "won", label: "Won", color: "#10B981", count: 7 },
  { id: "sched", label: "Install. Sched.", color: "#06B6D4", count: 3 },
  { id: "done", label: "Completed", color: "#64748B", count: 12 },
];

const cards: Record<string, Array<{
  name: string; location: string; capacity: string; siteType: string;
  budget: string; rep: string; repInitials: string; lastActivity: string;
}>> = {
  new: [
    { name: "Dipak Roy", location: "Siliguri", capacity: "3 kW", siteType: "residential", budget: "₹1.8L", rep: "Rahul S.", repInitials: "RS", lastActivity: "2 hrs ago" },
    { name: "Kavita Agarwal", location: "Jalpaiguri", capacity: "5 kW", siteType: "residential", budget: "₹2.6L", rep: "Rahul S.", repInitials: "RS", lastActivity: "5 hrs ago" },
    { name: "BK Traders Pvt.", location: "Siliguri", capacity: "15 kW", siteType: "commercial", budget: "₹7.5L", rep: "Priya D.", repInitials: "PD", lastActivity: "1 day ago" },
  ],
  req: [
    { name: "Suresh Mahato", location: "Darjeeling", capacity: "4 kW", siteType: "residential", budget: "₹2.2L", rep: "Rahul S.", repInitials: "RS", lastActivity: "3 hrs ago" },
    { name: "Ananya Ghosh", location: "Alipurduar", capacity: "7 kW", siteType: "commercial", budget: "₹3.8L", rep: "Priya D.", repInitials: "PD", lastActivity: "Yesterday" },
  ],
  quoted: [
    { name: "Arjun Bhattacharya", location: "Siliguri", capacity: "5 kW", siteType: "residential", budget: "₹2.8L", rep: "Rahul S.", repInitials: "RS", lastActivity: "2 hrs ago" },
    { name: "Ratan Tamang", location: "Kurseong", capacity: "10 kW", siteType: "commercial", budget: "₹5.2L", rep: "Priya D.", repInitials: "PD", lastActivity: "4 hrs ago" },
    { name: "Sujata Mondal", location: "Cooch Behar", capacity: "3 kW", siteType: "residential", budget: "₹1.7L", rep: "Rahul S.", repInitials: "RS", lastActivity: "Yesterday" },
  ],
  neg: [
    { name: "Mithun Barman", location: "Malda", capacity: "8 kW", siteType: "commercial", budget: "₹4.4L", rep: "Priya D.", repInitials: "PD", lastActivity: "6 hrs ago" },
    { name: "Rina Sarkar", location: "Siliguri", capacity: "5 kW", siteType: "residential", budget: "₹2.5L", rep: "Rahul S.", repInitials: "RS", lastActivity: "2 days ago" },
  ],
  won: [
    { name: "Ranjit K. Ghosh", location: "Cooch Behar", capacity: "7 kW", siteType: "residential", budget: "₹3.8L", rep: "Rahul S.", repInitials: "RS", lastActivity: "3 days ago" },
    { name: "Highlands Hotel", location: "Darjeeling", capacity: "25 kW", siteType: "commercial", budget: "₹12L", rep: "Priya D.", repInitials: "PD", lastActivity: "1 day ago" },
    { name: "Amit Dutta", location: "Siliguri", capacity: "4 kW", siteType: "residential", budget: "₹2.3L", rep: "Rahul S.", repInitials: "RS", lastActivity: "2 days ago" },
  ],
  sched: [
    { name: "Kabita Das", location: "Jalpaiguri", capacity: "5 kW", siteType: "residential", budget: "₹2.8L", rep: "Priya D.", repInitials: "PD", lastActivity: "Today" },
    { name: "NK Enterprises", location: "Siliguri", capacity: "20 kW", siteType: "industrial", budget: "₹9.5L", rep: "Rahul S.", repInitials: "RS", lastActivity: "Yesterday" },
  ],
  done: [
    { name: "Puja Aich", location: "Siliguri", capacity: "3 kW", siteType: "residential", budget: "₹1.9L", rep: "Rahul S.", repInitials: "RS", lastActivity: "Last week" },
    { name: "Manoj Gupta", location: "Alipurduar", capacity: "6 kW", siteType: "commercial", budget: "₹3.2L", rep: "Priya D.", repInitials: "PD", lastActivity: "Last week" },
  ],
};

const repColors: Record<string, string> = {
  RS: "#3B82F6",
  PD: "#8B5CF6",
};

export function Pipeline() {
  return (
    <div style={{ padding: "28px 0 28px 28px", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ paddingRight: 28, marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Lead Pipeline</h2>
          <p style={{ margin: "2px 0 0 0", fontSize: 12, color: "#94A3B8" }}>Drag cards to update stage status</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            style={{
              padding: "7px 12px",
              border: "1.5px solid #E2E8F0",
              borderRadius: 8,
              fontSize: 12,
              color: "#64748B",
              background: "#fff",
              fontFamily: "inherit",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option>All Reps</option>
            <option>Rahul S.</option>
            <option>Priya D.</option>
          </select>
          <select
            style={{
              padding: "7px 12px",
              border: "1.5px solid #E2E8F0",
              borderRadius: 8,
              fontSize: 12,
              color: "#64748B",
              background: "#fff",
              fontFamily: "inherit",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option>All Site Types</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Industrial</option>
          </select>
        </div>
      </div>

      {/* Kanban board */}
      <div
        style={{
          display: "flex",
          gap: 14,
          overflowX: "auto",
          paddingBottom: 16,
          paddingRight: 28,
          flex: 1,
        }}
      >
        {stages.map((stage) => {
          const stageCards = cards[stage.id] || [];
          const isWon = stage.id === "won";
          const isDone = stage.id === "done";

          return (
            <div
              key={stage.id}
              style={{
                minWidth: 240,
                width: 240,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Column header */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: "10px 10px 0 0",
                  padding: "12px 14px",
                  borderBottom: `3px solid ${stage.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>{stage.label}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      background: `${stage.color}18`,
                      color: stage.color,
                      borderRadius: 20,
                      padding: "2px 8px",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {stage.count}
                  </span>
                  <button
                    style={{
                      background: "#F1F5F9",
                      border: "none",
                      borderRadius: 6,
                      width: 22,
                      height: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Plus size={12} color="#64748B" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Cards */}
              <div
                style={{
                  background: "#F1F5F9",
                  borderRadius: "0 0 10px 10px",
                  padding: "10px 10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  flex: 1,
                  minHeight: 200,
                }}
              >
                {stageCards.map((card, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: isDone ? "#F8FAFC" : "#fff",
                      borderRadius: 8,
                      padding: "12px",
                      border: isWon
                        ? "1.5px solid #A7F3D0"
                        : isDone
                        ? "1px solid #E2E8F0"
                        : "1px solid #F1F5F9",
                      boxShadow: isWon
                        ? "0 0 0 3px rgba(16,185,129,0.08), 0 1px 4px rgba(0,0,0,0.06)"
                        : "0 1px 4px rgba(0,0,0,0.06)",
                      opacity: isDone ? 0.7 : 1,
                      cursor: "grab",
                      transition: "box-shadow 0.15s, transform 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = isWon
                        ? "0 0 0 3px rgba(16,185,129,0.08), 0 1px 4px rgba(0,0,0,0.06)"
                        : "0 1px 4px rgba(0,0,0,0.06)";
                      (e.currentTarget as HTMLDivElement).style.transform = "none";
                    }}
                  >
                    {/* Customer name */}
                    <div style={{ fontSize: 13, fontWeight: 700, color: isDone ? "#94A3B8" : "#0F172A", marginBottom: 6 }}>
                      {card.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 8 }}>{card.location}</div>

                    {/* Capacity + site type */}
                    <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                      <span
                        style={{
                          background: `${stage.color}14`,
                          color: stage.color,
                          borderRadius: 20,
                          padding: "2px 8px",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {card.capacity}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        {card.siteType === "residential" ? (
                          <Home size={12} color="#94A3B8" strokeWidth={1.5} />
                        ) : (
                          <Building2 size={12} color="#94A3B8" strokeWidth={1.5} />
                        )}
                        <span style={{ fontSize: 11, color: "#94A3B8", textTransform: "capitalize" }}>{card.siteType}</span>
                      </span>
                    </div>

                    {/* Budget */}
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#0F172A",
                        background: "#F8FAFC",
                        borderRadius: 6,
                        padding: "3px 8px",
                        display: "inline-block",
                        marginBottom: 10,
                      }}
                    >
                      {card.budget}
                    </div>

                    {/* Rep + activity */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: repColors[card.repInitials] || "#64748B",
                            color: "#fff",
                            fontSize: 9,
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {card.repInitials}
                        </div>
                        <span style={{ fontSize: 11, color: "#64748B" }}>{card.rep}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Clock size={10} color="#94A3B8" strokeWidth={1.5} />
                        <span style={{ fontSize: 10, color: "#94A3B8" }}>{card.lastActivity}</span>
                      </div>
                    </div>

                    {/* Stage indicator strip */}
                    <div
                      style={{
                        marginTop: 10,
                        height: 3,
                        background: stage.color,
                        borderRadius: 3,
                        opacity: 0.6,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
