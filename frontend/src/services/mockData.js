// ============================================================
// Mock Data Service
// Simulates backend database for tables and bookings.
// Structure mirrors the real backend ERD (tables, bookings).
// ============================================================

// --- MOCK TABLES ---
let tables = [
  { id: 1, table_number: 'T01', capacity: 2, status: 'available' },
  { id: 2, table_number: 'T02', capacity: 2, status: 'available' },
  { id: 3, table_number: 'T03', capacity: 4, status: 'available' },
  { id: 4, table_number: 'T04', capacity: 4, status: 'available' },
  { id: 5, table_number: 'T05', capacity: 6, status: 'available' },
  { id: 6, table_number: 'T06', capacity: 6, status: 'available' },
  { id: 7, table_number: 'T07', capacity: 8, status: 'available' },
  { id: 8, table_number: 'T08', capacity: 4, status: 'available' },
  { id: 9, table_number: 'T09', capacity: 2, status: 'available' },
  { id: 10, table_number: 'T10', capacity: 10, status: 'available' },
];

// --- MOCK BOOKINGS ---
let bookings = [
  {
    id: 1,
    user_id: 2,
    user_name: 'Budi Santoso',
    user_email: 'user@atma.com',
    table_id: 3,
    table_number: 'T03',
    capacity: 4,
    booking_date: '2026-06-10',
    booking_time: '19:00',
    guest_count: 3,
    status: 'approved',
    created_at: '2026-06-05T10:30:00Z',
  },
  {
    id: 2,
    user_id: 2,
    user_name: 'Budi Santoso',
    user_email: 'user@atma.com',
    table_id: 5,
    table_number: 'T05',
    capacity: 6,
    booking_date: '2026-06-12',
    booking_time: '12:00',
    guest_count: 5,
    status: 'pending',
    created_at: '2026-06-06T08:15:00Z',
  },
  {
    id: 3,
    user_id: 2,
    user_name: 'Budi Santoso',
    user_email: 'user@atma.com',
    table_id: 1,
    table_number: 'T01',
    capacity: 2,
    booking_date: '2026-06-01',
    booking_time: '18:30',
    guest_count: 2,
    status: 'cancelled',
    created_at: '2026-05-28T14:00:00Z',
  },
];

let nextBookingId = 4;
let nextTableId = 11;

// ============================================================
// TABLE SERVICE (mirrors GET /api/tables)
// ============================================================

export function getTables() {
  return [...tables];
}

export function getTableById(id) {
  return tables.find((t) => t.id === id) || null;
}

export function createTable(table_number, capacity) {
  const newTable = {
    id: nextTableId++,
    table_number,
    capacity: Number(capacity),
    status: 'available',
  };
  tables = [...tables, newTable];
  return newTable;
}

export function updateTable(id, table_number, capacity) {
  tables = tables.map((t) =>
    t.id === id ? { ...t, table_number, capacity: Number(capacity) } : t
  );
  return getTableById(id);
}

export function deleteTable(id) {
  tables = tables.filter((t) => t.id !== id);
}

// ============================================================
// BOOKING SERVICE (mirrors POST /api/bookings, etc.)
// ============================================================

/**
 * Get bookings filtered by user_id (customer view)
 */
export function getMyBookings(userId) {
  return bookings
    .filter((b) => b.user_id === userId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

/**
 * Get all bookings (admin view) with optional filters
 */
export function getAllBookings({ status, date } = {}) {
  let filtered = [...bookings];
  if (status) filtered = filtered.filter((b) => b.status === status);
  if (date) filtered = filtered.filter((b) => b.booking_date === date);
  return filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

/**
 * Create a new booking (customer action).
 * Validates capacity and checks for conflicts.
 */
export function createBooking({ userId, userName, userEmail, tableId, bookingDate, bookingTime, guestCount }) {
  const table = getTableById(tableId);
  if (!table) throw new Error('Meja tidak ditemukan.');

  if (guestCount > table.capacity) {
    throw new Error(`Jumlah tamu (${guestCount}) melebihi kapasitas meja ${table.table_number} (${table.capacity} orang).`);
  }

  // Check for booking conflict (same table, date, time with active status)
  const conflict = bookings.find(
    (b) =>
      b.table_id === tableId &&
      b.booking_date === bookingDate &&
      b.booking_time === bookingTime &&
      ['pending', 'approved'].includes(b.status)
  );
  if (conflict) {
    throw new Error(`Meja ${table.table_number} sudah dipesan pada ${bookingDate} pukul ${bookingTime}.`);
  }

  const newBooking = {
    id: nextBookingId++,
    user_id: userId,
    user_name: userName,
    user_email: userEmail,
    table_id: tableId,
    table_number: table.table_number,
    capacity: table.capacity,
    booking_date: bookingDate,
    booking_time: bookingTime,
    guest_count: guestCount,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  bookings = [...bookings, newBooking];
  return newBooking;
}

/**
 * Cancel a booking (customer action)
 */
export function cancelBooking(bookingId, userId) {
  const booking = bookings.find((b) => b.id === bookingId && b.user_id === userId);
  if (!booking) throw new Error('Reservasi tidak ditemukan atau bukan milik Anda.');
  if (!['pending', 'approved'].includes(booking.status)) {
    throw new Error('Reservasi ini tidak dapat dibatalkan.');
  }
  bookings = bookings.map((b) =>
    b.id === bookingId ? { ...b, status: 'cancelled' } : b
  );
}

/**
 * Approve a booking (admin action)
 */
export function approveBooking(bookingId) {
  bookings = bookings.map((b) =>
    b.id === bookingId ? { ...b, status: 'approved' } : b
  );
}

/**
 * Reject a booking (admin action)
 */
export function rejectBooking(bookingId) {
  bookings = bookings.map((b) =>
    b.id === bookingId && b.status === 'pending' ? { ...b, status: 'rejected' } : b
  );
}

/**
 * Check which tables are available for a given date & time
 */
export function getAvailableTables(bookingDate, bookingTime) {
  const bookedTableIds = bookings
    .filter(
      (b) =>
        b.booking_date === bookingDate &&
        b.booking_time === bookingTime &&
        ['pending', 'approved'].includes(b.status)
    )
    .map((b) => b.table_id);

  return tables.map((t) => ({
    ...t,
    isBooked: bookedTableIds.includes(t.id),
  }));
}
