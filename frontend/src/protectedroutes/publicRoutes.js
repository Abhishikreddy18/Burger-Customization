import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../actions/userAction';
const PublicRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem('userInfo');
    if (userInfoFromStorage) {
      setUser(JSON.parse(userInfoFromStorage));
      getCurrentUser(userInfoFromStorage.token)
    }
  })
 if(localStorage.getItem('token')&&localStorage.getItem('token')!==undefined&&localStorage.getItem('token')!==null)
  {
    console.log('kjeninka')
   return <Navigate to="/" />
  }
  else{
    return children;
  }

};

export default PublicRoute;
