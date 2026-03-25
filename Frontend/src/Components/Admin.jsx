import React, { useState } from 'react'
import './Admin.css'

const mockEnquiries = [
    { id: 1, email: 'user1@gmail.com', category: 'infrastructure', location: 'Lucknow', description: 'Road broken near market', status: 'pending', emergency: true, createdAt: '2025-01-10' },
    { id: 2, email: 'user2@gmail.com', category: 'academic', location: 'Kanpur', description: 'Library books not available', status: 'progress', emergency: false, createdAt: '2025-01-11' },
    { id: 3, email: 'user3@gmail.com', category: 'hostel', location: 'Varanasi', description: 'Water supply issue in block B', status: 'completed', emergency: true, createdAt: '2025-01-12' },
    { id: 4, email: 'user4@gmail.com', category: 'other', location: 'Agra', description: 'Electricity problem in lab', status: 'closed', emergency: false, createdAt: '2025-01-13' },
    { id: 5, email: 'user5@gmail.com', category: 'infrastructure', location: 'Prayagraj', description: 'Drainage blocked near hostel', status: 'pending', emergency: true, createdAt: '2025-01-14' },
]

const mockOfficers = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@gov.in', department: 'Infrastructure', assigned: 3 },
    { id: 2, name: 'Priya Sharma', email: 'priya@gov.in', department: 'Academic', assigned: 1 },
    { id: 3, name: 'Amit Singh', email: 'amit@gov.in', department: 'Hostel', assigned: 2 },
]

const statusColors = {
    pending: 'status-pending',
    progress: 'status-progress',
    completed: 'status-completed',
    closed: 'status-closed',
}

const Admin = () => {
    const [activeTab, setActiveTab] = useState('enquiries')

    const total = mockEnquiries.length
    const pending = mockEnquiries.filter(e => e.status === 'pending').length
    const progress = mockEnquiries.filter(e => e.status === 'progress').length
    const completed = mockEnquiries.filter(e => e.status === 'completed').length
    const emergency = mockEnquiries.filter(e => e.emergency).length

    const stats = [
        { label: 'Total', value: total, icon: '◈' },
        { label: 'Pending', value: pending, icon: '◷' },
        { label: 'In Progress', value: progress, icon: '◎' },
        { label: 'Resolved', value: completed, icon: '◉' },
    ]

    return (
        <div className="admin-wrapper">

            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <span className="brand-dot" />
                    <span className="brand-text">GovtDesk</span>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={`nav-btn ${activeTab === 'enquiries' ? 'active' : ''}`}
                        onClick={() => setActiveTab('enquiries')}
                    >
                        <span className="nav-icon">◈</span>
                        All Enquiries
                        <span className="nav-badge">{total}</span>
                    </button>

                    <button
                        className={`nav-btn ${activeTab === 'officers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('officers')}
                    >
                        <span className="nav-icon">◎</span>
                        All Officers
                        <span className="nav-badge">{mockOfficers.length}</span>
                    </button>
                </nav>

                <div className="sidebar-footer">
                    {emergency > 0 && (
                        <div className="emergency-alert">
                            <span className="emergency-dot" />
                            {emergency} Emergency Active
                        </div>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <main className="admin-main">

                {/* Top bar */}
                <header className="admin-topbar">
                    <div className="topbar-title">
                        <span className="topbar-label">
                            {activeTab === 'enquiries' ? 'Enquiry Management' : 'Officer Management'}
                        </span>
                    </div>
                    <div className="admin-badge">Admin</div>
                </header>

                {/* Stats row - only on enquiries tab */}
                {activeTab === 'enquiries' && (
                    <div className="stats-row">
                        {stats.map((s, i) => (
                            <div className="stat-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                                <div className="stat-icon">{s.icon}</div>
                                <div className="stat-value">{s.value}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Content panel */}
                <div className="content-panel">

                    {activeTab === 'enquiries' && (
                        <>
                            <div className="panel-header">
                                <span className="panel-title">Complaints</span>
                                <span className="panel-count">{mockEnquiries.length} records</span>
                            </div>
                            <div className="table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Email</th>
                                            <th>Category</th>
                                            <th>Location</th>
                                            <th>Description</th>
                                            <th>Emergency</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockEnquiries.map((e, i) => (
                                            <tr key={e.id} style={{ animationDelay: `${i * 0.05}s` }}>
                                                <td className="td-num">{i + 1}</td>
                                                <td className="td-email">{e.email}</td>
                                                <td><span className="category-tag">{e.category}</span></td>
                                                <td>{e.location}</td>
                                                <td className="td-desc">{e.description}</td>
                                                <td>
                                                    {e.emergency
                                                        ? <span className="emergency-tag">🔴 Yes</span>
                                                        : <span className="normal-tag">No</span>}
                                                </td>
                                                <td>
                                                    <span className={`status-tag ${statusColors[e.status]}`}>
                                                        {e.status}
                                                    </span>
                                                </td>
                                                <td className="td-date">{e.createdAt}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeTab === 'officers' && (
                        <>
                            <div className="panel-header">
                                <span className="panel-title">Officers</span>
                                <span className="panel-count">{mockOfficers.length} officers</span>
                            </div>
                            <div className="officers-grid">
                                {mockOfficers.map((o, i) => (
                                    <div className="officer-card" key={o.id} style={{ animationDelay: `${i * 0.1}s` }}>
                                        <div className="officer-avatar">
                                            {o.name.charAt(0)}
                                        </div>
                                        <div className="officer-info">
                                            <div className="officer-name">{o.name}</div>
                                            <div className="officer-email">{o.email}</div>
                                            <div className="officer-dept">{o.department}</div>
                                        </div>
                                        <div className="officer-assigned">
                                            <span className="assigned-num">{o.assigned}</span>
                                            <span className="assigned-label">assigned</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                </div>
            </main>
        </div>
    )
}

export default Admin