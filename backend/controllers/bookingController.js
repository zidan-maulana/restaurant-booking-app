const db = require("../config/db");

// CREATE booking
exports.createBooking = (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      message: "User harus login terlebih dahulu"
    });
  }
  const userId = req.user.id;
  const { table_id, booking_date, booking_time, guest_count } = req.body;

  if (!table_id || !booking_date || !booking_time || !guest_count) {
    return res.status(400).json({
      message: "Semua field booking wajib diisi"
    });
  }

  const tableQuery = "SELECT * FROM tables WHERE id = ?";

  db.query(tableQuery, [table_id], (tableErr, tableResults) => {
    if (tableErr) {
      console.error(tableErr);
      return res.status(500).json({
        message: "Gagal mengecek data meja"
      });
    }

    if (tableResults.length === 0) {
      return res.status(404).json({
        message: "Meja tidak ditemukan"
      });
    }

    const selectedTable = tableResults[0];

    if (guest_count > selectedTable.capacity) {
      return res.status(400).json({
        message: `Jumlah tamu melebihi kapasitas meja. Kapasitas meja ini adalah ${selectedTable.capacity} orang`
      });
    }

    const checkQuery = `
      SELECT * FROM bookings 
      WHERE table_id = ? 
      AND booking_date = ? 
      AND booking_time = ?
      AND status IN ('pending', 'approved')
    `;

    db.query(
      checkQuery,
      [table_id, booking_date, booking_time],
      (checkErr, checkResults) => {
        if (checkErr) {
          console.error(checkErr);
          return res.status(500).json({
            message: "Gagal mengecek ketersediaan meja"
          });
        }

        if (checkResults.length > 0) {
          return res.status(409).json({
            message: "Meja sudah dibooking pada tanggal dan jam tersebut"
          });
        }

        const insertQuery = `
          INSERT INTO bookings 
          (user_id, table_id, booking_date, booking_time, guest_count, status)
          VALUES (?, ?, ?, ?, ?, 'pending')
        `;

        db.query(
          insertQuery,
          [userId, table_id, booking_date, booking_time, guest_count],
          (insertErr, result) => {
            if (insertErr) {
              console.error(insertErr);
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
      }
    );
  });
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
  const { status, date } = req.query;

  let query = `
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
    WHERE 1 = 1
  `;

  const params = [];

  if (status) {
    query += " AND bookings.status = ?";
    params.push(status);
  }

  if (date) {
    query += " AND bookings.booking_date = ?";
    params.push(date);
  }

  query += " ORDER BY bookings.created_at DESC";

  db.query(query, params, (err, results) => {
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

// Cancel booking (user hanya bisa cancel booking miliknya sendiri)
exports.cancelBooking = (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.id;

  // cek apakah booking milik user
  const checkQuery = "SELECT * FROM bookings WHERE id = ? AND user_id = ?";

  db.query(checkQuery, [bookingId, userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal cancel booking" });
    }

    if (results.length === 0) {
      return res.status(403).json({
        message: "Anda tidak memiliki akses ke booking ini"
      });
    }

    // update status jadi cancelled
    const updateQuery = "UPDATE bookings SET status = 'cancelled' WHERE id = ?";

    db.query(updateQuery, [bookingId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Gagal cancel booking" });
      }

      res.json({
        message: "Booking berhasil dibatalkan ❌"
      });
    });
  });
};

// APPROVE booking (admin only)
exports.approveBooking = (req, res) => {
  const { id } = req.params;

  const query = `
    UPDATE bookings
    SET status = 'approved'
    WHERE id = ?
  `;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Gagal approve booking"
      });
    }

    res.json({
      message: "Booking berhasil di-approve ✅"
    });
  });
};

// REJECT booking (admin only)
exports.rejectBooking = (req, res) => {
  const { id } = req.params;

  const query = `
    UPDATE bookings
    SET status = 'rejected'
    WHERE id = ? AND status = 'pending'
  `;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Gagal reject booking"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Booking tidak ditemukan atau status bukan pending"
      });
    }

    res.json({
      message: "Booking berhasil ditolak"
    });
  });
};