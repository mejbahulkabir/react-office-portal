import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import {
  FiHome,
  FiCalendar,
  FiDollarSign,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Attendance", icon: <FiCalendar />, path: "/attendance" },
    { name: "Payroll", icon: <FiDollarSign />, path: "/payroll" },
  ];

  return (
    <div
      className={`sidebar d-flex flex-column ${
        collapsed ? "collapsed" : ""
      }`}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3">
        {!collapsed && <h5 className="fw-bold mb-0">Super Attendance</h5>}
        <button
          className="btn btn-sm btn-light"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Menu */}
      <ul className="list-unstyled flex-grow-1 px-2">
        {menuItems.map((item) => (
          <li key={item.name} className="mb-2">
            <button
              onClick={() => navigate(item.path)}
              className={`menu-item btn w-100 d-flex align-items-center ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <span className="icon">{item.icon}</span>
              {!collapsed && (
                <span className="ms-3">{item.name}</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div className="p-3">
        <button
          onClick={handleLogout}
          className="menu-item btn w-100 d-flex align-items-center text-danger"
        >
          <span className="icon">
            <FiLogOut />
          </span>
          {!collapsed && <span className="ms-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;