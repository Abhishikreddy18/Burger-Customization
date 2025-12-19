import React, { useEffect, useState } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../actions/userAction';
import { useDispatch,useSelector } from 'react-redux';
const ProtectedRoute = ({ children }) => {
  // Get the current user status from the store
  // While the user status is being determined, you might want to show a loading state
  if (localStorage.getItem("token")) {
    return children;
  } else {
    localStorage.clear();
    return (
    <Navigate to="/signin" /> );
  }
};

export default ProtectedRoute;
