const db = require("../config/db");

// GET all bookings with optional filters
exports.getAllBookings = (req, res) => {
  const { date } = req.query;

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

  if (date) {
    query += " AND bookings.booking_date = ?";
    params.push(date);
  }

  query += " ORDER BY bookings.created_at DESC";

  db.query(query, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        data: null,
        message: "Gagal mengambil data booking admin",
      });
    }

    res.json({
      success: true,
      data: results,
      message: "Data bookings berhasil diambil ✅",
    });
  });
};

// Approve a booking (pending -> approved)
exports.approveBooking = (req, res) => {
  const { id } = req.params;

  const getQuery = "SELECT status FROM bookings WHERE id = ?";

  db.query(getQuery, [id], (getErr, results) => {
    if (getErr) {
      console.error(getErr);
      return res.status(500).json({
        success: false,
        data: null,
        message: "Gagal menyetujui booking",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Booking tidak ditemukan",
      });
    }

    if (results[0].status !== "pending") {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Hanya booking berstatus pending yang dapat disetujui",
      });
    }

    const query = "UPDATE bookings SET status = 'approved' WHERE id = ?";

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          data: null,
          message: "Gagal menyetujui booking",
        });
      }

      res.json({
        success: true,
        data: {},
        message: "Booking berhasil disetujui ✅",
      });
    });
  });
};

// Reject a booking (pending -> rejected)
exports.rejectBooking = (req, res) => {
  const { id } = req.params;

  const getQuery = "SELECT status FROM bookings WHERE id = ?";

  db.query(getQuery, [id], (getErr, results) => {
    if (getErr) {
      console.error(getErr);
      return res.status(500).json({
        success: false,
        data: null,
        message: "Gagal menolak booking",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Booking tidak ditemukan",
      });
    }

    if (results[0].status !== "pending") {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Hanya booking berstatus pending yang dapat ditolak",
      });
    }

    const query = "UPDATE bookings SET status = 'rejected' WHERE id = ?";

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          data: null,
          message: "Gagal menolak booking",
        });
      }

      res.json({
        success: true,
        data: {},
        message: "Booking berhasil ditolak ❌",
      });
    });
  });
};

// GET all tables
exports.getAllTables = (req, res) => {
  const query = "SELECT * FROM tables ORDER BY table_number ASC";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        data: null,
        message: "Gagal mengambil data meja",
      });
    }

    res.json({
      success: true,
      data: results,
      message: "Data meja berhasil diambil ✅",
    });
  });
};

// POST create table
exports.createTable = (req, res) => {
  const { table_number, capacity } = req.body;

  if (!table_number || !capacity) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Semua field wajib diisi",
    });
  }

  // Pre-query validation for duplicate table number
  const checkQuery = "SELECT * FROM tables WHERE table_number = ?";
  db.query(checkQuery, [table_number], (checkErr, checkResults) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).json({
        success: false,
        data: null,
        message: "Gagal mengecek nomor meja",
      });
    }

    if (checkResults.length > 0) {
      return res.status(409).json({
        success: false,
        data: null,
        message: "Nomor meja sudah digunakan",
      });
    }

    const query = "INSERT INTO tables (table_number, capacity) VALUES (?, ?)";

    db.query(query, [table_number, capacity], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          data: null,
          message: "Gagal menambahkan meja",
        });
      }

      res.status(201).json({
        success: true,
        data: {
          id: result.insertId,
          table_number,
          capacity: Number(capacity),
          status: "available",
        },
        message: "Meja berhasil ditambahkan ✅",
      });
    });
  });
};

// PUT update table
exports.updateTable = (req, res) => {
  const { id } = req.params;
  const { table_number, capacity } = req.body;

  if (!table_number || !capacity) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Semua field wajib diisi",
    });
  }

  // Pre-query validation for duplicate table number
  const checkQuery = "SELECT * FROM tables WHERE table_number = ? AND id != ?";
  db.query(checkQuery, [table_number, id], (checkErr, checkResults) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).json({
        success: false,
        data: null,
        message: "Gagal mengecek nomor meja",
      });
    }

    if (checkResults.length > 0) {
      return res.status(409).json({
        success: false,
        data: null,
        message: "Nomor meja sudah digunakan",
      });
    }

    // Pre-query validation for capacity reduction
    const checkActiveBookingQuery = `
      SELECT MAX(guest_count) AS max_guests FROM bookings 
      WHERE table_id = ? 
      AND status IN ('pending', 'approved')
    `;
    db.query(checkActiveBookingQuery, [id], (bookingErr, bookingResults) => {
      if (bookingErr) {
        console.error(bookingErr);
        return res.status(500).json({
          success: false,
          data: null,
          message: "Gagal mengecek reservasi aktif meja",
        });
      }

      const maxGuests = bookingResults[0].max_guests || 0;
      if (Number(capacity) < maxGuests) {
        return res.status(409).json({
          success: false,
          data: null,
          message: `Kapasitas meja tidak dapat dikurangi karena terdapat booking aktif dengan ${maxGuests} tamu`,
        });
      }

      const query = "UPDATE tables SET table_number = ?, capacity = ? WHERE id = ?";

      db.query(query, [table_number, capacity, id], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            data: null,
            message: "Gagal memperbarui meja",
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            success: false,
            data: null,
            message: "Meja tidak ditemukan",
          });
        }

        res.json({
          success: true,
          data: {
            id: Number(id),
            table_number,
            capacity: Number(capacity),
          },
          message: "Meja berhasil diperbarui ✅",
        });
      });
    });
  });
};

// DELETE table
exports.deleteTable = (req, res) => {
  const { id } = req.params;

  // Pre-query validation for bookings associated with table
  const checkBookingQuery = "SELECT * FROM bookings WHERE table_id = ? LIMIT 1";
  db.query(checkBookingQuery, [id], (bookingErr, bookingResults) => {
    if (bookingErr) {
      console.error(bookingErr);
      return res.status(500).json({
        success: false,
        data: null,
        message: "Gagal mengecek booking terkait meja",
      });
    }

    if (bookingResults.length > 0) {
      return res.status(409).json({
        success: false,
        data: null,
        message: "Meja tidak dapat dihapus karena memiliki booking terkait",
      });
    }

    const query = "DELETE FROM tables WHERE id = ?";

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          data: null,
          message: "Gagal menghapus meja",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          data: null,
          message: "Meja tidak ditemukan",
        });
      }

      res.json({
        success: true,
        data: { id: Number(id) },
        message: "Meja berhasil dihapus ✅",
      });
    });
  });
};
