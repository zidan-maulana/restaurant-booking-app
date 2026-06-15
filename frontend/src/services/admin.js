import api from './api';

/**
 * Fetch all bookings (admin only).
 * Filters by status and date if provided.
 * Standardizes date and time format in response.
 */
export async function adminGetBookings({ status, date } = {}) {
  const params = {};
  if (status) params.status = status;
  if (date) params.date = date;

  const response = await api.get('/admin/bookings', { params });
  const result = response.data;
  if (!result.success) throw new Error(result.message);

  return result.data.map((b) => ({
    ...b,
    booking_date: b.booking_date ? b.booking_date.split('T')[0] : '',
    booking_time: b.booking_time ? b.booking_time.slice(0, 5) : '',
  }));
}

/**
 * Approve a pending booking reservation.
 */
export async function adminApproveBooking(id) {
  const response = await api.put(`/admin/bookings/${id}/approve`);
  const result = response.data;
  if (!result.success) throw new Error(result.message);
  return result;
}

/**
 * Reject a pending booking reservation.
 */
export async function adminRejectBooking(id) {
  const response = await api.put(`/admin/bookings/${id}/reject`);
  const result = response.data;
  if (!result.success) throw new Error(result.message);
  return result;
}

/**
 * Fetch all restaurant tables.
 */
export async function adminGetTables() {
  const response = await api.get('/admin/tables');
  const result = response.data;
  if (!result.success) throw new Error(result.message);
  return result.data;
}

/**
 * Add a new table.
 */
export async function adminCreateTable({ table_number, capacity }) {
  const response = await api.post('/admin/tables', {
    table_number,
    capacity: Number(capacity),
  });
  const result = response.data;
  if (!result.success) throw new Error(result.message);
  return result.data;
}

/**
 * Update an existing table details.
 */
export async function adminUpdateTable(id, { table_number, capacity }) {
  const response = await api.put(`/admin/tables/${id}`, {
    table_number,
    capacity: Number(capacity),
  });
  const result = response.data;
  if (!result.success) throw new Error(result.message);
  return result.data;
}

/**
 * Delete a table.
 */
export async function adminDeleteTable(id) {
  const response = await api.delete(`/admin/tables/${id}`);
  const result = response.data;
  if (!result.success) throw new Error(result.message);
  return result.data;
}

export {
  adminGetTables as getTables,
  adminCreateTable as createTable,
  adminUpdateTable as updateTable,
  adminDeleteTable as deleteTable
};
