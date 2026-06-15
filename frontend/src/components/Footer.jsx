export default function Footer() {
  return (
    <footer className="w-full border-t border-bitter-chocolate/10 bg-warm-cream py-16 px-6 sm:px-12 mt-auto text-bitter-chocolate animate-fade-in">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Four-Column Information Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm leading-relaxed border-b border-bitter-chocolate/5 pb-12">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-serif italic font-medium border border-bitter-chocolate/30 rounded-full w-8 h-8 flex items-center justify-center text-sm text-antique-gold bg-warm-cream-dark/20">
                A
              </span>
              <span className="font-serif italic font-normal text-lg tracking-[0.03em] text-bitter-chocolate">
                Atma Dining House
              </span>
            </div>
            <p className="font-sans text-xs text-bitter-chocolate/50 leading-loose">
              Dapur kami mengolah bahan organik musiman terbaik secara jujur, disajikan dengan kehangatan untuk menciptakan kenyamanan bersantap yang tenang.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-medium text-antique-gold mb-2.5">NAVIGASI</h4>
            <ul className="flex flex-col gap-2 font-sans text-xs font-medium text-bitter-chocolate/55 uppercase tracking-wider">
              <li>
                <a href="#home" className="hover:text-antique-gold transition-colors duration-300">Beranda</a>
              </li>
              <li>
                <a href="#book" className="hover:text-antique-gold transition-colors duration-300">Reservasi</a>
              </li>
              <li>
                <a href="#my-bookings" className="hover:text-antique-gold transition-colors duration-300">Reservasi Saya</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-medium text-antique-gold mb-2.5">INFORMASI</h4>
            <div className="flex flex-col gap-3.5 font-sans text-xs text-bitter-chocolate/55 leading-loose">
              <p>
                <strong className="font-semibold text-bitter-chocolate/70">Alamat:</strong><br />
                Jalan Senopati No. 42A, Kebayoran Baru, Jakarta Selatan
              </p>
              <p>
                <strong className="font-semibold text-bitter-chocolate/70">Jam Operasional:</strong><br />
                Senin — Jumat: 11:00 – 23:00<br />
                Sabtu — Minggu: 10:00 – 00:00
              </p>
              <p>
                <strong className="font-semibold text-bitter-chocolate/70">Kontak:</strong><br />
                hello@atmadining.com<br />
                +62 21 555 1234
              </p>
            </div>
          </div>

          {/* Column 4: Call to Action */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-medium text-antique-gold mb-2.5">RESERVASI MEJA</h4>
            <p className="font-sans text-xs text-bitter-chocolate/50 leading-loose">
              Ingin menikmati pengalaman bersantap istimewa? Silakan lakukan pemesanan meja sekarang.
            </p>
            <div>
              <a
                href="#book"
                className="inline-flex bg-bitter-chocolate text-warm-cream hover:bg-antique-gold transition-colors duration-300 font-sans text-xs font-medium uppercase tracking-[0.1em] py-2.5 px-6 rounded-md shadow-sm"
              >
                Reservasi Sekarang
              </a>
            </div>
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
