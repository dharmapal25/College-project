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
  const [formData, setFormData] = useState({
    username: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    category: 'infrastructure'
  });
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/officers-login');
    } else {
      setAdminToken(token);
      loadOfficers();
      loadEnquiries();
    }
  }, [navigate]);

  const loadEnquiries = () => {
    axios.get('https://college-pro.onrender.com/enquiries/all-enquiries', { withCredentials: true })
      .then(response => {
        setEnquiries(response.data.logs);
        console.log('Total enquiries:', response.data.total);
        console.log(response.data.logs);
      })
      .catch(error => {
        console.error('Error fetching enquiries:', error);
      });
  };

  const loadOfficers = () => {
    axios.get('https://college-pro.onrender.com/officers-team/officers')
      .then(response => {
        setOfficers(response.data.officers || []);
      })
      .catch(error => {
        console.error('Error fetching officers:', error);
      });
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddOfficer = async (e) => {
    e.preventDefault();
    setFormStatus({ message: '', type: '' });
    setLoading(true);

    try {
      const response = await axios.post(
        'https://college-pro.onrender.com/officers-team/add-officer',
        {
          username: formData.username,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          category: formData.category
        },
        { withCredentials: true }
      );

      setFormStatus({
        message: 'Officer added successfully!',
        type: 'success'
      });

      // Reset form
      setFormData({
        username: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        category: 'infrastructure'
      });

      // Reload officers
      loadOfficers();

      // Switch back to officers tab after 2 seconds
      setTimeout(() => {
        setActiveTab('officers');
      }, 2000);
    } catch (error) {
      setFormStatus({
        message: error.response?.data?.message || error.message || 'Failed to add officer',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };



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

          {/* Add Officer form */}
            <button
            className={`admin-menu-item ${activeTab === 'add-officer' ? 'active' : ''}`}
            onClick={() => setActiveTab('add-officer')}
            >
              Add Officer
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
            ) : activeTab === 'add-officer' ? (
              // Add Officer Form
              <div className='admin-section'>
                <h2>Add New Officer</h2>
                <form onSubmit={handleAddOfficer} className='admin-officer-form'>
                  <div className='admin-form-group'>
                    <label>First Name *</label>
                    <input
                      type='text'
                      name='username'
                      value={formData.username}
                      onChange={handleFormChange}
                      placeholder='Enter first name'
                      required
                    />
                  </div>

                  <div className='admin-form-group'>
                    <label>Last Name *</label>
                    <input
                      type='text'
                      name='lastname'
                      value={formData.lastname}
                      onChange={handleFormChange}
                      placeholder='Enter last name'
                      required
                    />
                  </div>

                  <div className='admin-form-group'>
                    <label>Email *</label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder='Enter email'
                      required
                    />
                  </div>

                  <div className='admin-form-group'>
                    <label>Password *</label>
                    <input
                      type='password'
                      name='password'
                      value={formData.password}
                      onChange={handleFormChange}
                      placeholder='Enter password'
                      required
                    />
                  </div>

                  <div className='admin-form-group'>
                    <label>Phone Number *</label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder='Enter phone number'
                      required
                    />
                  </div>

                  <div className='admin-form-group'>
                    <label>Category *</label>
                    <select
                      name='category'
                      value={formData.category}
                      onChange={handleFormChange}
                      required
                    >
                      <option value='infrastructure'>Infrastructure</option>
                      <option value='academic'>Academic</option>
                      <option value='hostel'>Hostel</option>
                      <option value='other'>Other</option>
                    </select>
                  </div>

                  {formStatus.message && (
                    <div className={`admin-form-status ${formStatus.type}`}>
                      {formStatus.message}
                    </div>
                  )}

                  <button
                    type='submit'
                    className='admin-submit-btn'
                    disabled={loading}
                  >
                    {loading ? 'Adding Officer...' : 'Add Officer'}
                  </button>
                </form>
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
                        <th>Category</th>
                        <th>Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {officers.map(o => (
                        <tr key={o.id}>
                          <td>{o.id}</td>
                          <td>{o.name}</td>
                          <td>{o.email}</td>
                          <td>{o.category}</td>
                          <td>{o.phone}</td>
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
