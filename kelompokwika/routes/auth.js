const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Kredensial admin untuk demonstrasi.
// Username: admin | Password: admin123
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Halaman Login
router.get('/login', (req, res) => {
  if (req.session.isLoggedIn) {
    return res.redirect('/siswa/admin');
  }
  res.render('login', {
    title: 'Login Admin',
    error: req.session.error
  });
  delete req.session.error;
});

// Proses Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Untuk pembelajaran: password di-hash setiap kali.
    // Di aplikasi nyata, hash disimpan di database sekali saja.
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const isMatch = username === ADMIN_USERNAME && await bcrypt.compare(password, hash);

    if (isMatch) {
      req.session.isLoggedIn = true;
      req.session.username = username;
      req.session.success = 'Berhasil login sebagai Admin!';
      return res.redirect('/siswa/admin');
    }

    req.session.error = 'Username atau password salah!';
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    req.session.error = 'Terjadi kesalahan saat login.';
    res.redirect('/login');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error(err);
    res.redirect('/');
  });
});

module.exports = router;
