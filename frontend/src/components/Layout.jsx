import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({
  children,
  userRole = 'guest',
  onRoleChange,
  showFooter = true,
}) {
  return (
    <div className="flex flex-col min-h-screen bg-warm-cream text-bitter-chocolate selection:bg-antique-gold/25 selection:text-bitter-chocolate">
      {/* Global Header */}
      <Navbar userRole={userRole} onRoleChange={onRoleChange} />

      {/* Main Layout Container */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Global Footer */}
      {showFooter && <Footer />}
    </div>
  );
}
