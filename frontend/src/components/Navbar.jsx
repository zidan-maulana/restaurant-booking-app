
export default function Navbar({
  userRole = 'guest', // 'guest' | 'customer' | 'admin'
  onRoleChange, // for testing purposes
}) {
  return (
    <nav className="w-full border-b border-bitter-chocolate/10 bg-warm-cream py-6 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Brand Logo */}
      <a href="/" className="font-serif font-black text-2xl tracking-[0.1em] text-bitter-chocolate hover:text-antique-gold transition-colors duration-300">
        THE TABLE
      </a>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 sm:gap-8 text-xs font-semibold uppercase tracking-[0.15em] text-bitter-chocolate/70">
        <a href="#home" className="hover:text-bitter-chocolate transition-colors duration-300">Home</a>
        
        {userRole === 'customer' && (
          <>
            <a href="#book" className="hover:text-bitter-chocolate transition-colors duration-300">Book Table</a>
            <a href="#my-bookings" className="hover:text-bitter-chocolate transition-colors duration-300">My Bookings</a>
          </>
        )}

        {userRole === 'admin' && (
          <>
            <a href="#admin-dash" className="hover:text-bitter-chocolate transition-colors duration-300">Bookings Manager</a>
            <a href="#tables" className="hover:text-bitter-chocolate transition-colors duration-300">Tables</a>
          </>
        )}

        {userRole === 'guest' ? (
          <a href="#login" className="text-antique-gold hover:text-bitter-chocolate transition-colors duration-300">Login</a>
        ) : (
          <button
            onClick={() => onRoleChange('guest')}
            className="text-terracotta-text hover:text-bitter-chocolate transition-colors duration-300 uppercase font-semibold text-xs tracking-[0.15em]"
          >
            Logout ({userRole})
          </button>
        )}
      </div>
    </nav>
  );
}
