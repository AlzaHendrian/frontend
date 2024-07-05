import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminPage from '../pages/admin/AdminPage';
import HomePage from '../pages/HomePage';
import Navbar from '../components/global/Navbar';
import { UserContext } from '../context/UserContext';

const AppRoute = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useContext must be used within a UserContextProvider');
  }

  const [state, dispatch] = userContext;

  // Check if token exists
  const token = localStorage.getItem('token');

  // Check if user is logged in and isAdmin
  const isLoggedIn = state.isLogin && token;
  const isAdmin = isLoggedIn && state.user?.isAdmin;

  // Handle initial state setup or refresh
  if (token && !state.isLogin) {
    // Simulate user data retrieval from localStorage (replace with your logic)
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Update context with logged in state and user data
    dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/user-page" element={<HomePage />} />

              {/* Ensure isAdmin check is done after state is updated */}
              <Route
                path="/admin-page"
                element={
                  isAdmin ? <AdminPage /> : <Navigate to="/user-page" replace />
                }
              />

              <Route path="*" element={<Navigate to="/user-page" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};

export default AppRoute;
