
export default function Navbar({
  userRole = 'guest', // 'guest' | 'customer' | 'admin'
  onRoleChange, // for testing purposes
}) {
  return (
    <nav className="w-full border-b border-bitter-chocolate/10 bg-warm-cream/90 backdrop-blur-md py-6 px-6 sm:px-12 flex flex-row items-center justify-between gap-4 sticky top-0 z-50 animate-fade-in">
      {/* Brand Logo - Premium Monogram & Wordmark */}
      <a href="#home" className="flex items-center gap-3 group">
        <span className="font-serif italic font-medium border border-bitter-chocolate/30 rounded-full w-8 h-8 flex items-center justify-center text-sm text-antique-gold bg-warm-cream-dark/20 group-hover:border-antique-gold transition-colors duration-300">
          A
        </span>
        <span className="font-serif italic font-light text-2xl tracking-[0.05em] text-bitter-chocolate group-hover:text-antique-gold transition-colors duration-300">
          Atma Dining House
        </span>
      </a>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 sm:gap-8 text-xs font-semibold uppercase tracking-[0.15em] text-bitter-chocolate/70">
        <a href="#home" className="hover:text-bitter-chocolate transition-colors duration-300">Beranda</a>
        <a href="#menu" className="hover:text-bitter-chocolate transition-colors duration-300">Menu</a>
        
        {userRole === 'customer' && (
          <>
            <a href="#book" className="hover:text-bitter-chocolate transition-colors duration-300">Reservasi</a>
            <a href="#my-bookings" className="hover:text-bitter-chocolate transition-colors duration-300">Reservasi Saya</a>
          </>
        )}

        {userRole === 'admin' && (
          <>
            <a href="#admin-dash" className="hover:text-bitter-chocolate transition-colors duration-300">Kelola Reservasi</a>
            <a href="#tables" className="hover:text-bitter-chocolate transition-colors duration-300">Meja</a>
          </>
        )}

        {userRole === 'guest' ? (
          <a href="#login" className="hover:text-bitter-chocolate transition-colors duration-300">Masuk</a>
        ) : (
          <button
            onClick={() => onRoleChange('guest')}
            className="text-terracotta-text hover:text-bitter-chocolate transition-colors duration-300 uppercase font-semibold text-xs tracking-[0.15em]"
          >
            Keluar ({userRole === 'admin' ? 'Admin' : 'Pelanggan'})
          </button>
        )}

        {/* CTA Button */}
        <a
          href="#book"
          className="hidden md:inline-flex bg-bitter-chocolate text-warm-cream hover:bg-antique-gold transition-colors duration-300 font-sans text-xs font-bold uppercase tracking-[0.15em] py-2.5 px-6 rounded-none"
        >
          Reservasi Sekarang
        </a>
      </div>
    </nav>
  );
}
