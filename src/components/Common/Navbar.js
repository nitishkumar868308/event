import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserProfile } from "../redux/profile/profileSlice";
// import SyncLoader from "react-spinners/SyncLoader";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
// import { resetLoginState } from "../redux/login/loginSlice";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user, isLoading, profileError } = useSelector(
  //   (state) => state.profile
  // );

  // useEffect(() => {
  //   dispatch(fetchUserProfile());
  // }, [dispatch]);

  // console.log("user", user);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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

  const handleLogout = async () => {
    // try {
    //   const response = await axios.post(
    //     "http://localhost:3333/auth/logout",
    //     {},
    //     { withCredentials: true }
    //   );
    //   console.log("response", response.status);
    //   if (response.status === 200) {
    //     console.log("Navigating to / page");
    //     dispatch(resetLoginState());
    //     navigate("/", { replace: true });
    //   }
    // } catch (error) {
    //   console.error("Error during logout:", error);
    // }

    console.log("Test");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2 style={{ textAlign: "center" }}>Event Dashboard</h2>
      </div>

      <div className="navbar-right">
        <div
          className="navbar-profile"
          onClick={toggleDropdown}
          ref={profileRef}
        >
          <img
            src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg"
            alt="profile"
            className="navbar-profile-img"
          />

          <span className="navbar-profile-name">Nitish Kumar</span>

          {/* {isLoading ? (
            <SyncLoader color="#36D7B7" size={10} />
          ) : (
            <span className="navbar-profile-name">{user?.name || "Guest"}</span>
          )} */}
        </div>

        <div
          className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
          ref={dropdownRef}
        >

          <Link to="/" className="dropdown-item" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
