const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const siswaRoutes = require('./routes/siswa');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'rahasia_super_aman_ganti_ini',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true di Railway (HTTPS)
    maxAge: 24 * 60 * 60 * 1000 // 1 hari
  }
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global variables untuk semua view
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.username = req.session.username || null;
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/siswa', siswaRoutes);

// Redirect root ke /siswa
app.get('/', (req, res) => {
  res.redirect('/siswa');
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { message: 'Halaman tidak ditemukan' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Terjadi kesalahan pada server' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📚 Bahan ajar CRUD Siswa - Kelas 12 RPL`);
});
