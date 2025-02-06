// src/pages/LoginPage.js
import React from "react";
import Contact from "../components/Common/Contact";
import DefaultPage from "../components/Common/DefaultPage";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <DefaultPage>
        <Contact />
      </DefaultPage>
    </div>
  );
};

export default ContactPage;
