import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import AuthRoutes from './routes/AuthRoutes';
import { AuthContext } from './Authentication/AuthContext';

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  useEffect(() => {
    const clearNoticeState = () => sessionStorage.removeItem('hasSeenNotice');
    window.addEventListener('beforeunload', clearNoticeState);
    return () => window.removeEventListener('beforeunload', clearNoticeState);
  }, []);

  if (loading) return <div>Loading...</div>; // Prevent premature route rendering


  return (
    <Router>
      <UserRoutes />
      <Routes>
        {AuthRoutes(isAuthenticated)}
        {AdminRoutes(isAuthenticated)}
      </Routes>
    </Router>
  );
}

export default App;
