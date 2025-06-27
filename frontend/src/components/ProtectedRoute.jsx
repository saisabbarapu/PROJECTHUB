import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { addToast } = useContext(ToasterContext);

  if (!user) {
    addToast('Please login to access this page', 'warning', 4000);
    return <Navigate to="/loginpage" replace />;
  }

  return children;
};

export default ProtectedRoute; 