import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Admin_dashboard.css"
import axios from 'axios';

const Admin_dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('enquiries');
  const [enquiries, setEnquiries] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/officers-login');
    } else {
      setAdminToken(token);
      // Load mock data
      loadMockData();
    }
  }, [navigate]);

  const loadMockData = () => {
    // Mock enquiries data
    // setEnquiries([
    //   { id: 1, email: 'user1@test.com', location: 'Ward 1', description: 'Road issue', status: 'pending' },
    //   { id: 2, email: 'user2@test.com', location: 'Ward 2', description: 'Water supply', status: 'in-progress' },
    //   { id: 3, email: 'user3@test.com', location: 'Ward 3', description: 'Street light', status: 'resolved' },
    // ]);

    // Mock officers data
    setOfficers([
      { id: 1, name: 'Officer 1', email: 'officer1@college.com', department: 'Roads' },
      { id: 2, name: 'Officer 2', email: 'officer2@college.com', department: 'Water Supply' },
      { id: 3, name: 'Officer 3', email: 'officer3@college.com', department: 'Sanitation' },
    ]);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/officers-login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#fed7d7';
      case 'in-progress': return '#bee3f8';
      case 'resolved': return '#c6f6d5';
      default: return '#e2e8f0';
    }
  };

  useEffect(() => {
    axios.get('https://college-pro.onrender.com/enquiries/logs')
      .then(response => {
        setEnquiries(response.data.logs);
        console.log(response.data.logs);
      })
      .catch(error => {
        console.error('Error fetching enquiries:', error);
      });
  }, []);



  return (
    <div className='admin-dashboard'>
      {/* Navigation Bar */}
      <nav className='admin-navbar'>
        <div className='admin-nav-container'>
          <div className='admin-logo'>
            <h1>College Pro Admin</h1>
          </div>
          <button className='admin-logout-btn' onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className='admin-content'>
        {/* Sidebar */}
        <aside className='admin-sidebar'>
          <div className='admin-sidebar-menu'>
            <button
              className={`admin-menu-item ${activeTab === 'enquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('enquiries')}
            >
              All Enquiries
            </button>
            <button
              className={`admin-menu-item ${activeTab === 'officers' ? 'active' : ''}`}
              onClick={() => setActiveTab('officers')}
            >
              All Officers
            </button>
          </div>
        </aside>

        {/* Main Area */}
        <main className='admin-main'>
          {/* Stats Section */}
          <div className='admin-stats'>
            <div className='admin-stat-card'>
              <div className='admin-stat-number'>{enquiries.length}</div>
              <div className='admin-stat-label'>Total Enquiries</div>
            </div>
            <div className='admin-stat-card'>
              <div className='admin-stat-number'>{enquiries.filter(e => e.status === 'pending').length}</div>
              <div className='admin-stat-label'>Pending</div>
            </div>
            <div className='admin-stat-card'>
              <div className='admin-stat-number'>{enquiries.filter(e => e.status === 'in-progress').length}</div>
              <div className='admin-stat-label'>In Progress</div>
            </div>
            <div className='admin-stat-card'>
              <div className='admin-stat-number'>{enquiries.filter(e => e.status === 'resolved').length}</div>
              <div className='admin-stat-label'>Resolved</div>
            </div>
          </div>

          {/* Content Area */}
          <div className='admin-content-area'>
            {activeTab === 'enquiries' ? (
              // Enquiries Section
              <div className='admin-section'>
                <h2>All Enquiries</h2>
                <div className='admin-table-container'>
                  <table className='admin-table'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.map(e => (
                        <tr key={e.id}>
                          <td>{e.id}</td>
                          <td>{e.email}</td>
                          <td>{e.location}</td>
                          <td>{e.description}</td>
                          <td>
                            <span 
                              className='admin-status-badge'
                              style={{ backgroundColor: getStatusColor(e.status) }}
                            >
                              {e.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              // Officers Section
              <div className='admin-section'>
                <h2>All Officers</h2>
                <div className='admin-table-container'>
                  <table className='admin-table'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                      </tr>
                    </thead>
                    <tbody>
                      {officers.map(o => (
                        <tr key={o.id}>
                          <td>{o.id}</td>
                          <td>{o.name}</td>
                          <td>{o.email}</td>
                          <td>{o.department}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin_dashboard;
