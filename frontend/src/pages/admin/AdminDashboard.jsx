import { useState, useEffect } from 'react';
import { adminGetBookings, adminApproveBooking, adminRejectBooking } from '../../services/admin';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

export default function AdminDashboard({ onNavigate }) {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Modal actions state
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionType, setActionType] = useState(null); // 'approve' | 'reject'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');

  const loadBookings = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await adminGetBookings({
        status: statusFilter,
        date: dateFilter,
      });
      setBookings(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Gagal mengambil data reservasi.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [statusFilter, dateFilter]);

  const handleOpenActionModal = (booking, type) => {
    setSelectedBooking(booking);
    setActionType(type);
    setIsModalOpen(true);
    setActionError('');
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
    setActionType(null);
    setIsModalOpen(false);
    setActionError('');
  };

  const handleConfirmAction = async () => {
    if (!selectedBooking) return;
    setIsActionLoading(true);
    setActionError('');
    try {
      if (actionType === 'approve') {
        await adminApproveBooking(selectedBooking.id);
      } else {
        await adminRejectBooking(selectedBooking.id);
      }
      // Reload lists
      await loadBookings();
      handleCloseModal();
    } catch (err) {
      setActionError(err.message || 'Gagal memproses tindakan.');
    } finally {
      setIsActionLoading(false);
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

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 sm:py-20 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 border-b border-bitter-chocolate/10 pb-8">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold block mb-2">
            Panel Administrator
          </span>
          <h1 className="font-serif italic text-3xl sm:text-4xl text-bitter-chocolate">
            Kelola Reservasi
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Date filter */}
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider font-bold text-bitter-chocolate/40 mb-1">
              Saring Tanggal
            </span>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent border-b border-bitter-chocolate/20 py-2.5 text-bitter-chocolate text-xs font-sans focus:border-antique-gold focus:outline-none transition-colors duration-300"
            />
          </div>

          {/* Status filter */}
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider font-bold text-bitter-chocolate/40 mb-1">
              Saring Status
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-b border-bitter-chocolate/20 py-2 text-bitter-chocolate text-xs font-sans focus:border-antique-gold focus:outline-none transition-colors duration-300 appearance-none"
            >
              <option value="">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="approved">Disetujui</option>
              <option value="rejected">Ditolak</option>
              <option value="cancelled">Dibatalkan</option>
              <option value="expired">Kedaluwarsa</option>
            </select>
          </div>

          {/* Reset filter buttons */}
          {(dateFilter || statusFilter) && (
            <button
              onClick={() => {
                setDateFilter('');
                setStatusFilter('');
              }}
              className="mt-4 px-3 py-1.5 border border-bitter-chocolate/20 hover:border-bitter-chocolate text-[10px] uppercase font-bold tracking-widest text-bitter-chocolate transition-colors duration-300 rounded-md cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-8 p-4 bg-terracotta-bg border border-terracotta-text/10 text-terracotta-text text-sm rounded-lg flex flex-col items-center gap-3">
          <p>{error}</p>
          <button
            onClick={loadBookings}
            className="px-4 py-2 bg-bitter-chocolate text-warm-cream rounded-md text-xs font-bold uppercase tracking-wider hover:bg-antique-gold transition-colors duration-300 cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Main List */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-antique-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 px-4 bg-warm-cream-dark/20 border border-bitter-chocolate/10 rounded-lg max-w-lg mx-auto">
          <h3 className="font-serif italic text-xl text-bitter-chocolate mb-2">
            Tidak Ada Reservasi
          </h3>
          <p className="font-sans text-xs text-bitter-chocolate/55 max-w-xs mx-auto leading-relaxed">
            Tidak ditemukan riwayat reservasi yang cocok dengan kriteria penyaringan saat ini.
          </p>
        </div>
      ) : (
        <div className="bg-warm-cream-dark/10 border border-bitter-chocolate/10 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-bitter-chocolate/10 text-[9px] uppercase tracking-wider font-bold text-bitter-chocolate/50 bg-warm-cream-dark/30">
                  <th className="py-4 px-6">Pelanggan</th>
                  <th className="py-4 px-6">Tanggal & Waktu</th>
                  <th className="py-4 px-6">Meja</th>
                  <th className="py-4 px-6 text-center">Tamu</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bitter-chocolate/5 font-sans text-xs">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-warm-cream-dark/20 transition-colors duration-300">
                    {/* User Details */}
                    <td className="py-4 px-6">
                      <div className="font-medium text-bitter-chocolate">{booking.user_name}</div>
                      <div className="text-[10px] text-bitter-chocolate/50 mt-0.5">{booking.user_email}</div>
                    </td>

                    {/* Date and Time */}
                    <td className="py-4 px-6">
                      <div className="font-serif text-sm font-semibold">{formatDate(booking.booking_date)}</div>
                      <div className="text-[10px] text-bitter-chocolate/50 mt-0.5">{booking.booking_time}</div>
                    </td>

                    {/* Table Details */}
                    <td className="py-4 px-6 font-serif">
                      <span className="font-bold text-antique-gold">Meja {booking.table_number}</span>
                      <span className="text-[10px] text-bitter-chocolate/40 font-sans block mt-0.5">
                        (Maks {booking.capacity} kursi)
                      </span>
                    </td>

                    {/* Guest Count */}
                    <td className="py-4 px-6 text-center text-sm font-medium">
                      {booking.guest_count} Orang
                    </td>

                    {/* Status badge */}
                    <td className="py-4 px-6">
                      <Badge status={booking.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      {booking.status === 'pending' ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleOpenActionModal(booking, 'reject')}
                            className="px-3 py-1.5 border border-terracotta-text/30 hover:border-terracotta-text text-terracotta-text hover:bg-terracotta-bg/10 text-[10px] font-bold uppercase tracking-wider rounded-md transition-colors duration-300 cursor-pointer"
                          >
                            Tolak
                          </button>
                          <button
                            onClick={() => handleOpenActionModal(booking, 'approve')}
                            className="px-3 py-1.5 bg-bitter-chocolate text-warm-cream hover:bg-antique-gold text-[10px] font-bold uppercase tracking-wider rounded-md transition-colors duration-300 cursor-pointer"
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
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={actionType === 'approve' ? 'Setujui Reservasi' : 'Tolak Reservasi'}
        confirmText={actionType === 'approve' ? 'Ya, Setujui' : 'Ya, Tolak'}
        cancelText="Batal"
        onConfirm={handleConfirmAction}
        isDangerous={actionType === 'reject'}
        isLoading={isActionLoading}
      >
        {selectedBooking && (
          <div className="space-y-4">
            <p className="text-sm text-bitter-chocolate/75 leading-relaxed">
              Apakah Anda yakin ingin {actionType === 'approve' ? 'menyetujui' : 'menolak'} reservasi ini?
            </p>
            <div className="bg-warm-cream-dark/50 border border-bitter-chocolate/5 rounded-lg p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-bitter-chocolate/50 uppercase tracking-wider">Nama Pelanggan</span>
                <span className="font-medium text-bitter-chocolate">{selectedBooking.user_name}</span>
              </div>
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
            {actionError && (
              <p className="text-xs text-terracotta-text font-medium text-center bg-terracotta-bg p-2 rounded-md border border-terracotta-text/10">
                {actionError}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
