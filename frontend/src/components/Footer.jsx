export default function Footer() {
  return (
    <footer className="w-full border-t border-bitter-chocolate/10 bg-warm-cream py-20 px-6 sm:px-12 mt-auto text-bitter-chocolate animate-fade-in">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        {/* Centered Brand Monogram */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-serif italic font-medium border border-bitter-chocolate/30 rounded-full w-10 h-10 flex items-center justify-center text-base text-antique-gold bg-warm-cream-dark/20">
            A
          </span>
          <span className="font-serif italic font-light text-xl tracking-[0.05em] text-bitter-chocolate">
            Atma Dining House
          </span>
        </div>

        {/* Three-Column Information Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left text-sm leading-relaxed border-t border-b border-bitter-chocolate/5 py-12">
          {/* Column 1: Location */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-antique-gold">Lokasi</h4>
            <p className="font-sans text-bitter-chocolate/70">
              Jalan Senopati No. 42A,<br />
              Kebayoran Baru, Jakarta Selatan
            </p>
          </div>

          {/* Column 2: Hours */}
          <div className="flex flex-col gap-2 md:items-center md:text-center">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-antique-gold">Jam Operasional</h4>
            <p className="font-sans text-bitter-chocolate/70">
              Senin — Jumat: 11:00 – 23:00<br />
              Sabtu — Minggu: 10:00 – 00:00
            </p>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-2 md:items-end md:text-right">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-antique-gold">Reservasi</h4>
            <p className="font-sans text-bitter-chocolate/70">
              hello@atmadining.com<br />
              +62 21 555 1234
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Links */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-wider font-semibold text-bitter-chocolate/40">
          <p>© 2026 Atma Dining House. Hak cipta dilindungi.</p>
          <div className="flex gap-8">
            <a href="#privacy" className="hover:text-bitter-chocolate transition-colors duration-300">Kebijakan Privasi</a>
            <a href="#terms" className="hover:text-bitter-chocolate transition-colors duration-300">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
