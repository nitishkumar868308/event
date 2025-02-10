import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../redux/auth/authSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
