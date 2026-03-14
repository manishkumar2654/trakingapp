import React from "react";
import { NavLink } from "react-router-dom";

const menu = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Employees", path: "/employees" },
  { label: "Projects", path: "/projects" },
  { label: "Offices", path: "/offices" },
  { label: "Attendance", path: "/attendance" },
  { label: "Tracking", path: "/tracking" },
  { label: "Labour", path: "/labour" },
  { label: "Reports", path: "/reports" },
  { label: "Subscription", path: "/subscription" },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">Attendance System</div>
      <nav className="sidebar-nav">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;