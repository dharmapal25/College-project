import React, { useState, useEffect } from 'react'
import "./Dashboard.css"
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {

  const [userLogindata, setUserLogindata] = useState(null);

  const loginLocationData = useLocation();

  useEffect(() => {
    const stateData = loginLocationData.state;

    if (stateData && stateData.user) {
      
      setUserLogindata(stateData);
      
      localStorage.setItem("user", JSON.stringify(stateData.user));
    } else {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUserLogindata({ user: JSON.parse(stored) });
      }
    }

  }, [loginLocationData]);

  // ✅ Loading state — user null ho toh crash na ho
  if (!userLogindata || !userLogindata.user) {
    return <p>Loading...</p>;
  }

  const user = userLogindata.user;

  return (
    <>
      <div className="main-all-div-container">

        <Navbar />

        <div className="dashboard-container">

          <div className="dashboard-header">
            <div className="header-content">
              <h2>Welcome to Dashboard</h2>
              {/* ✅ logical OR use karo */}
              <p className="user-email">Email: {user.email}</p>
            </div>
          </div>

          <div className="stats-user-div">

            <div className="user-notification">

              <div className="user-info-div">
                <h1>Username: {user.username}</h1>
                <h1>Email: {user.email}</h1>
              </div>

              <div className="complaints-section">
                <h3>Your Complaints</h3>
                <div className="empty-state">
                  <p>No complaints yet. Create your first complaint!</p>
                </div>
              </div>

            </div>

            <div className="counts-progress">
              <div className="stats-section">
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Total Complaints</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Pending</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Resolved</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">In Progress</div>
                </div>
              </div>

              <div className="progress-section">
                <h3>Your Progress</h3>
                <div className="empty-state">
                  <p>No progress yet. Create your first complaint!</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;