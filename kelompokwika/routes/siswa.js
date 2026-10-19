const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { isAuthenticated } = require('../middleware/auth');

// ==================== HALAMAN PUBLIK (READ) ====================

// Halaman utama - List semua siswa (bisa diakses tanpa login)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM siswa ORDER BY id DESC');
    res.render('index', {
      title: 'Data Siswa',
      siswa: rows,
      success: req.session.success,
      error: req.session.error
    });
    // Clear flash messages
    delete req.session.success;
    delete req.session.error;
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Gagal mengambil data siswa' });
  }
});

// ==================== ADMIN ONLY (CREATE, UPDATE, DELETE) ====================

// Form tambah siswa
router.get('/tambah', isAuthenticated, (req, res) => {
  res.render('form', {
    title: 'Tambah Siswa',
    siswa: null,
    action: '/siswa/tambah',
    buttonText: 'Simpan Data'
  });
});

// Proses tambah siswa
router.post('/tambah', isAuthenticated, async (req, res) => {
  const { nis, nama, kelas, jurusan, email } = req.body;

  // Validasi sederhana
  if (!nis || !nama || !kelas) {
    req.session.error = 'NIS, Nama, dan Kelas wajib diisi!';
    return res.redirect('/siswa/tambah');
  }

  try {
    await db.query(
      'INSERT INTO siswa (nis, nama, kelas, jurusan, email) VALUES (?, ?, ?, ?, ?)',
      [nis, nama, kelas, jurusan || null, email || null]
    );
    req.session.success = 'Data siswa berhasil ditambahkan!';
    res.redirect('/');
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      req.session.error = 'NIS sudah terdaftar! Gunakan NIS yang berbeda.';
    } else {
      req.session.error = 'Gagal menambahkan data siswa.';
    }
    res.redirect('/siswa/tambah');
  }
});

// Form edit siswa
router.get('/edit/:id', isAuthenticated, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM siswa WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      req.session.error = 'Data siswa tidak ditemukan.';
      return res.redirect('/');
    }
    res.render('form', {
      title: 'Edit Data Siswa',
      siswa: rows[0],
      action: `/siswa/edit/${req.params.id}`,
      buttonText: 'Update Data'
    });
  } catch (err) {
    console.error(err);
    req.session.error = 'Gagal mengambil data siswa.';
    res.redirect('/');
  }
});

// Proses update siswa
router.post('/edit/:id', isAuthenticated, async (req, res) => {
  const { nis, nama, kelas, jurusan, email } = req.body;

  if (!nis || !nama || !kelas) {
    req.session.error = 'NIS, Nama, dan Kelas wajib diisi!';
    return res.redirect(`/siswa/edit/${req.params.id}`);
  }

  try {
    await db.query(
      'UPDATE siswa SET nis = ?, nama = ?, kelas = ?, jurusan = ?, email = ? WHERE id = ?',
      [nis, nama, kelas, jurusan || null, email || null, req.params.id]
    );
    req.session.success = 'Data siswa berhasil diupdate!';
    res.redirect('/');
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      req.session.error = 'NIS sudah digunakan oleh siswa lain!';
    } else {
      req.session.error = 'Gagal mengupdate data siswa.';
    }
    res.redirect(`/siswa/edit/${req.params.id}`);
  }
});

// Hapus siswa
router.post('/hapus/:id', isAuthenticated, async (req, res) => {
  try {
    await db.query('DELETE FROM siswa WHERE id = ?', [req.params.id]);
    req.session.success = 'Data siswa berhasil dihapus!';
  } catch (err) {
    console.error(err);
    req.session.error = 'Gagal menghapus data siswa.';
  }
  res.redirect('/');
});

// ==================== HALAMAN ADMIN DATABASE ====================

// Dashboard Admin - Lihat semua isi database
router.get('/admin', isAuthenticated, async (req, res) => {
  try {
    // Ambil data siswa
    const [siswa] = await db.query('SELECT * FROM siswa ORDER BY id DESC');

    // Ambil info tabel (untuk demonstrasi)
    const [tables] = await db.query('SHOW TABLES');
    const [columns] = await db.query('SHOW COLUMNS FROM siswa');
    const [count] = await db.query('SELECT COUNT(*) as total FROM siswa');

    res.render('admin', {
      title: 'Admin Panel - Database',
      siswa,
      tables,
      columns,
      totalSiswa: count[0].total,
      success: req.session.success,
      error: req.session.error
    });
    delete req.session.success;
    delete req.session.error;
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Gagal mengakses database' });
  }
});

module.exports = router;
