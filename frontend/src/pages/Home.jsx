import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import heroImg from '../assets/hero_dining_room.png';

// Menu pilihan premium dengan format mata uang Rupiah (Rp)
const menuData = [
  {
    name: 'Cured Seabass Crudo',
    rating: 3,
    tagline: 'Jeruk meyer, minyak zaitun, garam laut',
    description: 'Seabass segar iris tipis, dimarinasi dalam citrus oil pres dingin dan rempah organik.',
    price: 'Rp 48.000',
    category: 'Hidangan Pembuka'
  },
  {
    name: 'Heirloom Tomato Salad',
    rating: 3,
    tagline: 'Keju burrata, selasih liar, cuka balsamic',
    description: 'Tomat lokal pilihan berpadu burrata segar yang lembut dan renyah potongan sourdough.',
    price: 'Rp 42.000',
    category: 'Hidangan Pembuka'
  },
  {
    name: 'Wood-Fired Duck Breast',
    rating: 3,
    tagline: 'Bebek panggang kayu, madu liar, rempah umbi',
    description: 'Dada bebek bakar kayu empuk disajikan dengan wortel madu dan saus jus khas Atma.',
    price: 'Rp 78.000',
    category: 'Hidangan Utama'
  },
  {
    name: 'Heritage Potato Gnocchi',
    rating: 3,
    tagline: 'Gnocchi kentang, jamur chanterelle, mentega sage',
    description: 'Gnocchi kentang lembut ditumis dengan mentega sage wangi dan jamur liar musiman.',
    price: 'Rp 64.000',
    category: 'Hidangan Utama'
  },
  {
    name: 'Atma Botanical Tonic',
    rating: 3,
    tagline: 'Krisantemum, kelengkeng, soda madu alami',
    description: 'Minuman penyegar botani khas kami yang terinspirasi dari resep herbal klasik.',
    price: 'Rp 32.000',
    category: 'Minuman'
  },
  {
    name: 'City Blossoms',
    rating: 3,
    tagline: 'Gin non-alkohol, matcha, perasan lemon',
    description: 'Mocktail gin non-alkohol segar dengan sentuhan matcha alami dan jeruk pres bersih.',
    price: 'Rp 32.000',
    category: 'Minuman'
  }
];

const categories = ['Semua', 'Hidangan Pembuka', 'Hidangan Utama', 'Minuman'];

export default function Home({ onNavigate }) {
  const { user } = useContext(AuthContext);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2 Tamu'
  });

  const filteredMenu = activeCategory === 'Semua'
    ? menuData
    : menuData.filter(item => item.category === activeCategory);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!user) {
      setFormError('Silakan login terlebih dahulu untuk melakukan reservasi.');
      setTimeout(() => {
        onNavigate('login');
      }, 2000);
      return;
    }

    if (formData.name && formData.email && formData.date && formData.time) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col bg-warm-cream">
      {/* 1. HERO SECTION: Ruang hangat untuk setiap pertemuan di meja */}
      <section id="home" className="pt-12 sm:pt-16 pb-32 flex flex-col items-center justify-center text-center px-6 bg-warm-cream">
        <div className="flex flex-col items-center gap-8 max-w-3xl">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light italic text-bitter-chocolate leading-[1.15] tracking-tight">
            Ruang hangat untuk setiap pertemuan di meja.
          </h1>
          <p className="font-sans text-sm sm:text-base text-bitter-chocolate/70 max-w-xl leading-relaxed">
            Sajian bermakna, dihidangkan dengan perhatian penuh. Kami mengundang Anda untuk sejenak bersantai dan menikmati rasa yang dibuat untuk dikenang.
          </p>
          <div className="mt-4">
            <button
              onClick={() => onNavigate('book')}
              className="bg-bitter-chocolate hover:bg-antique-gold text-warm-cream font-sans text-xs font-bold uppercase tracking-[0.2em] py-4 px-10 rounded-md transition-colors duration-500 shadow-sm cursor-pointer"
            >
              Reservasi Meja
            </button>
          </div>
        </div>

        {/* Elegant Framed dining room image below the text, matching the visual layout */}
        <div className="mt-16 w-full max-w-4xl p-3 bg-warm-cream-dark border border-bitter-chocolate/10 rounded-xl">
          <div className="border border-bitter-chocolate/10 overflow-hidden bg-bitter-chocolate/5 h-[240px] sm:h-[360px] md:h-[420px] rounded-md flex items-center justify-center">
            <img
              src={heroImg}
              alt="Atma Dining Room"
              className="w-full h-full object-cover grayscale opacity-95 contrast-[1.05]"
            />
          </div>
          <p className="font-serif italic text-xs text-bitter-chocolate/60 text-center mt-3">
            Ruang makan utama kami, dipotret dalam cahaya sore hari.
          </p>
        </div>
      </section>

      {/* 2. EXPERIENCE SECTION: Keramahtamahan klasik */}
      <section id="experience" className="py-28 px-6 sm:px-12 bg-warm-cream-dark/20 text-center flex flex-col items-center justify-center w-full border-t border-b border-bitter-chocolate/5">
        <div className="flex items-center justify-center gap-4 text-antique-gold mb-8">
          <span className="w-12 h-[1px] bg-antique-gold/30"></span>
          <h2 className="font-serif text-2xl sm:text-3xl italic text-bitter-chocolate font-light tracking-wide">
            Selamat Datang di Atma
          </h2>
          <span className="w-12 h-[1px] bg-antique-gold/30"></span>
        </div>

        <div className="flex flex-col gap-6 text-sm sm:text-base text-bitter-chocolate/80 max-w-3xl leading-relaxed font-sans">
          <p>
            Dapur kami mengolah bahan organik musiman terbaik secara jujur, disajikan dengan kehangatan oleh tim yang mendedikasikan diri pada keahlian kuliner klasik. Setiap detail dirancang untuk menciptakan kenyamanan bersantap yang tenang.
          </p>
        </div>

        <p className="font-serif italic text-base sm:text-lg text-antique-gold mt-10 max-w-xl leading-relaxed">
          "Menghadirkan kehangatan dalam setiap cerita di meja makan."
        </p>
      </section>

      {/* 3. MENU SECTION: Whitespace luas, heading tipografi besar, gaya restoran mewah */}
      <section id="menu" className="py-32 bg-warm-cream flex flex-col items-center">
        <div className="max-w-4xl px-6 text-center mb-16">
          <h2 className="font-serif italic text-4xl sm:text-5xl font-light text-bitter-chocolate mb-6">
            Sajian Terbaik Kami
          </h2>
          <p className="font-sans text-xs sm:text-sm text-bitter-chocolate/60 max-w-2xl mx-auto leading-relaxed">
            Sajian musiman yang diolah dengan presisi.
          </p>
          
          {/* Menu Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-wider font-semibold px-5 py-2 rounded-md border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-bitter-chocolate text-warm-cream border-bitter-chocolate font-bold'
                    : 'bg-transparent text-bitter-chocolate/65 border-bitter-chocolate/20 hover:text-bitter-chocolate hover:border-bitter-chocolate/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid (Soft rounded card corners, spacious tracking) */}
        <div className="max-w-6xl w-full px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.map((item, idx) => (
            <div
              key={idx}
              className="bg-warm-cream-dark/15 border border-bitter-chocolate/5 hover:border-antique-gold/30 hover:bg-warm-cream-dark/20 p-8 flex flex-col justify-between transition-all duration-300 rounded-xl relative"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h4 className="font-serif text-lg font-bold text-bitter-chocolate leading-tight">
                    {item.name}
                  </h4>
                </div>

                <p className="font-sans text-[11px] uppercase tracking-wider text-antique-gold mb-3">
                  {item.tagline}
                </p>

                <p className="font-sans text-xs text-bitter-chocolate/70 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="border-t border-bitter-chocolate/5 pt-4 mt-auto">
                <span className="font-serif text-sm font-semibold text-bitter-chocolate">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. RESERVATION SECTION: Latar belakang bersih, spasi luas, form kontainer rounded */}
      <section id="book" className="py-32 border-t border-bitter-chocolate/10 bg-warm-cream-dark/15 px-6 sm:px-12 text-center flex flex-col items-center w-full">
        <div className="max-w-xl text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl italic font-light text-bitter-chocolate">
            Siapkan Tempat Anda
          </h2>
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-bitter-chocolate/55 mt-2">
            Ajukan reservasi, kami akan menyiapkan meja Anda.
          </p>
        </div>

        {/* Center Reservation Card */}
        <div className="w-full max-w-xl bg-warm-cream border border-bitter-chocolate/10 p-8 sm:p-10 text-left rounded-xl shadow-sm">
          {formSubmitted ? (
            <div className="text-center py-12 flex flex-col gap-4 animate-fade-in">
              <h3 className="font-serif italic text-2xl text-antique-gold">Reservasi Diajukan</h3>
              <p className="font-sans text-sm text-bitter-chocolate/80 max-w-md mx-auto leading-relaxed">
                Permintaan reservasi Anda untuk <strong className="text-bitter-chocolate font-bold">{formData.guests}</strong> pada <strong className="text-bitter-chocolate">{formData.date}</strong> pukul <strong className="text-bitter-chocolate">{formData.time}</strong> telah diterima dan sedang ditinjau.
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', date: '', time: '', guests: '2 Tamu' });
                }}
                className="mt-6 text-xs uppercase tracking-widest text-antique-gold font-bold hover:text-bitter-chocolate transition-colors duration-300 border-b border-antique-gold/30 hover:border-bitter-chocolate"
              >
                Ajukan Reservasi Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
              {formError && (
                <div className="bg-terracotta-bg border border-terracotta-text/10 text-terracotta-text text-xs py-3.5 px-5 rounded-md font-sans text-center animate-fade-in">
                  {formError}
                </div>
              )}
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/60">
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nama Anda"
                  required
                  className="w-full bg-warm-cream/50 border border-bitter-chocolate/20 px-3.5 py-2.5 text-bitter-chocolate focus:border-antique-gold focus:outline-none focus:ring-1 focus:ring-antique-gold rounded-md transition-all duration-300 text-sm font-sans"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/60">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@anda.com"
                  required
                  className="w-full bg-warm-cream/50 border border-bitter-chocolate/20 px-3.5 py-2.5 text-bitter-chocolate focus:border-antique-gold focus:outline-none focus:ring-1 focus:ring-antique-gold rounded-md transition-all duration-300 text-sm font-sans"
                />
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/60">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-warm-cream/50 border border-bitter-chocolate/20 px-3.5 py-2.5 text-bitter-chocolate focus:border-antique-gold focus:outline-none focus:ring-1 focus:ring-antique-gold rounded-md transition-all duration-300 text-sm font-sans"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/60">
                    Waktu
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-warm-cream/50 border border-bitter-chocolate/20 px-3.5 py-2.5 text-bitter-chocolate focus:border-antique-gold focus:outline-none focus:ring-1 focus:ring-antique-gold rounded-md transition-all duration-300 text-sm font-sans appearance-none"
                  >
                    <option value="">Pilih slot waktu</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                  </select>
                </div>
              </div>

              {/* Number of Guests Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/60">
                  Jumlah Tamu
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full bg-warm-cream/50 border border-bitter-chocolate/20 px-3.5 py-2.5 text-bitter-chocolate focus:border-antique-gold focus:outline-none focus:ring-1 focus:ring-antique-gold rounded-md transition-all duration-300 text-sm font-sans"
                >
                  <option value="1 Tamu">1 Tamu</option>
                  <option value="2 Tamu">2 Tamu</option>
                  <option value="3 Tamu">3 Tamu</option>
                  <option value="4 Tamu">4 Tamu</option>
                  <option value="5 Tamu">5 Tamu</option>
                  <option value="6 Tamu">6 Tamu</option>
                </select>
              </div>

              {/* Reserve Button */}
              <button
                type="submit"
                className="mt-4 bg-bitter-chocolate hover:bg-antique-gold text-warm-cream font-sans text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-md transition-colors duration-500 shadow-sm cursor-pointer"
              >
                Reservasi Meja
              </button>

              {/* Premium information disclaimer */}
              <p className="text-[10px] font-sans text-bitter-chocolate/50 text-center mt-2 tracking-wider">
                Untuk reservasi kelompok lebih dari 6 orang, silakan hubungi tim host kami secara langsung.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
