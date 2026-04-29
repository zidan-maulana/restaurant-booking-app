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