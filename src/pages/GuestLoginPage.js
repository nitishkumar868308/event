import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GuestLoginPage = () => {
  const { guestLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    guestLogin();
    navigate('/dashboard'); 
  }, [guestLogin, navigate]);

  return <div>Logging you in as a Guest...</div>;
};

export default GuestLoginPage;
