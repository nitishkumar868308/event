import React from "react";
import "./SidebarComponent.css";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handleToggle = () => {
    toggleSidebar();
    setTimeout(() => {
      console.log("Transition applied");
    }, 100);
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "scroll initial",
      }}
    >
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#333"
        style={{
          width: isOpen ? "250px" : "100px",
          transition: "width 0.3s ease",
        }}
      >
        <CDBSidebarHeader
          prefix={
            <i className="fa fa-bars fa-large" onClick={handleToggle}></i>
          }
        >
          <NavLink exact to="/home" activeClassName="activeClicked" style={{ textDecoration: 'none' }}>
            <div className="sidebar-profile">
              <img
                src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg"
                alt="profile_picture"
              />
              {isOpen && (
                <>
                  <h3>Nitish Kumar</h3>
                  <p>Developer</p>
                </>
              )}
            </div>
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              exact
              to="/profile"
              activeClassName="activeClicked"
              className={({ isActive }) =>
                isActive ? "navlink activeClicked" : "navlink"
              }
            >
              <CDBSidebarMenuItem icon="user">Profile Page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/contact"
              activeClassName="activeClicked"
              className={({ isActive }) =>
                isActive ? "navlink activeClicked" : "navlink"
              }
            >
              <CDBSidebarMenuItem icon="phone">Contact us</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
