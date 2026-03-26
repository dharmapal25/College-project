import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Officers.css'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const Officers = () => {
  const [officers, setOfficers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const Navigate = useNavigate()

  const fetchOfficers = async () => {
    setLoading(true)
    setError('')
    try {
      // const response = await axios.get('https://college-pro.onrender.com/officers-team/officers', { withCredentials: true })
      const response = await axios.get('https://college-pro.onrender.com/api/officers-team', { withCredentials: true })
      setOfficers(response.data.officers || [])
    } catch (err) {
      console.error(err)
      setError((err.response && err.response.data && err.response.data.message) || err.message || 'Failed to load officers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOfficers()
  }, [])

  const officersLogin = () => {
    Navigate('/officers-login');
  }

  return (
    <>
      <div className="officers-container">


        <Navbar />
        <div className="officers-page">
          <div className="officers-header">
            <h1>Officers</h1>
            <button onClick={officersLogin} className="officers-login-button" >Login Officers</button>
          </div>

          {loading && <p className="officers-loading">Loading officers...</p>}
          {error && <p className="officers-error">{error}</p>}

          <div className="officers-grid">
            {officers.map((officer) => (
              <div key={officer.id} className="officer-card">
                <img src={officer.image} alt={officer.email} className="officer-image" />
                <div className="officer-data">
                  <p className="officer-name">{officer.name || officer.email}</p>
                  <p className="officer-email">{officer.email}</p>
                  <p className="officer-category">Category: {officer.category || 'officer'}</p>
                </div>
              </div>
            ))}
          </div>

          {!loading && !error && officers.length === 0 && (
            <p className="officers-empty">No officers found.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Officers