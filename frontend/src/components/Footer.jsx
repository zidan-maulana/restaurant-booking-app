
export default function Footer() {
  return (
    <footer className="w-full border-t border-bitter-chocolate/10 bg-warm-cream py-12 px-6 sm:px-12 mt-auto text-bitter-chocolate">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Column 1: Location */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-bitter-chocolate/55 mb-3">Location</h4>
          <p className="font-sans text-sm leading-relaxed text-bitter-chocolate/80">
            Jalan Senopati No. 42A,<br />
            Kebayoran Baru, Jakarta Selatan
          </p>
        </div>

        {/* Column 2: Hours */}
        <div className="md:text-center">
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-bitter-chocolate/55 mb-3">Hours</h4>
          <p className="font-sans text-sm leading-relaxed text-bitter-chocolate/80">
            Monday — Friday: 11:00 – 23:00<br />
            Saturday — Sunday: 10:00 – 00:00
          </p>
        </div>

        {/* Column 3: Contact */}
        <div className="md:text-right">
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-bitter-chocolate/55 mb-3">Reservations</h4>
          <p className="font-sans text-sm leading-relaxed text-bitter-chocolate/80">
            hello@thetable.com<br />
            +62 21 555 1234
          </p>
        </div>
      </div>

      <hr className="border-bitter-chocolate/5 my-8" />

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-wider text-bitter-chocolate/40">
        <p>© 2026 The Table. All rights reserved.</p>
        <div className="flex gap-6 uppercase font-semibold">
          <a href="#privacy" className="hover:text-bitter-chocolate transition-colors duration-300">Privacy Policy</a>
          <a href="#terms" className="hover:text-bitter-chocolate transition-colors duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
