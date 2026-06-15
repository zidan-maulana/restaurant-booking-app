import { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/customer/Dashboard';
import MyBookings from './pages/customer/MyBookings';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTableManagement from './pages/admin/AdminTableManagement';


function AppContent() {
  const { user, logout } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState('home');

  // Handles mock navigation across pages
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleRoleChange = (newRole) => {
    if (newRole === 'guest') {
      logout();
      setCurrentPage('home');
    }
  };

  // State router renderer (Indonesian copywriting)
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
        
      case 'book':
        return <CustomerDashboard onNavigate={handleNavigate} />;

      case 'my-bookings':
        return <MyBookings onNavigate={handleNavigate} />;

      case 'login':
        return <Login onNavigate={handleNavigate} />;

      case 'register':
        return <Register onNavigate={handleNavigate} />;


      case 'admin-dash':
        if (!user || user.role !== 'admin') return <Home onNavigate={handleNavigate} />;
        return <AdminDashboard onNavigate={handleNavigate} />;

      case 'tables':
        if (!user || user.role !== 'admin') return <Home onNavigate={handleNavigate} />;
        return <AdminTableManagement onNavigate={handleNavigate} />;

      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  // Intercept default anchor clicks for mockup routing
  const handleAnchorClick = (e) => {
    const href = e.target.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetPage = href.substring(1);
      
      const pageMapping = {
        'home': 'home',
        'book': 'book',
        'my-bookings': 'my-bookings',
        'login': 'login',
        'admin-dash': 'admin-dash',
        'tables': 'tables'
      };
      
      if (pageMapping[targetPage]) {
        handleNavigate(pageMapping[targetPage]);
      }
    }
  };

  const userRole = user ? user.role : 'guest';

  return (
    <div onClick={handleAnchorClick}>
      <Layout 
        userRole={userRole} 
        onRoleChange={handleRoleChange} 
        showFooter={currentPage !== 'login' && currentPage !== 'register'}
      >
        {renderPageContent()}
      </Layout>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
