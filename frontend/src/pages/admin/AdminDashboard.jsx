import { useState, useEffect } from 'react';
import { adminGetBookings, adminApproveBooking, adminRejectBooking } from '../../services/admin';
import Badge from '../../components/ui/Badge';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBookings = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await adminGetBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Gagal memuat reservasi');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleAction = async (bookingId, type) => {
    // Keep a backup of current bookings for rollback
    const originalBookings = [...bookings];

    // Optimistically update status
    const targetStatus = type === 'approve' ? 'approved' : 'rejected';
    setBookings((prevBookings) =>
      prevBookings.map((b) =>
        b.id === bookingId ? { ...b, status: targetStatus } : b
      )
    );

    setError('');

    try {
      if (type === 'approve') {
        await adminApproveBooking(bookingId);
      } else {
        await adminRejectBooking(bookingId);
      }
      await loadBookings(); // Refetch database data to avoid stale state
    } catch (err) {
      console.error(err);
      // Rollback to original state on failure
      setBookings(originalBookings);
      setError(err.message || `Gagal ${type === 'approve' ? 'menyetujui' : 'menolak'} reservasi.`);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center animate-fade-in">
        <div className="w-8 h-8 border-2 border-antique-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="font-sans text-sm text-bitter-chocolate/60">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center animate-fade-in">
        <div className="mb-6 p-4 bg-terracotta-bg border border-terracotta-text/10 text-terracotta-text text-sm rounded-md max-w-md mx-auto animate-fade-in">
          {error}
        </div>
        <button
          onClick={loadBookings}
          className="px-5 py-2.5 bg-bitter-chocolate text-warm-cream hover:bg-antique-gold font-sans text-xs font-bold uppercase tracking-wider rounded-md transition-colors duration-300 cursor-pointer"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center animate-fade-in">
        <div className="py-16 px-4 bg-warm-cream-dark/20 border border-bitter-chocolate/10 rounded-lg max-w-lg mx-auto">
          <h3 className="font-serif italic text-xl text-bitter-chocolate mb-2">No bookings found</h3>
          <p className="font-sans text-xs text-bitter-chocolate/55 max-w-xs mx-auto leading-relaxed">
            Tidak ada riwayat reservasi terdaftar di sistem saat ini.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 sm:pt-24 pb-12 sm:pb-20 animate-fade-in">
      {/* Header */}
      <div className="mb-12 border-b border-bitter-chocolate/10 pb-8">
        <h1 className="font-serif italic text-3xl sm:text-4xl text-bitter-chocolate">
          Kelola Reservasi
        </h1>
      </div>

      {/* Booking Table */}
      <div className="bg-warm-cream-dark/10 border border-bitter-chocolate/10 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-bitter-chocolate/10 text-[9px] uppercase tracking-wider font-bold text-bitter-chocolate/50 bg-warm-cream-dark/30">
                <th className="py-4 px-6">Nama pengguna</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Tanggal booking</th>
                <th className="py-4 px-6">Jam booking</th>
                <th className="py-4 px-6">Nomor meja</th>
                <th className="py-4 px-6">Status booking</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bitter-chocolate/5 font-sans text-xs">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-warm-cream-dark/20 transition-colors duration-300">
                  <td className="py-4 px-6 font-medium text-bitter-chocolate">
                    {booking.user_name}
                  </td>
                  <td className="py-4 px-6 text-bitter-chocolate/70">
                    {booking.user_email}
                  </td>
                  <td className="py-4 px-6 font-serif text-sm font-semibold">
                    {formatDate(booking.booking_date)}
                  </td>
                  <td className="py-4 px-6 text-bitter-chocolate/70">
                    {booking.booking_time}
                  </td>
                  <td className="py-4 px-6 font-serif">
                    <span className="font-bold text-antique-gold">Meja {booking.table_number}</span>
                  </td>
                  <td className="py-4 px-6">
                    <Badge status={booking.status} />
                  </td>
                  <td className="py-4 px-6 text-right">
                    {booking.status === 'pending' ? (
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleAction(booking.id, 'reject')}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-md transition-colors duration-300 cursor-pointer"
                        >
                          Tolak
                        </button>
                        <button
                          onClick={() => handleAction(booking.id, 'approve')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-md transition-colors duration-300 cursor-pointer"
                        >
                          Setujui
                        </button>
                      </div>
                    ) : (
                      <span className="text-bitter-chocolate/30 text-xs font-semibold">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
