const db = require("../config/db");

// GET semua meja
exports.getTables = (req, res) => {
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
};

// GET semua meja
exports.createTable = (req, res) => {
  const { table_number, capacity } = req.body;

  if (!table_number || !capacity) {
    return res.status(400).json({
      message: "Semua field wajib diisi"
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
};

// Update meja (admin only)
exports.updateTable = (req, res) => {
  const { id } = req.params;
  const { table_number, capacity } = req.body;

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
};

exports.deleteTable = (req, res) => {
  const { id } = req.params;

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
};