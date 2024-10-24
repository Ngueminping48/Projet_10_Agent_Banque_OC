import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const IsLogin = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  return user ? children : <Navigate to='/login' />;
};

export default IsLogin;
