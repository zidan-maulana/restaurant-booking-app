const db = require("../config/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  const { nama, email, password } = req.body;

  if (!nama || !email || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  // Check if email already exists
  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (checkErr, checkResults) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).json({ message: "Gagal register" });
    }

    if (checkResults.length > 0) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)";

    db.query(query, [nama, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Gagal register" });
      }

      res.json({
        message: "Register berhasil ✅",
        userId: result.insertId
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi" });
  }

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal login" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const user = results[0];
    // Debug Sementara
    // console.log("USER LOGIN:", user);

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      message: "Login berhasil ✅",
      token: token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role
      }
    });
  });
};