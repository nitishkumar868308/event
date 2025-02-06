import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DefaultPage = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("Toggling sidebar");
    setIsSidebarOpen((prevState) => !prevState);  
  };

  return (
    <div className="home-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className="content-container"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "100px", 
          transition: "margin-left 0.3s ease", 
        }}
      >
        <Navbar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default DefaultPage;
