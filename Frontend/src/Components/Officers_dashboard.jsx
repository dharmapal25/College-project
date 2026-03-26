import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Officers_dashboard.css'

const Officers_dashboard = () => {
  const navigate = useNavigate()
  const [enquiries, setEnquiries] = useState([])
  const [officer, setOfficer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Get officer info from localStorage
    const storedOfficerToken = localStorage.getItem('officerToken')
    const storedOfficerData = JSON.parse(localStorage.getItem('officerData') || '{}')

    if (!storedOfficerToken) {
      navigate('/officers-login')
      return
    }

    setOfficer(storedOfficerData)

    // Fetch enquiries by officer's category
    const fetchEnquiries = async () => {
      try {
        setLoading(true)
        setError('')

        // Use category endpoint to get filtered enquiries
        const response = await axios.get(
          `https://college-pro.onrender.com/api/logs/category/${storedOfficerData.category}`,
          {
            headers: {
              'Authorization': `Bearer ${storedOfficerToken}`
            },
            withCredentials: true
          }
        )

        setEnquiries(response.data.logs || [])
      } catch (err) {
        console.error('Error fetching enquiries:', err)
        if (err.response?.status === 401) {
          navigate('/officers-login')
        } else {
          setError(
            err.response?.data?.message ||
            err.message ||
            'Failed to fetch enquiries'
          )
        }
      } finally {
        setLoading(false)
      }
    }

    fetchEnquiries()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('officerToken')
    localStorage.removeItem('officerEmail')
    localStorage.removeItem('officerName')
    localStorage.removeItem('officerData')
    navigate('/officers-login')
  }

  const updateEnquiryStatus = async (enquiryId, newStatus) => {
    try {
      const storedOfficerToken = localStorage.getItem('officerToken')
      
      const response = await axios.put(
        `https://college-pro.onrender.com/api/logs/logs/${enquiryId}/status`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${storedOfficerToken}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )

      if (response.data.success) {
        // Update local state
        setEnquiries(prevEnquiries =>
          prevEnquiries.map(enquiry =>
            enquiry._id === enquiryId || enquiry.id === enquiryId
              ? { ...enquiry, status: newStatus }
              : enquiry
          )
        )
      }
    } catch (err) {
      console.error('Error updating enquiry status:', err)
      alert(err.response?.data?.message || 'Failed to update status')
    }
  }

  const handleMarkInProgress = (enquiryId) => {
    updateEnquiryStatus(enquiryId, 'in-progress')
  }

  const handleMarkResolved = (enquiryId) => {
    updateEnquiryStatus(enquiryId, 'resolved')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#fed7d7'
      case 'in-progress':
        return '#bee3f8'
      case 'resolved':
        return '#c6f6d5'
      default:
        return '#e2e8f0'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending'
      case 'in-progress':
        return 'In Progress'
      case 'resolved':
        return 'Resolved'
      default:
        return status
    }
  }

  const filteredEnquiries =
    filter === 'all'
      ? enquiries
      : enquiries.filter(e => e.status === filter)

  if (loading) {
    return (
      <div className='officers-dashboard-loading'>
        <p>Loading enquiries...</p>
      </div>
    )
  }

  return (
    <div className='officers-dashboard-container'>
      {/* Header */}
      <div className='officers-dashboard-header'>
        <div className='header-content'>
          <h1>Officers Dashboard</h1>
          {officer && (
            <p className='officer-info'>
              Officer: {officer.name} | Category: {officer.category}
            </p>
          )}
        </div>
        <button onClick={handleLogout} className='logout-button'>
          Logout
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className='error-message'>
          <p>{error}</p>
        </div>
      )}

      {/* Stats */}
      {officer && (
        <div className='officers-stats'>
          <div className='stat-card'>
            <span className='stat-number'>
              {filteredEnquiries.length}
            </span>
            <span className='stat-label'>Total Enquiries</span>
          </div>
          <div className='stat-card'>
            <span className='stat-number'>
              {filteredEnquiries.filter(e => e.status === 'pending').length}
            </span>
            <span className='stat-label'>Pending</span>
          </div>
          <div className='stat-card'>
            <span className='stat-number'>
              {filteredEnquiries.filter(e => e.status === 'in-progress').length}
            </span>
            <span className='stat-label'>In Progress</span>
          </div>
          <div className='stat-card'>
            <span className='stat-number'>
              {filteredEnquiries.filter(e => e.status === 'resolved').length}
            </span>
            <span className='stat-label'>Resolved</span>
          </div>
        </div>
      )}

      {/* Filter Buttons */}
      <div className='officers-filters'>
        {['all', 'pending', 'in-progress', 'resolved'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
          >
            {f === 'all'
              ? 'All'
              : f === 'in-progress'
              ? 'In Progress'
              : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Enquiries List */}
      <div className='officers-enquiries-list'>
        {filteredEnquiries.length === 0 ? (
          <div className='no-enquiries'>
            <p>No enquiries found for your category ({officer?.category})</p>
          </div>
        ) : (
          filteredEnquiries.map(enquiry => (
            <div
              key={enquiry._id || enquiry.id}
              className='enquiry-card'
              style={{ borderLeft: `4px solid ${getStatusColor(enquiry.status)}` }}
            >
              <div className='enquiry-header'>
                <div className='enquiry-title'>
                  <h3>{enquiry.category}</h3>
                  <span
                    className='status-badge'
                    style={{ backgroundColor: getStatusColor(enquiry.status) }}
                  >
                    {getStatusLabel(enquiry.status)}
                  </span>
                </div>
                <p className='enquiry-date'>
                  {new Date(enquiry.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className='enquiry-body'>
                <p className='enquiry-email'>
                  <strong>Email:</strong> {enquiry.email}
                </p>
                <p className='enquiry-location'>
                  <strong>Location:</strong> {enquiry.location}
                </p>
                <p className='enquiry-description'>
                  <strong>Description:</strong> {enquiry.description}
                </p>
                {enquiry.Emergency && (
                  <p className='enquiry-emergency'>
                    <strong>⚠️ Emergency</strong>
                  </p>
                )}
              </div>

              <div className='enquiry-actions'>
                <button 
                  className='action-btn in-progress-btn'
                  onClick={() => handleMarkInProgress(enquiry._id || enquiry.id)}
                  disabled={enquiry.status === 'in-progress' || enquiry.status === 'resolved'}
                >
                  Mark In Progress
                </button>
                <button 
                  className='action-btn resolved-btn'
                  onClick={() => handleMarkResolved(enquiry._id || enquiry.id)}
                  disabled={enquiry.status === 'resolved'}
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Officers_dashboard