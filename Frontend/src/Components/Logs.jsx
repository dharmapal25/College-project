import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Logs.css'
import Navbar from './Navbar'

const Logs = () => {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const loadLogs = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await axios.get('https://college-pro.onrender.com/api/logs/logs', {
                withCredentials: true,
            })
            setLogs(response.data.logs || [])
        } catch (err) {
            setError((err.response && err.response.data && err.response.data.message) || err.message || 'Unable to fetch logs')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadLogs()
    }, [])

    const deleteLog = async (id) => {
        try {
            await axios.delete(`https://college-pro.onrender.com/api/logs/logs/${id}`, {
                withCredentials: true,
            })
            
            setLogs((prev) => prev.filter((log) => (log._id || log.id) !== id))
        } catch (err) {
            setError('Failed to delete log')
        }
    }

    return (
        <div className="logs-main-container">
                <title>My Enquiries</title>
            <Navbar />
            <div className="logs-page">
                <div className="logs-header">
                    <h1>My Enquiries</h1>
                </div>

                {loading && <p className="logs-loading">Loading your enquiries...</p>}
                {error && <p className="logs-error">{error}</p>}

                <div className="logs-list">
                    {!loading && logs.length === 0 && <p className="logs-empty">No enquiry logs found.</p>}

                    {logs.map((log) => {
                        const id = log._id || log.id
                        const status = log.status || 'pending'

                        return (
                            <div key={id} className="logs-card">
                                <div className="logs-row">
                                    <span className="logs-label">Category:</span>
                                    <span className="logs-value">{log.category || 'N/A'}</span>
                                </div>
                                <div className="logs-row">
                                    <span className="logs-label">Location:</span>
                                    <span className="logs-value">{log.location}</span>
                                </div>
                                <div className="logs-row">
                                    <span className="logs-label">Description:</span>
                                    <span className="logs-value">{log.description}</span>
                                </div>
                                <div className="logs-row">
                                    <span className="logs-label">Emergency:</span>
                                    <span className="logs-value">{String(log.Emergency || log.emergency || false)}</span>
                                </div>
                                <div className="logs-row status-row">
                                    <span className={`status ${status}`}>{status}</span>
                                </div>
                                <button className="logs-delete delete-btn" onClick={() => deleteLog(id)}>
                                    Delete
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Logs