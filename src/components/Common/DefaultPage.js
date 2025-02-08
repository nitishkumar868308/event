import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // For redirecting after logout
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"; // For accessing Redux state
import { fetchUserData, logoutUser } from "../../redux/auth/authSlice"; // Import actions
import "./DefaultPage.css";

const DefaultPage = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigating after logout
  const { user, loading, error } = useSelector((state) => state.auth); // Get user data from Redux state

  // Fetch user data when component mounts
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData()); // If no user data exists, fetch it
    }
  }, [dispatch, user]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch logout action
    navigate("/"); // Redirect to login page
  };

  // If user exists, get the name from the user data
  const userName = user ? user.name : "Guest"; // Default to "Guest" if no user is found
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
            <div className="dropdown-item" onClick={handleLogout}>
              <FaSignOutAlt style={{ marginRight: "10px" }} /> Logout
            </div>
          </div>
        </div>
      </div>
      <div className="content">{children}</div>
    </>
  );
};

export default DefaultPage;
