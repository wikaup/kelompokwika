const mysql = require('mysql2/promise');
require('dotenv').config();

// Support both individual env vars and Railway's MYSQL_URL
let pool;

if (process.env.MYSQL_URL) {
  // Railway MySQL connection string
  pool = mysql.createPool(process.env.MYSQL_URL);
} else {
  // Local development (opsional, siswa tidak perlu ini)
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db_siswa',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

// =====================================================
// AUTO SETUP TABEL + DATA CONTOH
// Siswa TIDAK perlu jalankan SQL manual sama sekali
// =====================================================
async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');

    // Buat tabel jika belum ada
    await connection.query(`
      CREATE TABLE IF NOT EXISTS siswa (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nis VARCHAR(20) NOT NULL UNIQUE,
        nama VARCHAR(100) NOT NULL,
        kelas VARCHAR(10) NOT NULL,
        jurusan VARCHAR(50) DEFAULT NULL,
        email VARCHAR(100) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Cek apakah sudah ada data
    const [rows] = await connection.query('SELECT COUNT(*) as total FROM siswa');
    
    if (rows[0].total === 0) {
      // Isi data contoh hanya jika tabel kosong
      await connection.query(`
        INSERT INTO siswa (nis, nama, kelas, jurusan, email) VALUES
        ('2024001', 'Ahmad Fauzi', 'XII', 'RPL', 'ahmad.fauzi@sekolah.sch.id'),
        ('2024002', 'Siti Nurhaliza', 'XII', 'RPL', 'siti.nur@sekolah.sch.id'),
        ('2024003', 'Budi Santoso', 'XI', 'TKJ', 'budi.santoso@sekolah.sch.id'),
        ('2024004', 'Dewi Lestari', 'XII', 'MM', 'dewi.lestari@sekolah.sch.id'),
        ('2024005', 'Eko Prasetyo', 'X', 'RPL', 'eko.prasetyo@sekolah.sch.id'),
        ('2024006', 'Fitriani Putri', 'XI', 'OTKP', 'fitriani@sekolah.sch.id'),
        ('2024007', 'Gilang Ramadhan', 'XII', 'RPL', 'gilang.r@sekolah.sch.id'),
        ('2024008', 'Hana Safira', 'X', 'AKL', 'hana.safira@sekolah.sch.id')
      `);
      console.log('🌱 Data contoh berhasil ditambahkan!');
    }

    console.log('📦 Tabel siswa siap digunakan!');
    connection.release();
  } catch (err) {
    console.error('❌ Database init failed:', err.message);
    // Jangan crash aplikasi, biarkan tetap jalan
  }
}

// Jalankan auto-setup saat aplikasi start
initDatabase();

module.exports = pool;
