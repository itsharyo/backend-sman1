const mongoose = require('mongoose');

const guruSchema = new mongoose.Schema({
  namaLengkap: {
    type: String,
    required: true
  },
  nip: {
    type: String, // Nomor Induk Pegawai
    required: true,
    unique: true
  },
  mataPelajaran: {
    type: String, // Mata pelajaran yang diajarkan
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Mencatat admin siapa yang menginput
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Guru', guruSchema);