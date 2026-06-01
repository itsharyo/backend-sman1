const express = require('express');
const router = express.Router();
const Siswa = require('../models/Siswa');
const verifyToken = require('../middleware/verifyToken'); // Memanggil satpam

// API: Menambah Data Siswa Baru (Dilindungi Satpam)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { namaLengkap, nisn, kelas, jurusan } = req.body;

    // Bungkus data siswa baru
    const siswaBaru = new Siswa({
      namaLengkap,
      nisn,
      kelas,
      jurusan,
      user: req.user.id // ID guru diambil otomatis dari token
    });

    // Simpan ke database
    const simpanSiswa = await siswaBaru.save();
    res.status(201).json({ pesan: 'Data siswa berhasil disimpan', data: simpanSiswa });
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

// API: Melihat Semua Data Siswa
router.get('/', verifyToken, async (req, res) => {
  try {
    // Cari semua siswa yang diinput oleh guru yang sedang login
    const semuaSiswa = await Siswa.find({ user: req.user.id });
    res.json(semuaSiswa);
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

// API: Mengubah Data Siswa (Update)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    // Cari siswa berdasarkan ID dan pastikan itu milik guru yang sedang login
    const siswaDiupdate = await Siswa.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true } // Mengembalikan data yang sudah diperbarui
    );

    if (!siswaDiupdate) {
      return res.status(404).json({ pesan: 'Data tidak ditemukan atau akses ditolak' });
    }

    res.json({ pesan: 'Data siswa berhasil diupdate', data: siswaDiupdate });
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

// API: Menghapus Data Siswa (Delete)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    // Cari dan hapus siswa berdasarkan ID dan pastikan itu milik guru yang sedang login
    const siswaDihapus = await Siswa.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!siswaDihapus) {
      return res.status(404).json({ pesan: 'Data tidak ditemukan atau akses ditolak' });
    }

    res.json({ pesan: 'Data siswa berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

module.exports = router;