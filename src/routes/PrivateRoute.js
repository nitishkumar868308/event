import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../redux/auth/authSlice"; // Assume you have this action

const PrivateRoute = ({ element }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Access user from Redux store
  const isLoading = useSelector((state) => state.auth.loading); // To check loading state
  const error = useSelector((state) => state.auth.error); // Error from Redux store
  console.log("user", user);
  useEffect(() => {
    if (!user && !isLoading && !error) {
      dispatch(fetchUserData()); // Fetch user data when the component mounts
    }
  }, [dispatch, user, isLoading, error]);

  useEffect(() => {
    // If token exists in the cookies, trigger the user data fetch after page load
    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    if (token && !user && !isLoading) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user, isLoading]);

  if (!user) {
    return <Navigate to="/" />; // Redirect to login page if no user
  }

  return element; // If the user is logged in, render the passed component
};

export default PrivateRoute;
