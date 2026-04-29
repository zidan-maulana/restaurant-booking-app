const db = require("../config/db");

// CREATE booking
exports.createBooking = (req, res) => {
  const userId = req.user.id;
  const { table_id, booking_date, booking_time, guest_count } = req.body;

  if (!table_id || !booking_date || !booking_time || !guest_count) {
    return res.status(400).json({
      message: "Semua field booking wajib diisi"
    });
  }

  const query = `
    INSERT INTO bookings 
    (user_id, table_id, booking_date, booking_time, guest_count)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [userId, table_id, booking_date, booking_time, guest_count],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Gagal membuat booking"
        });
      }

      res.status(201).json({
        message: "Booking berhasil dibuat ✅",
        bookingId: result.insertId
      });
    }
  );
};

// GET booking milik user yang sedang login
exports.getMyBookings = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT 
      bookings.id,
      bookings.booking_date,
      bookings.booking_time,
      bookings.guest_count,
      bookings.status,
      bookings.created_at,
      tables.table_number,
      tables.capacity
    FROM bookings
    JOIN tables ON bookings.table_id = tables.id
    WHERE bookings.user_id = ?
    ORDER BY bookings.created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Gagal mengambil data booking"
      });
    }

    res.json(results);
  });
};

// GET semua booking untuk admin
exports.getAllBookings = (req, res) => {
  const query = `
    SELECT 
      bookings.id,
      bookings.booking_date,
      bookings.booking_time,
      bookings.guest_count,
      bookings.status,
      bookings.created_at,
      users.nama AS user_name,
      users.email AS user_email,
      tables.table_number,
      tables.capacity
    FROM bookings
    JOIN users ON bookings.user_id = users.id
    JOIN tables ON bookings.table_id = tables.id
    ORDER BY bookings.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Gagal mengambil semua data booking"
      });
    }

    res.json(results);
  });
};

// UPDATE status booking
exports.updateBookingStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      message: "Status wajib diisi"
    });
  }

  const allowedStatus = ["pending", "approved", "rejected", "cancelled"];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      message: "Status tidak valid"
    });
  }

  const query = "UPDATE bookings SET status = ? WHERE id = ?";

  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Gagal mengubah status booking"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Booking tidak ditemukan"
      });
    }

    res.json({
      message: "Status booking berhasil diubah ✅"
    });
  });
};