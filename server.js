require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// --- SETUP EXPRESS ---
const app = express();
app.use(cors());
app.use(express.json());

// --- KONEKSI DATABASE ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Terhubung"))
  .catch(err => console.log("Gagal koneksi:", err.message));

// --- JALUR UTAMA (ROOT) ---
app.get('/', (req, res) => {
  res.send('Selamat datang di API Backend Sistem Informasi Akademik SMAN 1. Server Aktif! 🚀');
});

// --- MENGHUBUNGKAN ROUTES (JALUR API) ---
// Jalur ini akan mengarah ke file auth.js di dalam folder routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/siswa', require('./routes/siswa'));

// --- JALANKAN SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));