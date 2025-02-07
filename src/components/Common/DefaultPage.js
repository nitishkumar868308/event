import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa"; // Import icons from react-icons
import "./DefaultPage.css";

const DefaultPage = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const userName = "Nitish Kumar";
  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <h2>Event Dashboard</h2>
        </div>

        <div className="navbar-right">
          <div
            className="navbar-profile"
            onClick={toggleDropdown}
            ref={profileRef}
          >
            <div className="navbar-profile-initials">{initials}</div>
            <span className="navbar-profile-name">{userName}</span>
          </div>

          <div
            className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
            ref={dropdownRef}
          >
            <Link to="/" className="dropdown-item">
              <FaUser style={{ marginRight: "10px" }} /> Profile
            </Link>

            <Link to="/" className="dropdown-item">
              <FaSignOutAlt style={{ marginRight: "10px" }} /> Logout
            </Link>
          </div>
        </div>
      </div>
      <div className="content">{children}</div>
    </>
  );
};

export default DefaultPage;
