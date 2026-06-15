# Product Requirements Document (PRD)

## Project Name

Restaurant Booking System

## Project Overview

Restaurant Booking System adalah aplikasi web fullstack yang memungkinkan pelanggan melakukan reservasi meja restoran secara online dan memungkinkan admin mengelola meja serta memproses booking.

Project ini dibangun untuk memenuhi tugas mata kuliah Pemrograman Web dengan implementasi frontend, backend, database relasional, autentikasi JWT, serta version control menggunakan GitHub.

---

# Objectives

Menyediakan sistem reservasi restoran yang:

- Memungkinkan user melakukan booking meja secara online.
- Memungkinkan admin mengelola data meja.
- Memungkinkan admin menyetujui atau menolak booking.
- Menyediakan riwayat booking user.
- Menggunakan autentikasi berbasis JWT.
- Responsif untuk desktop dan mobile.

---

# User Roles

## User

Dapat:

- Register
- Login
- Logout
- Melihat daftar meja
- Membuat booking
- Melihat riwayat booking
- Membatalkan booking miliknya

## Admin

Dapat:

- Login
- Logout
- Melihat seluruh booking
- Approve booking
- Reject booking
- CRUD meja

---

# Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js

## Database

- MySQL

## Authentication

- JWT

## Version Control

- Git
- GitHub

---

# Database Entities

## Users

- id
- nama
- email
- password
- role
- created_at

## Tables

- id
- table_number
- capacity
- status
- created_at

## Bookings

- id
- user_id
- table_id
- booking_date
- booking_time
- guest_count
- status
- created_at

---

# Booking Status

- pending
- approved
- rejected
- cancelled
- expired

---

# Business Rules

## Booking Validation

User tidak dapat:

- Booking meja yang sudah digunakan pada tanggal dan jam yang sama.
- Booking melebihi kapasitas meja.

## Auto Expire

Booking dengan status pending akan berubah menjadi expired apabila tidak diproses admin selama 30 menit.

## Authorization

User hanya dapat melihat dan membatalkan booking miliknya sendiri.

Admin dapat melihat seluruh booking.

---

# Frontend Pages

## Public Pages

### Login

Fitur:

- Email
- Password
- Login

### Register

Fitur:

- Nama
- Email
- Password
- Register

---

## User Pages

### Dashboard

Menampilkan:

- Ringkasan akun

### Daftar Meja

Menampilkan:

- Nomor meja
- Kapasitas

### Buat Booking

Form:

- Pilih meja
- Tanggal
- Jam
- Jumlah tamu

### Riwayat Booking

Menampilkan:

- Semua booking milik user

### Cancel Booking

User dapat membatalkan booking miliknya.

---

## Admin Pages

### Dashboard Admin

Menampilkan:

- Total booking
- Pending booking
- Approved booking
- Rejected booking

### Kelola Meja

CRUD:

- Tambah meja
- Edit meja
- Hapus meja

### Kelola Booking

Menampilkan:

- Seluruh booking

Aksi:

- Approve
- Reject

Filter:

- Status
- Tanggal

---

# API Reference

Menggunakan endpoint yang telah didefinisikan pada file:

API_DOCS.md

---

# Responsive Design Requirements

Aplikasi harus:

- Mobile friendly
- Tablet friendly
- Desktop friendly

Minimal breakpoint:

- Mobile
- Tablet
- Desktop

---

# Project Structure

frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── hooks/
│ ├── layouts/
│ └── routes/

---

# Expected Outcome

Sistem reservasi restoran yang:

- Fullstack
- Terintegrasi frontend dan backend
- Memiliki autentikasi JWT
- Menggunakan database MySQL
- Memiliki dashboard admin dan user
- Responsif pada berbagai ukuran layar

---

# Documentation References

Dokumentasi sistem tersedia pada folder:

docs/

- activity-diagram.png
- class-diagram.png
- erd-diagram.png
- sequence-diagram.png
- usecase-diagram.png

Dokumentasi tambahan:

- API_DOCS.md
- ERD.md
- FLOW.md
- PROJECT_CONTEXT.md

Seluruh dokumentasi tersebut menjadi referensi utama dalam pengembangan frontend dan backend.

---