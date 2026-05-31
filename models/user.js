const mongoose = require('mongoose');

// Membuat kerangka aturan untuk data User
const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true // Nama wajib diisi
  },
  email: {
    type: String,
    required: true,
    unique: true // Email tidak boleh ada yang sama di database
  },
  password: {
    type: String,
    required: true // Password wajib diisi
  }
}, {
  timestamps: true // Otomatis mencatat waktu kapan akun dibuat/diedit
});

// Mengekspor model agar bisa dipakai di file lain
module.exports = mongoose.model('User', userSchema);