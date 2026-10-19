-- =============================================
-- Schema Database untuk Sistem CRUD Siswa
-- Bahan Ajar Kelas 12 RPL
-- =============================================

-- Buat database (jika local)
-- CREATE DATABASE IF NOT EXISTS db_siswa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE db_siswa;

-- Tabel siswa
CREATE TABLE IF NOT EXISTS siswa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nis VARCHAR(20) NOT NULL UNIQUE,
  nama VARCHAR(100) NOT NULL,
  kelas VARCHAR(10) NOT NULL,
  jurusan VARCHAR(50) DEFAULT NULL,
  email VARCHAR(100) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data contoh (seed)
INSERT INTO siswa (nis, nama, kelas, jurusan, email) VALUES
('2024001', 'Ahmad Fauzi', 'XII', 'RPL', 'ahmad.fauzi@sekolah.sch.id'),
('2024002', 'Siti Nurhaliza', 'XII', 'RPL', 'siti.nur@sekolah.sch.id'),
('2024003', 'Budi Santoso', 'XI', 'TKJ', 'budi.santoso@sekolah.sch.id'),
('2024004', 'Dewi Lestari', 'XII', 'MM', 'dewi.lestari@sekolah.sch.id'),
('2024005', 'Eko Prasetyo', 'X', 'RPL', 'eko.prasetyo@sekolah.sch.id'),
('2024006', 'Fitriani Putri', 'XI', 'OTKP', 'fitriani@sekolah.sch.id'),
('2024007', 'Gilang Ramadhan', 'XII', 'RPL', 'gilang.r@sekolah.sch.id'),
('2024008', 'Hana Safira', 'X', 'AKL', 'hana.safira@sekolah.sch.id');
