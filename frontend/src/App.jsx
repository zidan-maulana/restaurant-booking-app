import { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


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
        return (
          <div className="flex flex-col items-center justify-center py-24 text-center max-w-xl mx-auto min-h-[50vh]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold mb-3">Pratinjau Sprint 6</span>
            <h2 className="font-serif italic text-4xl text-bitter-chocolate mb-4">Halaman Pemesanan</h2>
            <p className="font-sans text-sm text-bitter-chocolate/70 leading-relaxed mb-8">
              Modul pemilihan meja interaktif, penanggalan, jam reservasi, dan visual tata letak meja akan dibangun lengkap pada **Sprint 6**.
            </p>
            <button
              onClick={() => handleNavigate('home')}
              className="text-xs uppercase font-bold tracking-widest text-bitter-chocolate border-b border-bitter-chocolate hover:text-antique-gold hover:border-antique-gold transition-colors duration-300 cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        );

      case 'my-bookings':
        return (
          <div className="flex flex-col items-center justify-center py-24 text-center max-w-xl mx-auto min-h-[50vh]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold mb-3">Pratinjau Sprint 7</span>
            <h2 className="font-serif italic text-4xl text-bitter-chocolate mb-4">Reservasi Saya</h2>
            <p className="font-sans text-sm text-bitter-chocolate/70 leading-relaxed mb-8">
              Riwayat daftar booking pelanggan dan tombol aksi pembatalan reservasi akan dibangun lengkap pada **Sprint 7**.
            </p>
            <button
              onClick={() => handleNavigate('home')}
              className="text-xs uppercase font-bold tracking-widest text-bitter-chocolate border-b border-bitter-chocolate hover:text-antique-gold hover:border-antique-gold transition-colors duration-300 cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        );

      case 'login':
        return <Login onNavigate={handleNavigate} />;

      case 'register':
        return <Register onNavigate={handleNavigate} />;


      case 'admin-dash':
        return (
          <div className="flex flex-col items-center justify-center py-24 text-center max-w-xl mx-auto min-h-[50vh]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold mb-3">Pratinjau Sprint 8</span>
            <h2 className="font-serif italic text-4xl text-bitter-chocolate mb-4">Kelola Reservasi (Admin)</h2>
            <p className="font-sans text-sm text-bitter-chocolate/70 leading-relaxed mb-8">
              Pusat monitoring admin (Approve/Reject pesanan dengan saringan tanggal & status) akan dibangun lengkap pada **Sprint 8**.
            </p>
            <button
              onClick={() => handleNavigate('home')}
              className="text-xs uppercase font-bold tracking-widest text-bitter-chocolate border-b border-bitter-chocolate hover:text-antique-gold hover:border-antique-gold transition-colors duration-300 cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        );

      case 'tables':
        return (
          <div className="flex flex-col items-center justify-center py-24 text-center max-w-xl mx-auto min-h-[50vh]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold mb-3">Pratinjau Sprint 9</span>
            <h2 className="font-serif italic text-4xl text-bitter-chocolate mb-4">Kelola Meja (Admin)</h2>
            <p className="font-sans text-sm text-bitter-chocolate/70 leading-relaxed mb-8">
              Panel CRUD Meja (tambah, ubah, hapus meja restoran) oleh admin akan dibangun lengkap pada **Sprint 9**.
            </p>
            <button
              onClick={() => handleNavigate('home')}
              className="text-xs uppercase font-bold tracking-widest text-bitter-chocolate border-b border-bitter-chocolate hover:text-antique-gold hover:border-antique-gold transition-colors duration-300 cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        );

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
