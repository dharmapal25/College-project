import React, { useState } from "react";
import "./Officers-admin.css";

const statsData = [
  { number: 12, label: "Total" },
  { number: 4,  label: "Pending" },
  { number: 6,  label: "Resolved" },
  { number: 2,  label: "In Progress" },
];

const complaintsData = [
  {
    id: "EQ-001",
    subject: "Road repair near Sector 4",
    category: "Civil",
    date: "23 Mar 2026",
    status: "pending",
  },
  {
    id: "EQ-002",
    subject: "Water supply disruption",
    category: "Water",
    date: "22 Mar 2026",
    status: "progress",
  },
  {
    id: "EQ-003",
    subject: "Street light not working",
    category: "Electricity",
    date: "21 Mar 2026",
    status: "resolved",
  },
  {
    id: "EQ-004",
    subject: "Garbage not collected for 3 days",
    category: "Sanitation",
    date: "20 Mar 2026",
    status: "pending",
  },
  {
    id: "EQ-005",
    subject: "Property tax refund issue",
    category: "Revenue",
    date: "19 Mar 2026",
    status: "resolved",
  },
];

const statusMap = {
  pending:  { label: "Pending",     cls: "complaint-row__status--pending"  },
  resolved: { label: "Resolved",    cls: "complaint-row__status--resolved" },
  progress: { label: "In Progress", cls: "complaint-row__status--progress" },
};

const All_enquiries = () => {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? complaintsData
      : complaintsData.filter((c) => c.status === filter);

  return (
    <div className="all-enquiries">
      <title>All Enquiries</title>
      <div className="all-enquiries__header">
        <h2 className="all-enquiries__title">All Enquiries</h2>

        <div style={{ display: "flex", gap: "8px" }}>
          {["all", "pending", "progress", "resolved"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: "1.5px solid",
                borderColor: filter === f ? "#1a1a1a" : "#e0e0e0",
                background: filter === f ? "#1a1a1a" : "#fff",
                color: filter === f ? "#fff" : "#555",
                fontFamily: "inherit",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.15s ease",
                textTransform: "capitalize",
              }}
            >
              {f === "all" ? "All" : f === "progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="all-enquiries__stats">
        {statsData.map((s) => (
          <div key={s.label} className="enquiry-stat-card">
            <span className="enquiry-stat-card__number">{s.number}</span>
            <span className="enquiry-stat-card__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Complaints table */}
      <div className="all-enquiries__complaints-box">
        <div className="complaints-box__header">
          <h3 className="complaints-box__title">Complaints</h3>
          <span style={{ fontSize: "13px", color: "#888" }}>
            {filtered.length} record{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="complaints-box__body">
          {filtered.length === 0 ? (
            <div className="complaints-box__empty">No complaints found.</div>
          ) : (
            filtered.map((c) => {
              const s = statusMap[c.status];
              return (
                <div key={c.id} className="complaint-row">
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span className="complaint-row__id">{c.id}</span>
                    <span className="complaint-row__subject">{c.subject}</span>
                  </div>
                  <span className="complaint-row__category">{c.category}</span>
                  <span className="complaint-row__date">{c.date}</span>
                  <span className={`complaint-row__status ${s.cls}`}>{s.label}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default All_enquiries;