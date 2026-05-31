const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Ambil token dari header
  let token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ pesan: 'Akses Ditolak. Anda belum login!' });
  }

  // 2. FITUR BARU: Bersihkan kata "Bearer " atau spasi ekstra jika ada
  if (token.startsWith('Bearer ')) {
    // Memotong 7 huruf pertama ("Bearer ")
    token = token.slice(7, token.length).trim(); 
  }

  try {
    // 3. Verifikasi token yang sudah bersih
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next(); 
  } catch (error) {
    res.status(400).json({ pesan: 'Token tidak valid atau sudah kedaluwarsa.' });
  }
};