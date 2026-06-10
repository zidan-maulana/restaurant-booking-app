# UI/UX Specification - Restaurant Booking System

Dokumen ini mendefinisikan panduan desain (*Design System*) dan rencana antarmuka pengguna (*UI Plan*) untuk frontend **Restaurant Booking System**. Konsep visual ini terinspirasi dari gaya desain **"Dear Hearts / vintage elegant restaurant-bar"** yang menyajikan nuansa hangat (*warm*), klasik-modern, manusiawi (*human touch*), dan premium.

---

## 1. Design Direction
Visual direction mengutamakan estetika editorial layaknya menu cetak restoran mewah atau majalah kuliner klasik. 
*   **Warm & Elegant:** Menghindari warna putih salju/dingin (#FFFFFF) dan hitam legam (#000000). Semua warna memiliki tone hangat (*warm undertone*).
*   **Tactile & Human:** Menggunakan garis-garis tipis (*fine borders*), layout asimetris yang seimbang, dan ruang kosong (*whitespace*) yang lapang untuk memberi kesan premium dan bernafas.
*   **Editorial Typography:** Lockup tulisan klasik menggabungkan huruf Serif bersayap anggun dengan huruf Sans-serif modern yang bersih.

---

## 2. Color Palette (Warm & Premium)
Palet warna diatur menggunakan variabel CSS/Tailwind v4 dengan nilai HSL hangat:

| Nama Warna | Kode Hex | Penggunaan Utama |
| :--- | :--- | :--- |
| **Warm Cream (Base)** | `#FDFBF7` (atau `#F6F3EC` untuk kontras) | Latar belakang halaman utama (*light mode*). Sangat lembut di mata. |
| **Deep Bitter Chocolate** | `#2C2421` | Warna teks utama, heading, tombol solid, dan latar belakang *dark mode*. |
| **Gold / Brass Accent** | `#C5A880` (Muted Gold) / `#9C7C38` (Antique Gold) | Aksen hover, tautan aktif, garis dekoratif, bintang rating, dan *highlight*. |
| **Soft Sage Green (Success)**| `#E2EDE2` (Latar) / `#4A6B52` (Teks) | Badge status `approved` atau sukses. |
| **Warm Terracotta (Danger)** | `#F5E8E4` (Latar) / `#A84A3B` (Teks) | Badge status `rejected` / `expired`, pesan error, tombol delete. |
| **Warm Amber (Pending)** | `#FBF0E3` (Latar) / `#A36A38` (Teks) | Badge status `pending`, peringatan/alert. |
| **Muted Sepia (Cancelled)** | `#EFECE6` (Latar) / `#7A7067` (Teks) | Badge status `cancelled` / dinonaktifkan. |

---

## 3. Typography Recommendation
Menggunakan Google Fonts yang diimpor ke dalam proyek:

1.  **Heading (Serif):** *Playfair Display* atau *Cormorant Garamond*
    *   *Karakteristik:* Anggun, memiliki kontras garis tebal-tipis yang tajam, sangat cocok untuk judul utama, nomor meja besar, dan kutipan menu.
    *   *Penggunaan:* `font-serif` dengan tracking/letter-spacing normal atau sedikit rapat untuk judul besar.
2.  **Body Text & UI Elements (Sans-serif):** *Instrument Sans* atau *Inter*
    *   *Karakteristik:* Bersih, modern, memiliki keterbacaan tinggi pada ukuran kecil (khususnya untuk tabel data, form input, dan label dashboard).
    *   *Penggunaan:* `font-sans` dengan tracking normal.
3.  **Accent Text (Sans-serif Uppercase):** *Outfit* atau *Inter* (Uppercase + Tracking Luas)
    *   *Penggunaan:* `text-xs uppercase tracking-[0.15em] font-medium` untuk sub-heading kecil, label tombol, dan menu navigasi.

---

## 4. Layout Style
*   **Spacious (Lapang):** Memberikan margin dan padding yang longgar (`py-16` ke atas untuk section, `gap-8` untuk grid).
*   **Classic Frames & Borders:** Menggunakan border tipis (`border-[0.5px] border-chocolate/10`) sebagai pengganti *box-shadow* modern.
*   **Asymmetrical Balance:** Menempatkan teks penjelasan di satu sisi dan gambar atau daftar meja dengan proporsi lebar yang berbeda untuk menghindari kesan template kaku.
*   **Smooth Micro-interactions:** Efek hover pada tombol berupa transisi warna yang lambat (`duration-500 ease-in-out`) atau sedikit pergeseran garis bawah (*underline slide*).

---

## 5. Component Style (Tailwind CSS Guide)

*   **Buttons:**
    *   *Primary (Solid):* Latar `bg-[#2C2421]` (Chocolate), teks `text-[#FDFBF7]` (Cream), tanpa border, sudut tajam (`rounded-none` atau `rounded-sm`), transisi hover menjadi `bg-[#9C7C38]` (Gold).
    *   *Secondary (Outline):* Border tipis `border-[#2C2421]`, latar transparan, teks `text-[#2C2421]`, hover berubah menjadi latar `bg-[#2C2421]` dan teks `text-[#FDFBF7]`.
*   **Form Inputs:**
    *   Menggunakan gaya minimalis editorial: Border hanya di bagian bawah (`border-b border-[#2C2421]/20 focus:border-[#9C7C38] focus:outline-none`), latar belakang transparan.
    *   Label diletakkan di atas input dengan gaya uppercase kecil (`text-xs uppercase tracking-wider text-[#2C2421]/60`).
*   **Cards (Table Grid / Booking List):**
    *   Latar belakang `bg-[#FAF8F5]` (cream agak gelap), border sangat tipis `border border-[#2C2421]/10`, sudut kotak tajam, padding luas. Menghindari bayangan tebal (`shadow-none` atau `shadow-[2px_2px_0px_rgba(44,36,33,0.05)]`).
*   **Status Badges:**
    *   Kotak pipih dengan padding kecil (`px-2.5 py-0.5`), sudut bulat tipis (`rounded-sm`), huruf kapital kecil dengan warna kontras rendah yang elegan (lihat palet warna di atas).

---

## 6. Page-by-Page UI Plan

### A. Landing Page (Home)
*   **Header/Hero Section:**
    *   Logo restoran bergaya serif klasik di tengah atas, diapit menu navigasi kecil (`Home`, `Book a Table`, `My Bookings`, `Login`).
    *   Judul besar: *"A Space Gathered Around the Table"* (Serif besar, italic tipis).
    *   Sub-judul minimalis dan satu tombol utama yang elegan: `RESERVE A TABLE`.
    *   Gambar estetis suasana restoran bergaya vintage (menggunakan *warm-filtered photography*).
*   **About / The Experience Section:**
    *   Layout dua kolom: Kutipan filosofi restoran dengan huruf besar di sisi kiri, dan foto detail meja makan di sisi kanan.
*   **Footer:**
    *   Alamat, jam buka, dan tautan sosial media dengan ikon monokromatik.



### B. Login Page
*   **Layout:**
    *   Membagi layar menjadi dua: Sisi kiri menampilkan ilustrasi/foto restoran bernuansa sepia/hangat, sisi kanan formulir login minimalis berlatar belakang Warm Cream.
*   **UI Form:**
    *   Judul: *"Welcome Back"* (Serif).
    *   Input Email & Password dengan garis bawah tipis.
    *   Tombol masuk berwarna Bitter Chocolate solid dengan efek hover transisi emas.
    *   Tautan pendaftaran kecil: "Don't have an account? Sign up".

### C. Register Page
*   **Layout:**
    *   Senada dengan Login Page untuk konsistensi visual.
*   **UI Form:**
    *   Input untuk Nama Lengkap, Email, dan Password.
    *   Pesan panduan minimalis di bawah kolom input jika diperlukan.
    *   Tombol "Create Account" yang berukuran lebar penuh.

### D. Customer Dashboard (Table Booking Page)
*   **Header Halaman:**
    *   Judul: *"Reserve Your Table"* (Serif). Deskripsi singkat mengenai aturan reservasi (contoh: batas waktu konfirmasi 30 menit).
*   **Interactive Booking Panel:**
    *   **Langkah 1 (Pilih Tanggal & Waktu):** Input tanggal (*date picker* bergaya retro/klasik) dan dropdown pilihan jam (`12:00`, `18:00`, `19:00`, dll) diletakkan berdampingan secara horizontal.
    *   **Langkah 2 (Pilih Meja):**
        *   Tampilan grid visual meja restoran. Setiap meja digambarkan sebagai kartu elegan dengan nomor meja berhurif Serif tebal (misal: **T01**) dan kapasitasnya (misal: "Up to 4 guests").
        *   Jika meja terpilih, kartu akan memiliki border emas yang menonjol namun halus.
        *   *Real-time validation:* Jika kapasitas tamu yang diinput melebihi kapasitas meja terpilih, muncul peringatan estetis berwarna Terracotta di bagian bawah.
    *   **Langkah 3 (Submit):** Tombol Bitter Chocolate bertuliskan *"Request Reservation"*.

### E. My Bookings Page (Riwayat Pemesanan Pelanggan)
*   **Layout:**
    *   Layout berorientasi list (daftar baris) yang bersih layaknya daftar struk belanja atau menu koran klasik.
*   **UI Elements:**
    *   Setiap reservasi ditampilkan dalam satu baris panel horizontal yang memuat: Tanggal & Waktu, Nomor Meja, Jumlah Tamu, Badge Status (Pending/Approved/Rejected/Cancelled/Expired).
    *   **Tombol Cancel:** Jika status booking adalah `pending` atau `approved`, tampilkan tombol outline tipis *"Cancel Reservation"* berwarna merah terracotta lembut di ujung kanan.
    *   Jika kosong, tampilkan ilustrasi outline piring kosong yang elegan dengan tulisan *"No active bookings found"*.

### F. Admin Dashboard (Booking Management)
*   **Statistik Singkat (Top Bar):**
    *   Tiga kotak ringkasan tanpa border mencolok: `Total Pending` (Amber), `Approved Today` (Sage), dan `Active Tables` (Gold). Menggunakan angka Serif sangat besar.
*   **Filter Panel:**
    *   Bar pencarian nama pelanggan dengan input minimalis.
    *   Dropdown filter berdasarkan `Status` dan `Date Picker` untuk tanggal tertentu.
*   **Interactive Data Table:**
    *   Tabel data dengan header uppercase kecil. Baris tabel dipisahkan oleh garis abu-abu hangat yang tipis.
    *   Kolom memuat: Pelanggan (Nama & Email), Detail Reservasi (Tanggal, Waktu, Tamu), Meja, Status (Badge).
    *   **Kolom Aksi:** Tombol cepat tanpa teks panjang, melainkan tombol kecil berlabel *"Approve"* (Sage border) dan *"Reject"* (Terracotta border).

### G. Table Management (CRUD Meja - Admin)
*   **Header Halaman:**
    *   Judul: *"Restaurant Tables Configuration"*. Tombol *"Add New Table"* di sebelah kanan atas dengan ikon "+" tipis.
*   **Table Grid List:**
    *   Kumpulan kartu meja yang menampilkan visual miniatur meja berdasarkan kapasitas (meja kecil untuk 2 orang, meja besar untuk 4-6 orang).
    *   Setiap kartu memiliki tombol aksi *"Edit"* dan *"Delete"* dengan ikon berukuran kecil.
*   **Modal Form (Add/Edit Table):**
    *   Overlay modal berlatar belakang gelap transparan tipis (`bg-[#2C2421]/40 backdrop-blur-[2px]`).
    *   Kotak modal berlatar `bg-[#FDFBF7]` dengan border emas tipis. Input untuk: Nomor Meja (T01, T02) dan Kapasitas (angka).

---

## 7. Cara Menghindari Desain Terlihat "AI Generic"
Untuk memastikan desain terasa dibuat secara autentik oleh manusia (*human touch*) dan bukan template AI standar:
1.  **Ganti Border Radius Standar:** Hindari penggunaan sudut membulat balon (`rounded-2xl` atau `rounded-xl`). Gunakan sudut tajam (`rounded-none`) atau sudut bulat sangat kecil (`rounded-sm`).
2.  **Hilangkan Shadow Mengambang:** AI sering menghasilkan kartu dengan bayangan melayang tebal (`shadow-lg`, `shadow-xl`). Gantilah dengan garis tepi tipis (`border-[0.5px] border-[#2C2421]/15`) atau bayangan solid retro (`shadow-[3px_3px_0px_#2C2421]`).
3.  **Layout Judul Asimetris:** Posisikan judul halaman sedikit ke kiri atau berikan jarak yang tidak biasa (asimetris) dengan teks deskripsi di bawahnya menggunakan spasi editorial.
4.  **Bermain dengan Huruf Miring (Italic):** Gunakan tag `*` (*italic*) pada beberapa kata kunci Serif untuk memberi penekanan artistik seperti dalam menu restoran klasik (contoh: *"Experience the art of **thoughtful** dining"*).
5.  **Aksen Garis Dekoratif:** Tambahkan elemen garis pemisah tipis bergaya vintage di bawah judul utama (`<hr class="border-[#2C2421]/10 my-4" />`).

---

## 8. Menjaga Keterbacaan dan Kemudahan Penggunaan Dashboard
Gaya vintage/elegan sering kali mengorbankan fungsionalitas demi estetika. Dashboard pada aplikasi ini tetap dijamin mudah digunakan dengan prinsip:
1.  **Kontras Teks Tinggi:** Semua teks informasi penting (nomor meja, tanggal, jam, status, nama tamu) menggunakan warna Bitter Chocolate gelap (`#2C2421`) di atas latar cream terang, sehingga memenuhi standar aksesibilitas kontras.
2.  **Tombol Aksi Tetap Jelas:** Tombol penting seperti "Approve", "Reject", dan "Cancel" tidak disamarkan dengan font miring yang tipis. Mereka tetap berupa tombol ber-badge dengan ikon penjelas yang kontras dan area klik yang cukup besar (`px-4 py-2`).
3.  **Tabel Data Bersih:** Di dalam tabel data admin, font serif hanya digunakan pada judul kolom dan angka penting (ID, nomor meja). Data teks biasa tetap memakai huruf sans-serif (*Inter*) agar mudah dibaca cepat saat admin memproses banyak reservasi.
4.  **Validasi Form yang Tegas:** Peringatan error dan status sukses menggunakan indikator warna yang secara konseptual dipahami (merah untuk error, hijau untuk sukses) namun tetap disesuaikan dengan tone hangat (*Sage Green* dan *Terracotta*), bukan hijau/merah menyala yang merusak estetika vintage.

---

*Spesifikasi visual ini akan diimplementasikan sebagai dasar pembuatan kelas Tailwind CSS dan struktur DOM React.*
