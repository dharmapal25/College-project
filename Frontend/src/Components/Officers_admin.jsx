import React from "react";
import "./Officers-admin.css";

const officersData = [
  {
    id: 1,
    username: "Rajesh Kumar",
    completedCount: 24,
    category: "Civil",
    total: 31,
    email: "rajesh.kumar@gov.in",
    phone: "+91 98765 43210",
  },
  {
    id: 2,
    username: "Priya Sharma",
    completedCount: 18,
    category: "Revenue",
    total: 22,
    email: "priya.sharma@gov.in",
    phone: "+91 91234 56789",
  },
  {
    id: 3,
    username: "Amit Singh",
    completedCount: 9,
    category: "Water",
    total: 15,
    email: "amit.singh@gov.in",
    phone: "+91 87654 32109",
  },
  {
    id: 4,
    username: "Sunita Verma",
    completedCount: 33,
    category: "Electricity",
    total: 40,
    email: "sunita.verma@gov.in",
    phone: "+91 99887 76655",
  },
];

const OfficerCard = ({ officer }) => {
  const progress = Math.round((officer.completedCount / officer.total) * 100);

  return (
    <div className="officer-card">
      <title>Officer Details</title>
      <div className="officer-card__header">
        <div className="officer-card__avatar">
          {officer.username.charAt(0)}
        </div>
        <div className="officer-card__header-info">
          <span className="officer-card__username">{officer.username}</span>
          <span className="officer-card__completed">
            ✓ {officer.completedCount} completed
          </span>
        </div>
      </div>

      <div className="officer-card__progress-bar">
        <div
          className="officer-card__progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="officer-card__details">
        <div className="officer-card__detail-row">
          <span className="officer-card__detail-label">Category</span>
          <span className="officer-card__detail-value officer-card__category">
            {officer.category}
          </span>
        </div>
        <div className="officer-card__detail-row">
          <span className="officer-card__detail-label">Total Assigned</span>
          <span className="officer-card__detail-value">{officer.total}</span>
        </div>
        <div className="officer-card__detail-row">
          <span className="officer-card__detail-label">Email</span>
          <span className="officer-card__detail-value officer-card__email">
            {officer.email}
          </span>
        </div>
        <div className="officer-card__detail-row">
          <span className="officer-card__detail-label">Phone</span>
          <span className="officer-card__detail-value">{officer.phone}</span>
        </div>
      </div>
    </div>
  );
};

const Officers_admin = () => {
  return (
    <div className="officers-admin">
      <div className="officers-admin__header">
        <h2 className="officers-admin__title">All Officers</h2>
        <span className="officers-admin__count">{officersData.length} officers</span>
      </div>
      <div className="officers-admin__grid">
        {officersData.map((officer) => (
          <OfficerCard key={officer.id} officer={officer} />
        ))}
      </div>
    </div>
  );
};

export default Officers_admin;