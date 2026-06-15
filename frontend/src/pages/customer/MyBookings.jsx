import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getMyBookings, cancelBooking } from '../../services/booking';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

export default function MyBookings({ onNavigate }) {
  const { user } = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingsList, setBookingsList] = useState([]);

  // Fetch bookings from backend API
  const fetchMyBookings = async () => {
    if (!user) return;
    setIsLoading(true);
    setError('');
    try {
      const data = await getMyBookings();
      setBookingsList(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Gagal mengambil riwayat reservasi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sync on mount and key updates
  useEffect(() => {
    fetchMyBookings();
  }, [user, refreshKey]);

  // Page focus sync (automatic refetch on focus)
  useEffect(() => {
    const handleFocus = () => {
      fetchMyBookings();
    };
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [user]);

  // Format date for indonesian display
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleOpenCancelModal = (booking) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
    setError('');
  };

  const handleCloseCancelModal = () => {
    setSelectedBooking(null);
    setIsCancelModalOpen(false);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBooking || !user) return;
    setIsLoading(true);
    setError('');

    try {
      await cancelBooking(selectedBooking.id);
      // Trigger list refresh via key increment
      setRefreshKey((prev) => prev + 1);
      setIsCancelModalOpen(false);
      setSelectedBooking(null);
    } catch (err) {
      setError(err.message || 'Gagal membatalkan reservasi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20 animate-fade-in">
      
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold block mb-3">
          Riwayat Pelanggan
        </span>
        <h1 className="font-serif italic text-4xl sm:text-5xl text-bitter-chocolate mb-3">
          Reservasi Saya
        </h1>
        <p className="font-sans text-sm text-bitter-chocolate/60 max-w-md mx-auto leading-relaxed">
          Pantau status reservasi meja Anda atau lakukan pembatalan sebelum waktu kunjungan Anda.
        </p>
      </div>

      {/* Booking List Container */}
      {bookingsList.length === 0 ? (
        // Empty State: Elegant SVG Outline Plate
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-warm-cream-dark/20 border border-bitter-chocolate/10 rounded-lg max-w-lg mx-auto">
          <svg
            className="w-24 h-24 text-bitter-chocolate/20 mb-6"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer plate circle */}
            <circle cx="50" cy="50" r="40" />
            {/* Inner plate circle */}
            <circle cx="50" cy="50" r="28" strokeDasharray="3 3" />
            {/* Knife */}
            <path d="M82 30 v30 c0 4-2 6-4 6 h-2 V30 Z" />
            <path d="M78 66 v12" />
            {/* Fork */}
            <path d="M18 30 v18 c0 4 2 6 4 6 h2 V30" />
            <path d="M22 30 v18" />
            <path d="M22 54 v24" />
          </svg>
          <h3 className="font-serif italic text-xl text-bitter-chocolate mb-2">
            Belum Ada Reservasi
          </h3>
          <p className="font-sans text-sm text-bitter-chocolate/55 mb-8 max-w-xs leading-relaxed">
            Anda belum memiliki riwayat reservasi meja di Atma Dining House.
          </p>
          <button
            onClick={() => onNavigate('book')}
            className="inline-flex items-center justify-center font-sans text-[11px] font-bold uppercase tracking-[0.2em] bg-bitter-chocolate text-warm-cream hover:bg-antique-gold py-3.5 px-8 transition-colors duration-500 rounded-none cursor-pointer"
          >
            Pesan Meja Sekarang
          </button>
        </div>
      ) : (
        // Newspaper-style List
        <div className="space-y-4">
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 pb-3 border-b border-bitter-chocolate/10 text-[10px] uppercase tracking-wider font-bold text-bitter-chocolate/50">
            <div className="col-span-3">Tanggal</div>
            <div className="col-span-2">Waktu</div>
            <div className="col-span-2">Meja</div>
            <div className="col-span-2">Tamu</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Aksi</div>
          </div>

          <div className="divide-y divide-bitter-chocolate/5">
            {bookingsList.map((booking) => (
              <div
                key={booking.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 px-6 items-center hover:bg-warm-cream-dark/20 transition-colors duration-300 rounded-md border border-transparent hover:border-bitter-chocolate/5"
              >
                {/* Date */}
                <div className="col-span-3 flex flex-col md:block">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-bitter-chocolate/40 md:hidden mb-1">
                    Tanggal
                  </span>
                  <span className="font-serif text-base text-bitter-chocolate">
                    {formatDate(booking.booking_date)}
                  </span>
                </div>

                {/* Time */}
                <div className="col-span-2 flex flex-col md:block">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-bitter-chocolate/40 md:hidden mb-1">
                    Waktu
                  </span>
                  <span className="font-sans text-sm text-bitter-chocolate font-medium">
                    {booking.booking_time}
                  </span>
                </div>

                {/* Table */}
                <div className="col-span-2 flex flex-col md:block">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-bitter-chocolate/40 md:hidden mb-1">
                    Meja
                  </span>
                  <span className="font-serif text-sm font-bold text-antique-gold">
                    Meja {booking.table_number}
                  </span>
                  <span className="font-sans text-[11px] text-bitter-chocolate/40 block md:inline md:ml-1">
                    ({booking.capacity} kursi)
                  </span>
                </div>

                {/* Guests */}
                <div className="col-span-2 flex flex-col md:block">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-bitter-chocolate/40 md:hidden mb-1">
                    Tamu
                  </span>
                  <span className="font-sans text-sm text-bitter-chocolate">
                    {booking.guest_count} Orang
                  </span>
                </div>

                {/* Status Badge */}
                <div className="col-span-2 flex flex-col md:block items-start">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-bitter-chocolate/40 md:hidden mb-1">
                    Status
                  </span>
                  <Badge status={booking.status} />
                </div>

                {/* Actions */}
                <div className="col-span-1 flex justify-end md:block text-right">
                  {['pending', 'approved'].includes(booking.status) ? (
                    <button
                      onClick={() => handleOpenCancelModal(booking)}
                      className="text-[10px] uppercase font-bold tracking-widest text-terracotta-text border-b border-terracotta-text/30 hover:border-bitter-chocolate hover:text-bitter-chocolate transition-colors duration-300 py-1 cursor-pointer"
                    >
                      Batal
                    </button>
                  ) : (
                    <span className="text-xs text-bitter-chocolate/30">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cancellation Modal */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={handleCloseCancelModal}
        title="Batalkan Reservasi"
        confirmText="Ya, Batalkan"
        cancelText="Kembali"
        onConfirm={handleConfirmCancel}
        isDangerous={true}
        isLoading={isLoading}
      >
        {selectedBooking && (
          <div className="space-y-4">
            <p className="text-sm text-bitter-chocolate/75">
              Apakah Anda yakin ingin membatalkan reservasi meja ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="bg-warm-cream-dark/50 border border-bitter-chocolate/5 rounded-md p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-bitter-chocolate/50 uppercase tracking-wider">Tanggal</span>
                <span className="font-serif text-bitter-chocolate">{formatDate(selectedBooking.booking_date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-bitter-chocolate/50 uppercase tracking-wider">Waktu</span>
                <span className="font-sans font-medium text-bitter-chocolate">{selectedBooking.booking_time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-bitter-chocolate/50 uppercase tracking-wider">Nomor Meja</span>
                <span className="font-serif font-bold text-antique-gold">Meja {selectedBooking.table_number}</span>
              </div>
            </div>
            {error && (
              <p className="text-xs text-terracotta-text font-medium text-center bg-terracotta-bg p-2 rounded border border-terracotta-text/10">
                {error}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
