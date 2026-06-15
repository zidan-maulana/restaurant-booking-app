-- ============================================================
-- MIGRATION: Final DB Integrity Patch
-- Tanggal: 2026-06-16
-- Deskripsi: Pembersihan duplikasi nomor meja dan penambahan
--            UNIQUE constraint pada kolom table_number
-- ============================================================

-- Step 1: Backup
CREATE TABLE IF NOT EXISTS tables_backup_before_unique_fix AS
SELECT * FROM tables;

-- Step 2: Audit duplikat (untuk referensi)
-- SELECT table_number, COUNT(*) AS jumlah
-- FROM tables
-- GROUP BY table_number
-- HAVING COUNT(*) > 1;

-- Step 3: Hapus baris duplikat, sisakan id terkecil per table_number
DELETE FROM tables
WHERE id NOT IN (
  SELECT id FROM (
    SELECT MIN(id) AS id
    FROM tables
    GROUP BY table_number
  ) AS keep_rows
);

-- Step 4: Tambahkan UNIQUE constraint
ALTER TABLE tables
ADD CONSTRAINT unique_table_number UNIQUE (table_number);

-- Step 5: Verifikasi
-- SELECT table_number, COUNT(*) FROM tables GROUP BY table_number HAVING COUNT(*) > 1;
-- (Harus return empty)
