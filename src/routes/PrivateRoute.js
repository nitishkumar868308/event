import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../redux/auth/authSlice";

const PrivateRoute = ({ element, restricted = false }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  console.log("user", user);
  useEffect(() => {
    if (!user && !isLoading && !error) {
      const token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));
      if (token) {
        dispatch(fetchUserData());
      }
    }
  }, [dispatch, user, isLoading, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user && restricted) {
    return <Navigate to="/dashboard" />;
  }

  if (!user && !restricted) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
