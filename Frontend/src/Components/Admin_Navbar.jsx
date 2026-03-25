import React from "react";
import "./Admin_Navbar.css";

const Admin_Navbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar__brand">
        <div className="admin-navbar__logo">
          <span className="admin-navbar__logo-icon">⚙</span>
        </div>
        <span className="admin-navbar__title">Dashboard</span>
      </div>
      <div className="admin-navbar__badge">Admin</div>
    </nav>
  );
};

export default Admin_Navbar;