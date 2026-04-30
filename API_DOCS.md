# API Documentation - Restaurant Booking App

## Base URL

http://localhost:5000

---

## Authentication

Beberapa endpoint membutuhkan token JWT.

Format header:

Authorization: Bearer JWT_TOKEN

---

## AUTH

### Register User

POST /api/auth/register

Body:

{
  "nama": "User Test",
  "email": "usertest@email.com",
  "password": "123456"
}

Response:

{
  "message": "Register berhasil",
  "userId": 1
}

---

### Login User / Admin

POST /api/auth/login

Body:

{
  "email": "usertest@email.com",
  "password": "123456"
}

Response:

{
  "message": "Login berhasil",
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "nama": "User Test",
    "email": "usertest@email.com",
    "role": "user"
  }
}

---

## TABLES

### Get All Tables

GET /api/tables

Auth: Tidak wajib login

Response:

[
  {
    "id": 1,
    "table_number": "T01",
    "capacity": 2,
    "status": "available",
    "created_at": "2026-04-30T00:00:00.000Z"
  }
]

---

### Create Table (Admin Only)

POST /api/tables

Headers:
Authorization: Bearer JWT_TOKEN_ADMIN

Body:

{
  "table_number": "T10",
  "capacity": 6
}

Response:

{
  "message": "Meja berhasil ditambahkan",
  "tableId": 6
}

---

### Update Table (Admin Only)

PUT /api/tables/:id

Contoh:
PUT /api/tables/6

Body:

{
  "table_number": "T10",
  "capacity": 8
}

Response:

{
  "message": "Meja berhasil diupdate"
}

---

### Delete Table (Admin Only)

DELETE /api/tables/:id

Contoh:
DELETE /api/tables/6

Response:

{
  "message": "Meja berhasil dihapus"
}

---

## BOOKINGS

### Create Booking

POST /api/bookings

Headers:
Authorization: Bearer JWT_TOKEN

Body:

{
  "table_id": 1,
  "booking_date": "2026-05-03",
  "booking_time": "19:00:00",
  "guest_count": 2
}

Response:

{
  "message": "Booking berhasil dibuat",
  "bookingId": 1
}

Kemungkinan error:

{
  "message": "Meja sudah dibooking pada tanggal dan jam tersebut"
}

{
  "message": "Jumlah tamu melebihi kapasitas meja"
}

---

### Get My Bookings

GET /api/bookings/my

Headers:
Authorization: Bearer JWT_TOKEN

Response:

[
  {
    "id": 1,
    "booking_date": "2026-05-03T00:00:00.000Z",
    "booking_time": "19:00:00",
    "guest_count": 2,
    "status": "pending",
    "created_at": "2026-04-30T00:00:00.000Z",
    "table_number": "T01",
    "capacity": 2
  }
]

---

### Get All Bookings (Admin Only)

GET /api/bookings

Headers:
Authorization: Bearer JWT_TOKEN_ADMIN

Optional query:

/api/bookings?status=pending  
/api/bookings?date=2026-05-03  
/api/bookings?status=pending&date=2026-05-03  

---

### Approve Booking (Admin Only)

PUT /api/bookings/:id/approve

Contoh:
PUT /api/bookings/10/approve

Response:

{
  "message": "Booking berhasil di-approve"
}

---

### Reject Booking (Admin Only)

PUT /api/bookings/:id/reject

Contoh:
PUT /api/bookings/11/reject

Response:

{
  "message": "Booking berhasil ditolak"
}

---

### Cancel Booking (User)

PUT /api/bookings/:id/cancel

Headers:
Authorization: Bearer JWT_TOKEN

Contoh:
PUT /api/bookings/10/cancel

Response:

{
  "message": "Booking berhasil dibatalkan"
}

Error:

{
  "message": "Anda tidak memiliki akses ke booking ini"
}

---

## ROLE ACCESS SUMMARY

| Feature | User | Admin |
|--------|------|------|
| Register | Yes | Yes |
| Login | Yes | Yes |
| Get tables | Yes | Yes |
| Create booking | Yes | Yes |
| Get my bookings | Yes | Yes |
| Cancel own booking | Yes | Yes |
| Get all bookings | No | Yes |
| Approve booking | No | Yes |
| Reject booking | No | Yes |
| Create table | No | Yes |
| Update table | No | Yes |
| Delete table | No | Yes |

---

## Booking Status

pending = booking baru dibuat  
approved = disetujui admin  
rejected = ditolak admin  
cancelled = dibatalkan user  
expired = otomatis oleh sistem  

---

## AUTO EXPIRE

Booking otomatis menjadi expired jika:
- status = pending
- lebih dari 30 menit