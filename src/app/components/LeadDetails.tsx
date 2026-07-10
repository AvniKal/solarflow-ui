import { useState } from "react";
interface LeadDetailsProps {
  lead: any;
  onClose: () => void;
  onSave: (lead: any) => void;
}
export function LeadDetails({
  lead,
  onClose,
  onSave,
}: LeadDetailsProps)  {
  if (!lead) return null;
const [editedLead, setEditedLead] = useState({ ...lead });
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          width: 400,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2>Lead Details</h2>

        <div style={{ marginBottom: 12 }}>
  <label>Name</label>
  <input
    value={editedLead.name}
    onChange={(e) =>
      setEditedLead({
        ...editedLead,
        name: e.target.value,
      })
    }
    style={{
      width: "100%",
      padding: 8,
      marginTop: 4,
    }}
  />
</div>
       <div style={{ marginBottom: 12 }}>
  <label>Location</label>

  <input
    value={editedLead.location}
    onChange={(e) =>
      setEditedLead({
        ...editedLead,
        location: e.target.value,
      })
    }
    style={{
      width: "100%",
      padding: 8,
      marginTop: 4,
    }}
  />
</div>
        <div style={{ marginBottom: 12 }}>
  <label>Capacity</label>

  <input
    value={editedLead.capacity}
    onChange={(e) =>
      setEditedLead({
        ...editedLead,
        capacity: e.target.value,
      })
    }
    style={{
      width: "100%",
      padding: 8,
      marginTop: 4,
    }}
  />
</div>
        <div style={{ marginBottom: 12 }}>
  <label>Budget</label>

  <input
    value={editedLead.budget}
    onChange={(e) =>
      setEditedLead({
        ...editedLead,
        budget: e.target.value,
      })
    }
    style={{
      width: "100%",
      padding: 8,
      marginTop: 4,
    }}
  />
</div>
        <div style={{ marginBottom: 12 }}>
  <label>Status</label>

  <select
    value={editedLead.status}
    onChange={(e) =>
      setEditedLead({
        ...editedLead,
        status: e.target.value,
      })
    }
    style={{
      width: "100%",
      padding: 8,
      marginTop: 4,
    }}
  >
    <option value="New">New</option>
    <option value="Contacted">Contacted</option>
    <option value="Negotiating">Negotiating</option>
    <option value="Quoted">Quoted</option>
    <option value="Won">Won</option>
    <option value="Lost">Lost</option>
  </select>
</div>
        <p><strong>Updated:</strong> {lead.updated}</p>
<button
  onClick={() => onSave(editedLead)}
  style={{
    marginTop: 20,
    marginRight: 10,
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
    background: "#10B981",
    color: "white",
    cursor: "pointer",
  }}
>
  Save Changes
</button>
        <button
          onClick={onClose}
          style={{
            marginTop: 20,
            padding: "10px 20px",
            border: "none",
            borderRadius: 8,
            background: "#F59E0B",
            color: "white",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}