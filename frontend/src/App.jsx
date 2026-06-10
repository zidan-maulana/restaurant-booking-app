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

  // State router renderer (Indonesian Copywriting for Sprint 2)
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
        return (
          <div className="flex flex-col items-center justify-center py-24 text-center max-w-xl mx-auto min-h-[50vh]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold mb-3">Pratinjau Sprint 3</span>
            <h2 className="font-serif italic text-4xl text-bitter-chocolate mb-4">Halaman Masuk</h2>
            <p className="font-sans text-sm text-bitter-chocolate/70 leading-relaxed mb-8">
              Form login split-screen dan state autentikasi lokal tiruan akan dibangun lengkap pada **Sprint 3**.
            </p>
            
            {/* Quick Login Toggles */}
            <div className="flex flex-col gap-3 p-4 bg-warm-cream-dark/50 border border-bitter-chocolate/10 w-full mb-8">
              <p className="text-xs font-semibold uppercase text-bitter-chocolate/60 text-center">Simulasi Uji Coba Cepat</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setSimulatedRole('customer');
                    setCurrentPage('book');
                  }}
                  className="text-[10px] uppercase tracking-widest font-bold border border-bitter-chocolate/20 py-2.5 px-4 hover:bg-bitter-chocolate hover:text-warm-cream hover:border-transparent transition-all duration-300 text-center cursor-pointer text-bitter-chocolate"
                >
                  Sebagai Pelanggan
                </button>
                <button
                  onClick={() => {
                    setSimulatedRole('admin');
                    setCurrentPage('admin-dash');
                  }}
                  className="text-[10px] uppercase tracking-widest font-bold border border-bitter-chocolate/20 py-2.5 px-4 hover:bg-bitter-chocolate hover:text-warm-cream hover:border-transparent transition-all duration-300 text-center cursor-pointer text-bitter-chocolate"
                >
                  Sebagai Admin
                </button>
              </div>
            </div>

            <button
              onClick={() => handleNavigate('home')}
              className="text-xs uppercase font-bold tracking-widest text-bitter-chocolate border-b border-bitter-chocolate hover:text-antique-gold hover:border-antique-gold transition-colors duration-300 cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        );

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

  return (
    <div onClick={handleAnchorClick}>
      <Layout 
        userRole={simulatedRole} 
        onRoleChange={handleRoleChange}
        showFooter={currentPage !== 'login'}
      >
        {renderPageContent()}
      </Layout>
    </div>
  );
}

export default App;
