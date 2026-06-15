import api from './api';

/**
 * Fetch available tables for a specific date and time.
 * Standardizes time from HH:MM to HH:MM:00 for backend database compatibility.
 */
export async function getAvailableTables(bookingDate, bookingTime) {
  if (!bookingDate || !bookingTime) return [];
  const apiTime = bookingTime.length === 5 ? `${bookingTime}:00` : bookingTime;
  const response = await api.get('/tables', {
    params: {
      booking_date: bookingDate,
      booking_time: apiTime,
    },
  });
  return response.data;
}

/**
 * Creates a new booking reservation.
 * Standardizes time to HH:MM:00 for backend submission.
 */
export async function createBooking({ tableId, bookingDate, bookingTime, guestCount, tableNumber }) {
  const apiTime = bookingTime.length === 5 ? `${bookingTime}:00` : bookingTime;
  const response = await api.post('/bookings', {
    table_id: tableId,
    booking_date: bookingDate,
    booking_time: apiTime,
    guest_count: guestCount,
  });

  return {
    id: response.data.bookingId,
    booking_date: bookingDate,
    booking_time: bookingTime, // HH:MM kept for frontend display consistency
    table_number: tableNumber,
    guest_count: guestCount,
    status: 'pending',
  };
}

/**
 * Fetches the booking history of the authenticated customer.
 * Normalizes date (YYYY-MM-DDT... -> YYYY-MM-DD) and time (HH:MM:SS -> HH:MM)
 * at the service level.
 */
export async function getMyBookings() {
  const response = await api.get('/bookings/my');
  return response.data.map((b) => ({
    ...b,
    booking_date: b.booking_date ? b.booking_date.split('T')[0] : '',
    booking_time: b.booking_time ? b.booking_time.slice(0, 5) : '',
  }));
}

/**
 * Cancels an existing booking.
 */
export async function cancelBooking(bookingId) {
  const response = await api.put(`/bookings/${bookingId}/cancel`);
  return response.data;
}
