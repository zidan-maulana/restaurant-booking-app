const db = require("../config/db");

// GET semua meja
exports.getTables = (req, res) => {
  const query = "SELECT * FROM tables";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil data meja" });
    }

    res.json(results);
  });
};