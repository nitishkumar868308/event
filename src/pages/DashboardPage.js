import React from "react";
import EventDashboard from "../components/Event/EventDashboard";
import DefaultPage from "../components/Common/DefaultPage";

const DashboardPage = () => {
  return (
    <div>
      <DefaultPage>
        <EventDashboard />
      </DefaultPage>
    </div>
  );
};

export default DashboardPage;
