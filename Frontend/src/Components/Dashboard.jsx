import React, { useState, useEffect } from 'react'
import "./Dashboard.css"
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {

  const [userLogindata, setUserLogindata] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });
  const [loading, setLoading] = useState(true);

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

  // Fetch user's complaints from MongoDB
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await axios.get(
          'https://college-pro.onrender.com/api/logs/logs',
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true
          }
        );

        const userComplaints = response.data.logs || [];
        setComplaints(userComplaints);

        // Calculate counts
        const totalCount = userComplaints.length;
        const pendingCount = userComplaints.filter(c => c.status === 'pending').length;
        const inProgressCount = userComplaints.filter(c => c.status === 'in-progress').length;
        const resolvedCount = userComplaints.filter(c => c.status === 'resolved').length;

        setCounts({
          total: totalCount,
          pending: pendingCount,
          inProgress: inProgressCount,
          resolved: resolvedCount
        });
      } catch (err) {
        console.error('Error fetching complaints:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userLogindata?.user?.email) {
      fetchComplaints();
    }
  }, [userLogindata]);

  // ✅ Loading state — user null ho toh crash na ho
  if (!userLogindata || !userLogindata.user) {
    return <p>Loading...</p>;
  }

  const user = userLogindata.user;

  return (
    <>
      <div className="main-all-div-container">
        <title>Dashboard</title>
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
                {loading ? (
                  <div className="empty-state">
                    <p>Loading complaints...</p>
                  </div>
                ) : complaints.length === 0 ? (
                  <div className="empty-state">
                    <p>No complaints yet. Create your first complaint!</p>
                  </div>
                ) : (
                  <div className="complaints-list">
                    {complaints.slice(0, 5).map((complaint) => (
                      <div key={complaint._id || complaint.id} className="complaint-item">
                        <div className="complaint-header">
                          <span className="complaint-category">{complaint.category}</span>
                          <span className={`complaint-status status-${complaint.status}`}>
                            {complaint.status}
                          </span>
                        </div>
                        <p className="complaint-location">{complaint.location}</p>
                        <p className="complaint-date">
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="counts-progress">
              <div className="stats-section">
                <div className="stat-card">
                  <div className="stat-number">{counts.total}</div>
                  <div className="stat-label">Total Complaints</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{counts.pending}</div>
                  <div className="stat-label">Pending</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{counts.resolved}</div>
                  <div className="stat-label">Resolved</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{counts.inProgress}</div>
                  <div className="stat-label">In Progress</div>
                </div>
              </div>

              <div className="progress-section">
                <h3>Your Progress</h3>
                {loading ? (
                  <div className="empty-state">
                    <p>Loading progress...</p>
                  </div>
                ) : counts.total === 0 ? (
                  <div className="empty-state">
                    <p>No progress yet. Create your first complaint!</p>
                  </div>
                ) : (
                  <div className="progress-bar-container">
                    <div className="progress-item">
                      <label>Resolved</label>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill resolved"
                          style={{ width: `${(counts.resolved / counts.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{counts.resolved}/{counts.total}</span>
                    </div>
                    <div className="progress-item">
                      <label>In Progress</label>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill in-progress"
                          style={{ width: `${(counts.inProgress / counts.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{counts.inProgress}/{counts.total}</span>
                    </div>
                    <div className="progress-item">
                      <label>Pending</label>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill pending"
                          style={{ width: `${(counts.pending / counts.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{counts.pending}/{counts.total}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;