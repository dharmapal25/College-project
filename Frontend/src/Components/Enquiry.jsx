import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import './Enquiry.css'

const Enquiry = () => {

  let readEmail = JSON.parse(localStorage.getItem("user"))

  const [formData, setFormData] = useState({
    email: `${readEmail.email}`,
    location: '',
    category: '',        // ✅ add kiya
    description: '',
    emergency: false,
  })
  
  const [status, setStatus] = useState({ message: '', type: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.location || !formData.description || !formData.category) {
      setStatus({ message: 'Please fill all required fields.', type: 'error' })
      return
    }

    setLoading(true)
    setStatus({ message: '', type: '' })

    try {
      const response = await axios.post(
        'https://college-pro.onrender.com/api/user-enquiry',
        // "http://localhost:3000/api/user-enquiry",
        {
          email: formData.email,
          location: formData.location,
          category: formData.category, 
          description: formData.description,
          Emergency: formData.emergency,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
        
      )

      setStatus({
        message: response.data.message || 'Enquiry submitted successfully.',
        type: 'success'
      })

      
      setFormData({ email: `${readEmail.email}`, location: '', category: '', description: '', emergency: false })

    } catch (error) {
      setStatus({
        message:
          error?.response?.data?.message ||
          error.message ||
          'Something went wrong.',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="enquiry-page">
      <Navbar />
      <main className="enquiry-container">
        <h1>Enquiry Form</h1>

        <form className="enquiry-form" onSubmit={handleSubmit}>

          <label>
            Email
            <input
            readOnly
            className='read'
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="email@example.com"
            />
          </label>

          <label>
            Location
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Your location"
            />
          </label>

        
          <label>
            Category
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="academic">Academic</option>
              <option value="hostel">Hostel</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your issue"
              rows={5}
            />
          </label>

          <label className="checkbox-field">
            <input
              type="checkbox"
              name="emergency"
              checked={formData.emergency}
              onChange={handleChange}
            />
            Emergency
          </label>

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Enquiry'}
          </button>

          {status.message && (
            <p className={`status-message ${status.type}`}>{status.message}</p>
          )}

        </form>
      </main>
    </div>
  )
}

export default Enquiry