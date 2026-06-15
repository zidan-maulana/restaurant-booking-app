import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import heroImg from '../assets/hero_dining_room.png';

export default function Login({ onNavigate }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const loggedInUser = await login(email, password);
      // Navigate based on user role
      if (loggedInUser.role === 'admin') {
        onNavigate('admin-dash');
      } else {
        onNavigate('book');
      }
    } catch (err) {
      setError(err.message || 'Email atau password salah.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to autofill and submit for fast review
  const handleQuickLogin = async (type) => {
    setError('');
    setIsSubmitting(true);
    const mockEmail = type === 'admin' ? 'admin@atma.com' : 'user@atma.com';
    const mockPassword = type === 'admin' ? 'admin' : 'user';
    
    setEmail(mockEmail);
    setPassword(mockPassword);

    try {
      const loggedInUser = await login(mockEmail, mockPassword);
      if (loggedInUser.role === 'admin') {
        onNavigate('admin-dash');
      } else {
        onNavigate('book');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[75vh] border border-bitter-chocolate/10 rounded-lg overflow-hidden bg-warm-cream shadow-sm">
      {/* Left Column: Visual Dining Room Showcase (Split-screen) */}
      <div className="hidden lg:block lg:col-span-6 relative bg-bitter-chocolate/5">
        <img
          src={heroImg}
          alt="Atma Dining Interior"
          className="w-full h-full object-cover grayscale sepia opacity-85 contrast-[1.05]"
        />
        {/* Warm Overlay */}
        <div className="absolute inset-0 bg-antique-gold/5 mix-blend-multiply"></div>
        {/* Small aesthetic corner detail */}
        <div className="absolute bottom-6 left-6 text-warm-cream max-w-xs drop-shadow-md">
          <span className="font-serif italic text-3xl font-light">Atma</span>
          <p className="font-sans text-[10px] uppercase tracking-widest text-warm-cream/80 mt-1">
            Sajian bermakna. Dihidangkan dengan perhatian penuh.
          </p>
        </div>
      </div>

      {/* Right Column: Minimalist Login Form */}
      <div className="lg:col-span-6 flex flex-col justify-center px-8 sm:px-16 py-12 bg-warm-cream-dark/10">
        <div className="max-w-md w-full mx-auto flex flex-col gap-8">
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold block mb-2">
              Akses Masuk
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light italic text-bitter-chocolate mb-1 leading-normal">
              Selamat Datang Kembali
            </h2>
            <p className="font-sans text-xs text-bitter-chocolate/50 uppercase tracking-wider">
              Silakan masuk ke akun Atma Anda.
            </p>
          </div>

          {error && (
            <div className="bg-terracotta-bg border border-terracotta-text/10 text-terracotta-text text-xs py-3.5 px-4 rounded-md font-sans">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
              disabled={isSubmitting}
            />

            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isSubmitting}
            />

            <div className="mt-4 flex flex-col gap-4">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full justify-center !py-4 rounded-none"
              >
                {isSubmitting ? 'Memproses...' : 'Masuk'}
              </Button>

              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="text-xs font-semibold text-center text-bitter-chocolate/60 hover:text-bitter-chocolate transition-colors duration-300"
              >
                Belum memiliki akun? <span className="text-antique-gold border-b border-antique-gold/20 hover:border-antique-gold">Daftar</span>
              </button>
            </div>
          </form>

          {/* Quick Simulation Toggles */}
          <div className="border-t border-bitter-chocolate/10 pt-6 mt-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-bitter-chocolate/50 mb-3 text-center">
              Simulasi Uji Coba Cepat
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickLogin('customer')}
                disabled={isSubmitting}
                className="text-[10px] uppercase tracking-widest font-bold border border-bitter-chocolate/20 py-2.5 px-3 rounded-none hover:bg-bitter-chocolate hover:text-warm-cream hover:border-transparent transition-all duration-300 text-center cursor-pointer text-bitter-chocolate"
              >
                Sebagai Pelanggan
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                disabled={isSubmitting}
                className="text-[10px] uppercase tracking-widest font-bold border border-bitter-chocolate/20 py-2.5 px-3 rounded-none hover:bg-bitter-chocolate hover:text-warm-cream hover:border-transparent transition-all duration-300 text-center cursor-pointer text-bitter-chocolate"
              >
                Sebagai Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
