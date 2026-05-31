const mongoose = require('mongoose');

const siswaSchema = new mongoose.Schema({
  namaLengkap: {
    type: String,
    required: true // Wajib diisi
  },
  nisn: {
    type: String,
    required: true,
    unique: true // NISN tidak boleh ada yang ganda/sama
  },
  kelas: {
    type: String,
    required: true
  },
  jurusan: {
    type: String,
    required: true
  },
  // Fitur spesial: Mencatat ID Guru/Admin yang menginput data siswa ini
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true // Otomatis mencatat waktu input data
});

module.exports = mongoose.model('Siswa', siswaSchema);