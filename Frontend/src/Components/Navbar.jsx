import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h1>College Pro</h1>
        </div>

        <button className="hamburger-menu" onClick={toggleMobileMenu}>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`navigator-routes ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link
            to="/dashboard"
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>
          <Link
            to="/enquiry"
            className={`nav-link ${isActive('/enquiry') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Enquiry
          </Link>
          <Link
            to="/officers-team/officers"
            className={`nav-link ${isActive('/officers-team/officers') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Officers
          </Link>
          <Link
            to="/user-logs"
            className={`nav-link ${isActive('/user-logs') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            User Logs
          </Link>
          <Link
            to="/login"
            className={`nav-link ${isActive('/login') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`nav-link ${isActive('/signup') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar