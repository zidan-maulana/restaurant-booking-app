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



  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)] bg-warm-cream w-full">
      {/* Left Column: Visual Dining Room Showcase (Split-screen) */}
      <div className="hidden lg:block lg:col-span-6 relative bg-bitter-chocolate/5 h-full">
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
                className="w-full justify-center !py-4 rounded-md"
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


        </div>
      </div>
    </div>
  );
}
