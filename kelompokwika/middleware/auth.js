// Middleware untuk melindungi halaman admin
function isAuthenticated(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    return next();
  }
  req.session.error = 'Silakan login terlebih dahulu untuk mengakses halaman admin.';
  return res.redirect('/login');
}

module.exports = { isAuthenticated };
