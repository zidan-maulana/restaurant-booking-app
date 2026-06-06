import { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'book' | 'my-bookings' | 'login' | 'admin-dash' | 'tables'
  const [simulatedRole, setSimulatedRole] = useState('guest'); // 'guest' | 'customer' | 'admin'

  // Handles mock navigation across pages
  const handleNavigate = (page) => {
    setCurrentPage(page);
    
    // Auto-update simulated role depending on navigated page for convenience
    if (page === 'admin-dash' || page === 'tables') {
      setSimulatedRole('admin');
    } else if (page === 'book' || page === 'my-bookings') {
      setSimulatedRole('customer');
    } else if (page === 'home' || page === 'login') {
      // Keep current role or reset
    }
  };

  const handleRoleChange = (newRole) => {
    setSimulatedRole(newRole);
    if (newRole === 'guest') {
      setCurrentPage('home');
    }
  };

  // State router renderer
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
        
      case 'book':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold mb-3">Sprint 6 Preview</span>
            <h2 className="font-serif italic text-4xl text-bitter-chocolate mb-4">Customer Dashboard</h2>
            <p className="font-sans text-sm text-bitter-chocolate/70 leading-relaxed mb-8">
              Pemesanan meja, pemilih tanggal/jam, dan layout grid meja interaktif akan dibangun lengkap pada **Sprint 6**.
            </p>
            <button
              onClick={() => handleNavigate('home')}
              className="text-xs uppercase font-bold tracking-widest text-bitter-chocolate border-b border-bitter-chocolate hover:text-antique-gold hover:border-antique-gold transition-colors duration-300"
            >
              Back to Home
            </button>
          </div>
        );

      case 'my-bookings':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold mb-3">Sprint 7 Preview</span>
            <h2 className="font-serif italic text-4xl text-bitter-chocolate mb-4">My Bookings</h2>
            <p className="font-sans text-sm text-bitter-chocolate/70 leading-relaxed mb-8">
              Riwayat daftar booking pelanggan dan aksi pembatalan (Cancel) akan dibangun lengkap pada **Sprint 7**.
            </p>
            <button
              onClick={() => handleNavigate('home')}
              className="text-xs uppercase font-bold tracking-widest text-bitter-chocolate border-b border-bitter-chocolate hover:text-antique-gold hover:border-antique-gold transition-colors duration-300"
            >
              Back to Home
            </button>
          </div>
        );

      case 'login':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold mb-3">Sprint 4 Preview</span>
            <h2 className="font-serif italic text-4xl text-bitter-chocolate mb-4">Login Page</h2>
            <p className="font-sans text-sm text-bitter-chocolate/70 leading-relaxed mb-8">
              Form login split-screen dan state autentikasi lokal tiruan akan dibangun lengkap pada **Sprint 4**.
            </p>
            
            {/* Quick Login Toggles */}
            <div className="flex flex-col gap-3 p-4 bg-warm-cream-dark/50 border border-bitter-chocolate/10 w-full mb-8">
              <p className="text-xs font-semibold uppercase text-bitter-chocolate/60">Simulate Quick Login</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setSimulatedRole('customer');
                    setCurrentPage('book');
                  }}
                  className="text-xs uppercase tracking-wider font-bold bg-bitter-chocolate text-warm-cream px-4 py-2 hover:bg-antique-gold transition-colors duration-300"
                >
                  As Customer
                </button>
                <button
                  onClick={() => {
                    setSimulatedRole('admin');
                    setCurrentPage('admin-dash');
                  }}
                  className="text-xs uppercase tracking-wider font-bold bg-bitter-chocolate text-warm-cream px-4 py-2 hover:bg-antique-gold transition-colors duration-300"
                >
                  As Admin
                </button>
              </div>
            </div>

            <button
              onClick={() => handleNavigate('home')}
              className="text-xs uppercase font-bold tracking-widest text-bitter-chocolate border-b border-bitter-chocolate hover:text-antique-gold hover:border-antique-gold transition-colors duration-300"
            >
              Back to Home
            </button>
          </div>
        );

      case 'admin-dash':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold mb-3">Sprint 8 Preview</span>
            <h2 className="font-serif italic text-4xl text-bitter-chocolate mb-4">Admin Dashboard</h2>
            <p className="font-sans text-sm text-bitter-chocolate/70 leading-relaxed mb-8">
              Panel manajemen booking oleh admin (Approve/Reject dengan filter status dan tanggal) akan dibangun lengkap pada **Sprint 8**.
            </p>
            <button
              onClick={() => handleNavigate('home')}
              className="text-xs uppercase font-bold tracking-widest text-bitter-chocolate border-b border-bitter-chocolate hover:text-antique-gold hover:border-antique-gold transition-colors duration-300"
            >
              Back to Home
            </button>
          </div>
        );

      case 'tables':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold mb-3">Sprint 9 Preview</span>
            <h2 className="font-serif italic text-4xl text-bitter-chocolate mb-4">Table Management</h2>
            <p className="font-sans text-sm text-bitter-chocolate/70 leading-relaxed mb-8">
              Panel CRUD Meja (tambah, edit, hapus meja restoran) oleh admin akan dibangun lengkap pada **Sprint 9**.
            </p>
            <button
              onClick={() => handleNavigate('home')}
              className="text-xs uppercase font-bold tracking-widest text-bitter-chocolate border-b border-bitter-chocolate hover:text-antique-gold hover:border-antique-gold transition-colors duration-300"
            >
              Back to Home
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
      
      // Map hash routes to state pages
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

  return (
    <div onClick={handleAnchorClick}>
      <Layout userRole={simulatedRole} onRoleChange={handleRoleChange}>
        {renderPageContent()}
      </Layout>
    </div>
  );
}

export default App;
