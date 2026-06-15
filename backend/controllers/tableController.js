const db = require("../config/db");

// GET semua meja
exports.getTables = (req, res) => {
  const { booking_date, booking_time } = req.query;

  if (booking_date && booking_time) {
    const query = `
      SELECT 
        t.id, 
        t.table_number, 
        t.capacity,
        CASE WHEN b.id IS NOT NULL THEN 1 ELSE 0 END AS isBooked
      FROM tables t
      LEFT JOIN bookings b ON t.id = b.table_id 
        AND b.booking_date = ? 
        AND b.booking_time = ? 
        AND b.status IN ('pending', 'approved')
    `;
    db.query(query, [booking_date, booking_time], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Gagal mengambil data meja"
        });
      }

      const formatted = results.map(row => ({
        id: row.id,
        table_number: row.table_number,
        capacity: row.capacity,
        isBooked: !!row.isBooked
      }));
      res.json(formatted);
    });
  } else {
    const query = "SELECT * FROM tables";

    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Gagal mengambil data meja"
        });
      }

      res.json(results);
    });
  }
};

// GET semua meja
exports.createTable = (req, res) => {
  const { table_number, capacity } = req.body;

  if (!table_number || !capacity) {
    return res.status(400).json({
      message: "Semua field wajib diisi"
    });
  }

  const checkQuery = "SELECT * FROM tables WHERE table_number = ?";
  db.query(checkQuery, [table_number], (checkErr, checkResults) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).json({
        message: "Gagal mengecek nomor meja"
      });
    }

    if (checkResults.length > 0) {
      return res.status(409).json({
        message: "Nomor meja sudah digunakan"
      });
    }

    const query = "INSERT INTO tables (table_number, capacity) VALUES (?, ?)";

    db.query(query, [table_number, capacity], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Gagal menambahkan meja"
        });
      }

      res.status(201).json({
        message: "Meja berhasil ditambahkan ✅",
        tableId: result.insertId
      });
    });
  });
};

// Update meja (admin only)
exports.updateTable = (req, res) => {
  const { id } = req.params;
  const { table_number, capacity } = req.body;

  if (!table_number || !capacity) {
    return res.status(400).json({
      message: "Semua field wajib diisi"
    });
  }

  const checkQuery = "SELECT * FROM tables WHERE table_number = ? AND id != ?";
  db.query(checkQuery, [table_number, id], (checkErr, checkResults) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).json({
        message: "Gagal mengecek nomor meja"
      });
    }

    if (checkResults.length > 0) {
      return res.status(409).json({
        message: "Nomor meja sudah digunakan"
      });
    }

    // Capacity check
    const checkActiveBookingQuery = `
      SELECT MAX(guest_count) AS max_guests FROM bookings 
      WHERE table_id = ? 
      AND status IN ('pending', 'approved')
    `;
    db.query(checkActiveBookingQuery, [id], (bookingErr, bookingResults) => {
      if (bookingErr) {
        console.error(bookingErr);
        return res.status(500).json({
          message: "Gagal mengecek reservasi aktif meja"
        });
      }

      const maxGuests = bookingResults[0].max_guests || 0;
      if (Number(capacity) < maxGuests) {
        return res.status(409).json({
          message: `Kapasitas meja tidak dapat dikurangi karena terdapat booking aktif dengan ${maxGuests} tamu`
        });
      }

      const query = `
        UPDATE tables 
        SET table_number = ?, capacity = ?
        WHERE id = ?
      `;

      db.query(query, [table_number, capacity, id], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "Gagal update meja"
          });
        }

        res.json({
          message: "Meja berhasil diupdate ✅"
        });
      });
    });
  });
};

exports.deleteTable = (req, res) => {
  const { id } = req.params;

  // Pre-query validation for bookings associated with table
  const checkBookingQuery = "SELECT * FROM bookings WHERE table_id = ? LIMIT 1";
  db.query(checkBookingQuery, [id], (bookingErr, bookingResults) => {
    if (bookingErr) {
      console.error(bookingErr);
      return res.status(500).json({
        message: "Gagal mengecek booking terkait meja"
      });
    }

    if (bookingResults.length > 0) {
      return res.status(409).json({
        message: "Meja tidak dapat dihapus karena memiliki booking terkait"
      });
    }

    const query = "DELETE FROM tables WHERE id = ?";

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Gagal menghapus meja"
        });
      }

      res.json({
        message: "Meja berhasil dihapus ✅"
      });
    });
  });
};