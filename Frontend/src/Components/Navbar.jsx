import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
 return (
  <nav className="navbar">
   <div className="nav-container">
    <div className="logo">
     <h1>College Pro</h1>
    </div>
    {/* <div className="nav-links">
              <button onClick={() => navigate('/')}>Home</button>
            </div> */}

    <div className="navigator-routes">

     <Link to="/dashboard" className="nav-link">Dashboard</Link>
     <Link to="/enquiry" className="nav-link">Enquiry</Link>
     <Link to="/officers-team/officers" className="nav-link">Officers</Link>
     <Link to="/user-logs" className="nav-link">User Logs</Link>
     <Link to="/login" className="nav-link">Login</Link>
     <Link to="/signup" className="nav-link">Signup</Link>

    </div>

   </div>
  </nav>
 )
}

export default Navbar