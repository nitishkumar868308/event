import React from "react";
import Profile from "../components/Common/Profile";
import DefaultPage from "../components/Common/DefaultPage";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <DefaultPage>
        <Profile />
      </DefaultPage>
    </div>
  );
};

export default ProfilePage;
