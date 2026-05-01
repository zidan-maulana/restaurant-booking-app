# Restaurant Booking System (Backend)

## Deskripsi

Restaurant Booking System adalah backend API yang digunakan untuk mengelola reservasi meja pada restoran. Sistem ini dibangun menggunakan Node.js, Express, dan MySQL, serta mendukung autentikasi berbasis JWT.

Project ini dikembangkan sebagai bagian dari tugas kuliah dan dirancang dengan pendekatan RESTful API.

---

## Fitur Utama

### Authentication

* Registrasi pengguna
* Login pengguna menggunakan JWT
* Role-based access (admin dan user)

### Table Management (Admin)

* Menambahkan data meja
* Memperbarui data meja
* Menghapus data meja
* Melihat daftar meja

### Booking System

* Membuat reservasi meja
* Validasi kapasitas meja
* Mencegah double booking

### Booking Management

* Approve booking oleh admin
* Reject booking oleh admin
* Cancel booking oleh user
* Auto expire booking setelah 30 menit

### Filtering

* Filter berdasarkan status booking
* Filter berdasarkan tanggal booking
* Kombinasi filter

---

## Teknologi yang Digunakan

* Node.js
* Express.js
* MySQL
* JSON Web Token (JWT)
* Nodemon

---

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/zidan-maulana/restaurant-booking-app.git
cd restaurant-booking-app/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env` di dalam folder backend:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=restaurant_booking
JWT_SECRET=your_secret_key
```

### 4. Menjalankan Server

```bash
npm run dev
```

Server akan berjalan di:

```
http://localhost:5000
```

---

## Base URL

```
http://localhost:5000/api
```

---

## Autentikasi

Untuk endpoint yang membutuhkan autentikasi, gunakan header berikut:

```
Authorization: Bearer <token>
```

---

## Struktur Proyek

```
backend/
├── config/
├── controllers/
├── middleware/
├── routes/
├── app.js
├── package.json
```

---

## Pengujian API

API dapat diuji menggunakan:

* Thunder Client (VS Code)
* Postman

---

## Catatan

* Endpoint tertentu hanya dapat diakses oleh admin
* Sistem menggunakan validasi untuk mencegah konflik booking
* Booking otomatis expired setelah 30 menit jika belum disetujui

---

## Author

Zidan Maulana

---

## Lisensi

Project ini dibuat untuk keperluan pembelajaran dan tidak digunakan untuk produksi.
