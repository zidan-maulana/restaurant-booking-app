# API Documentation

## Base URL

```
http://localhost:5000/api
```

---

## Authentication

### Register

**POST** `/auth/register`

Request Body:

```json
{
  "name": "User Name",
  "email": "user@email.com",
  "password": "password"
}
```

---

### Login

**POST** `/auth/login`

Request Body:

```json
{
  "email": "user@email.com",
  "password": "password"
}
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## Table Endpoints (Admin)

### Get All Tables

**GET** `/tables`

---

### Create Table

**POST** `/tables`

Headers:

```
Authorization: Bearer <token>
```

Request Body:

```json
{
  "table_number": "T01",
  "capacity": 4
}
```

---

### Update Table

**PUT** `/tables/:id`

---

### Delete Table

**DELETE** `/tables/:id`

---

## Booking Endpoints

### Create Booking

**POST** `/bookings`

Headers:

```
Authorization: Bearer <token>
```

Request Body:

```json
{
  "table_id": 1,
  "booking_date": "2026-05-03",
  "booking_time": "19:00:00",
  "guest_count": 2
}
```

---

### Get All Bookings (Admin)

**GET** `/bookings`

---

### Get My Bookings

**GET** `/bookings/my`

Headers:

```
Authorization: Bearer <token>
```

---

## Booking Status Management

### Approve Booking (Admin)

**PUT** `/bookings/:id/approve`

---

### Reject Booking (Admin)

**PUT** `/bookings/:id/reject`

---

### Cancel Booking (User)

**PUT** `/bookings/:id/cancel`

---

## Filtering Booking

### Filter by Status

```
GET /bookings?status=pending
```

---

### Filter by Date

```
GET /bookings?date=2026-05-03
```

---

### Combine Filter

```
GET /bookings?status=pending&date=2026-05-03
```

---

## Booking Status Values

| Status   | Description           |
| -------- | --------------------- |
| pending  | Waiting for approval  |
| approved | Approved by admin     |
| rejected | Rejected by admin     |
| canceled | Canceled by user      |
| expired  | Automatically expired |

---

## Auto Expire Mechanism

Booking dengan status `pending` akan otomatis berubah menjadi `expired` jika tidak diproses dalam waktu 30 menit.

---

## Error Response

Contoh response:

```json
{
  "message": "Terjadi kesalahan pada server"
}
```

---

## Testing

Disarankan menggunakan:

* Thunder Client
* Postman

---

## Catatan

* Endpoint tertentu membutuhkan autentikasi JWT
* Role admin diperlukan untuk approve dan reject booking
* Pastikan token valid saat melakukan request ke endpoint protected