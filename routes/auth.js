const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Memanggil kerangka User yang barusan kamu buat

// Jalur untuk Registrasi (Daftar Akun Baru)
router.post('/register', async (req, res) => {
  try {
    // Menangkap data yang dikirim dari frontend/pengguna
    const { nama, email, password } = req.body;

    // 1. Cek apakah email sudah pernah didaftarkan sebelumnya
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ pesan: 'Email sudah terdaftar!' });
    }

    // 2. Acak passwordnya agar aman (tidak bisa dibaca orang lain)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Bungkus data user baru
    user = new User({
      nama,
      email,
      password: hashedPassword
    });

    // 4. Simpan ke dalam database lokal kita
    await user.save();

    res.status(201).json({ pesan: 'Akun admin SMAN 1 berhasil dibuat!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ pesan: 'Terjadi kesalahan pada server' });
  }
});

// Jalur untuk Login (Masuk)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Cari apakah email-nya terdaftar di database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ pesan: 'Email tidak ditemukan!' });
    }

    // 2. Cek apakah password-nya cocok dengan yang ada di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ pesan: 'Password salah!' });
    }

    // 3. Jika benar semua, buatkan "Tiket Masuk" (Token JWT)
    // Tiket ini berlaku selama 1 jam (1h)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // 4. Berikan tiketnya sebagai balasan
    res.json({ 
      pesan: 'Login berhasil!', 
      token: token 
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ pesan: 'Terjadi kesalahan pada server' });
  }
});
module.exports = router;