import { useState, useContext, useMemo } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getAvailableTables, createBooking } from '../../services/mockData';
import Badge from '../../components/ui/Badge';

const TIME_SLOTS = [
  '11:30', '12:00', '12:30', '13:00', '13:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00',
];

export default function Dashboard({ onNavigate }) {
  const { user } = useContext(AuthContext);

  // Form state
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [selectedTableId, setSelectedTableId] = useState(null);

  // UI state
  const [step, setStep] = useState(1); // 1: date/time, 2: table, 3: confirm
  const [error, setError] = useState('');
  const [successBooking, setSuccessBooking] = useState(null);

  // Compute available tables when date & time are selected
  const availableTables = useMemo(() => {
    if (!bookingDate || !bookingTime) return [];
    return getAvailableTables(bookingDate, bookingTime);
  }, [bookingDate, bookingTime]);

  // Get the selected table object
  const selectedTable = useMemo(() => {
    if (!selectedTableId) return null;
    return availableTables.find((t) => t.id === selectedTableId) || null;
  }, [selectedTableId, availableTables]);

  // Capacity warning
  const capacityWarning = useMemo(() => {
    if (!selectedTable) return '';
    if (guestCount > selectedTable.capacity) {
      return `Jumlah tamu (${guestCount}) melebihi kapasitas meja ${selectedTable.table_number} (maksimal ${selectedTable.capacity} orang).`;
    }
    return '';
  }, [selectedTable, guestCount]);

  // Today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  const handleProceedToTables = () => {
    setError('');
    if (!bookingDate) { setError('Silakan pilih tanggal reservasi.'); return; }
    if (!bookingTime) { setError('Silakan pilih waktu reservasi.'); return; }
    setSelectedTableId(null);
    setStep(2);
  };

  const handleSelectTable = (tableId) => {
    const table = availableTables.find((t) => t.id === tableId);
    if (table && table.isBooked) return; // Can't select booked table
    setSelectedTableId(tableId);
    setError('');
  };

  const handleProceedToConfirm = () => {
    setError('');
    if (!selectedTableId) { setError('Silakan pilih meja terlebih dahulu.'); return; }
    if (capacityWarning) { setError(capacityWarning); return; }
    setStep(3);
  };

  const handleSubmitBooking = () => {
    setError('');
    try {
      const newBooking = createBooking({
        userId: user.id,
        userName: user.nama,
        userEmail: user.email,
        tableId: selectedTableId,
        bookingDate,
        bookingTime,
        guestCount: Number(guestCount),
      });
      setSuccessBooking(newBooking);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setBookingDate('');
    setBookingTime('');
    setGuestCount(2);
    setSelectedTableId(null);
    setStep(1);
    setError('');
    setSuccessBooking(null);
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  // ── SUCCESS STATE ──
  if (successBooking) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24 animate-fade-in">
        <div className="text-center flex flex-col gap-6">
          <span className="text-5xl">✨</span>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold block mb-2">Reservasi Diajukan</span>
            <h2 className="font-serif italic text-3xl sm:text-4xl text-bitter-chocolate">Terima Kasih, {user.nama}</h2>
          </div>

          <div className="bg-warm-cream-dark/50 border border-bitter-chocolate/10 rounded-lg p-8 text-left space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-bitter-chocolate/50 block mb-1">Tanggal</span>
                <span className="font-serif text-lg text-bitter-chocolate">{formatDate(successBooking.booking_date)}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-bitter-chocolate/50 block mb-1">Waktu</span>
                <span className="font-serif text-lg text-bitter-chocolate">{successBooking.booking_time}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-bitter-chocolate/50 block mb-1">Meja</span>
                <span className="font-serif text-lg text-bitter-chocolate">{successBooking.table_number}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-bitter-chocolate/50 block mb-1">Jumlah Tamu</span>
                <span className="font-serif text-lg text-bitter-chocolate">{successBooking.guest_count} orang</span>
              </div>
            </div>
            <div className="pt-4 border-t border-bitter-chocolate/10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-bitter-chocolate/50">Status:</span>
                <Badge status="pending" />
              </div>
              <p className="text-xs text-bitter-chocolate/60 mt-2 leading-relaxed">
                Reservasi Anda sedang menunggu konfirmasi dari tim kami. Anda akan menerima notifikasi setelah reservasi disetujui.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button
              onClick={handleReset}
              className="text-xs uppercase font-bold tracking-widest text-antique-gold border-b border-antique-gold/30 hover:border-bitter-chocolate hover:text-bitter-chocolate transition-colors duration-300 cursor-pointer"
            >
              Buat Reservasi Lain
            </button>
            <button
              onClick={() => onNavigate('my-bookings')}
              className="text-xs uppercase font-bold tracking-widest text-bitter-chocolate border-b border-bitter-chocolate/30 hover:border-antique-gold hover:text-antique-gold transition-colors duration-300 cursor-pointer"
            >
              Lihat Reservasi Saya
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20 animate-fade-in">
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold block mb-3">
          Pemesanan Meja
        </span>
        <h1 className="font-serif italic text-4xl sm:text-5xl text-bitter-chocolate mb-3">
          Reservasi Meja Anda
        </h1>
        <p className="font-sans text-sm text-bitter-chocolate/60 max-w-md mx-auto leading-relaxed">
          Pilih tanggal, waktu, dan meja yang Anda inginkan. Reservasi akan dikonfirmasi oleh tim kami.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {[
          { num: 1, label: 'Tanggal & Waktu' },
          { num: 2, label: 'Pilih Meja' },
          { num: 3, label: 'Konfirmasi' },
        ].map(({ num, label }) => (
          <div key={num} className="flex items-center gap-2">
            <button
              onClick={() => {
                if (num < step) setStep(num);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step >= num
                  ? 'bg-bitter-chocolate text-warm-cream'
                  : 'border border-bitter-chocolate/20 text-bitter-chocolate/40'
              } ${num < step ? 'cursor-pointer hover:bg-antique-gold' : ''}`}
            >
              {num}
            </button>
            <span className={`text-[10px] uppercase tracking-wider font-semibold hidden sm:inline ${
              step >= num ? 'text-bitter-chocolate' : 'text-bitter-chocolate/30'
            }`}>
              {label}
            </span>
            {num < 3 && (
              <div className={`w-12 h-px mx-1 ${step > num ? 'bg-bitter-chocolate' : 'bg-bitter-chocolate/10'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-terracotta-bg border border-terracotta-text/10 text-terracotta-text text-xs py-3.5 px-5 rounded-md font-sans mb-8 text-center animate-fade-in">
          {error}
        </div>
      )}

      {/* ── STEP 1: Date & Time ── */}
      {step === 1 && (
        <div className="max-w-lg mx-auto animate-fade-in">
          <div className="bg-warm-cream-dark/30 border border-bitter-chocolate/10 rounded-lg p-8 space-y-6">
            <h3 className="font-serif italic text-xl text-bitter-chocolate text-center">Pilih Tanggal & Waktu</h3>

            {/* Date */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/60">
                Tanggal Reservasi
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={today}
                className="w-full bg-warm-cream border border-bitter-chocolate/15 py-3.5 px-4 text-bitter-chocolate rounded-md focus:border-antique-gold focus:outline-none transition-colors duration-300 text-sm font-sans"
              />
            </div>

            {/* Time */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/60">
                Waktu Reservasi
              </label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setBookingTime(slot)}
                    className={`py-2.5 text-xs font-semibold rounded-md border transition-all duration-300 cursor-pointer ${
                      bookingTime === slot
                        ? 'bg-bitter-chocolate text-warm-cream border-bitter-chocolate'
                        : 'bg-warm-cream border-bitter-chocolate/15 text-bitter-chocolate/70 hover:border-antique-gold hover:text-antique-gold'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Count */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/60">
                Jumlah Tamu
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full bg-warm-cream border border-bitter-chocolate/15 py-3.5 px-4 text-bitter-chocolate rounded-md focus:border-antique-gold focus:outline-none transition-colors duration-300 text-sm font-sans appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>{n} Tamu</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleProceedToTables}
              className="w-full mt-2 bg-bitter-chocolate hover:bg-antique-gold text-warm-cream font-sans text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-md transition-colors duration-500 cursor-pointer"
            >
              Lihat Meja Tersedia
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Table Selection ── */}
      {step === 2 && (
        <div className="animate-fade-in">
          {/* Summary bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-xs text-bitter-chocolate/60">
            <span className="flex items-center gap-1.5">
              <span className="font-semibold uppercase tracking-wider">Tanggal:</span>
              <span className="font-serif text-sm text-bitter-chocolate">{formatDate(bookingDate)}</span>
            </span>
            <span className="text-bitter-chocolate/20">|</span>
            <span className="flex items-center gap-1.5">
              <span className="font-semibold uppercase tracking-wider">Waktu:</span>
              <span className="font-serif text-sm text-bitter-chocolate">{bookingTime}</span>
            </span>
            <span className="text-bitter-chocolate/20">|</span>
            <span className="flex items-center gap-1.5">
              <span className="font-semibold uppercase tracking-wider">Tamu:</span>
              <span className="font-serif text-sm text-bitter-chocolate">{guestCount} orang</span>
            </span>
          </div>

          <h3 className="font-serif italic text-xl text-bitter-chocolate text-center mb-6">Pilih Meja Anda</h3>

          {/* Capacity warning */}
          {capacityWarning && (
            <div className="bg-terracotta-bg border border-terracotta-text/10 text-terracotta-text text-xs py-3 px-5 rounded-md font-sans mb-6 text-center animate-fade-in">
              {capacityWarning}
            </div>
          )}

          {/* Table Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {availableTables.map((table) => {
              const isSelected = selectedTableId === table.id;
              const isBooked = table.isBooked;
              const isTooSmall = guestCount > table.capacity;

              return (
                <button
                  key={table.id}
                  type="button"
                  onClick={() => handleSelectTable(table.id)}
                  disabled={isBooked}
                  className={`relative flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer
                    ${isBooked
                      ? 'bg-sepia-bg border-sepia-text/10 opacity-50 cursor-not-allowed'
                      : isSelected
                        ? 'bg-warm-cream border-antique-gold shadow-[0_0_0_1px_rgba(156,124,56,0.3)]'
                        : isTooSmall
                          ? 'bg-warm-cream-dark/20 border-bitter-chocolate/10 hover:border-terracotta-text/30'
                          : 'bg-warm-cream-dark/30 border-bitter-chocolate/10 hover:border-antique-gold/50'
                    }`}
                >
                  {/* Table Number */}
                  <span className={`font-serif text-2xl font-bold mb-1 ${
                    isBooked ? 'text-sepia-text' : isSelected ? 'text-antique-gold' : 'text-bitter-chocolate'
                  }`}>
                    {table.table_number}
                  </span>

                  {/* Capacity */}
                  <span className={`text-[10px] uppercase tracking-wider font-semibold ${
                    isBooked ? 'text-sepia-text/60' : 'text-bitter-chocolate/50'
                  }`}>
                    {table.capacity} kursi
                  </span>

                  {/* Status indicators */}
                  {isBooked && (
                    <span className="absolute top-2 right-2 text-[9px] uppercase tracking-wider font-bold text-sepia-text">
                      Terisi
                    </span>
                  )}
                  {isSelected && !isBooked && (
                    <span className="absolute top-2 right-2 w-3 h-3 bg-antique-gold rounded-full" />
                  )}
                  {isTooSmall && !isBooked && !isSelected && (
                    <span className="text-[9px] text-terracotta-text mt-1 font-semibold">Terlalu kecil</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-[10px] uppercase tracking-wider font-semibold text-bitter-chocolate/40 mb-8">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 border-2 border-bitter-chocolate/10 rounded-sm bg-warm-cream-dark/30" /> Tersedia
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 border-2 border-antique-gold rounded-sm bg-warm-cream" /> Dipilih
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 border-2 border-sepia-text/10 rounded-sm bg-sepia-bg opacity-50" /> Terisi
            </span>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setStep(1)}
              className="text-xs uppercase font-bold tracking-widest text-bitter-chocolate/60 border-b border-bitter-chocolate/20 hover:text-bitter-chocolate hover:border-bitter-chocolate transition-colors duration-300 cursor-pointer"
            >
              Kembali
            </button>
            <button
              onClick={handleProceedToConfirm}
              disabled={!selectedTableId || !!capacityWarning}
              className={`bg-bitter-chocolate text-warm-cream font-sans text-xs font-bold uppercase tracking-[0.2em] py-3.5 px-10 rounded-md transition-colors duration-500 cursor-pointer ${
                !selectedTableId || capacityWarning
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-antique-gold'
              }`}
            >
              Lanjutkan
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Confirmation ── */}
      {step === 3 && selectedTable && (
        <div className="max-w-lg mx-auto animate-fade-in">
          <div className="bg-warm-cream-dark/30 border border-bitter-chocolate/10 rounded-lg p-8">
            <h3 className="font-serif italic text-xl text-bitter-chocolate text-center mb-6">Konfirmasi Reservasi</h3>

            <div className="space-y-5">
              <div className="flex justify-between items-baseline border-b border-bitter-chocolate/5 pb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/50">Nama</span>
                <span className="font-sans text-sm text-bitter-chocolate font-medium">{user.nama}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-bitter-chocolate/5 pb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/50">Email</span>
                <span className="font-sans text-sm text-bitter-chocolate">{user.email}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-bitter-chocolate/5 pb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/50">Tanggal</span>
                <span className="font-serif text-sm text-bitter-chocolate">{formatDate(bookingDate)}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-bitter-chocolate/5 pb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/50">Waktu</span>
                <span className="font-serif text-sm text-bitter-chocolate">{bookingTime}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-bitter-chocolate/5 pb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/50">Meja</span>
                <span className="font-serif text-sm text-bitter-chocolate font-bold">{selectedTable.table_number} <span className="font-sans font-normal text-bitter-chocolate/50">({selectedTable.capacity} kursi)</span></span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider font-semibold text-bitter-chocolate/50">Jumlah Tamu</span>
                <span className="font-serif text-sm text-bitter-chocolate">{guestCount} orang</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={handleSubmitBooking}
                className="w-full bg-bitter-chocolate hover:bg-antique-gold text-warm-cream font-sans text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-md transition-colors duration-500 cursor-pointer"
              >
                Ajukan Reservasi
              </button>
              <button
                onClick={() => setStep(2)}
                className="text-xs uppercase font-bold tracking-widest text-bitter-chocolate/60 hover:text-bitter-chocolate transition-colors duration-300 cursor-pointer text-center"
              >
                Kembali Pilih Meja
              </button>
            </div>

            <p className="text-[10px] font-sans text-bitter-chocolate/40 text-center mt-4 tracking-wider leading-relaxed">
              Reservasi Anda akan berstatus <em>Pending</em> hingga dikonfirmasi oleh tim host restoran.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
