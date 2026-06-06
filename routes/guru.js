const express = require('express');
const router = express.Router();
const guru = require('../models/guru');
const verifyToken = require('../middleware/verifyToken');

// API: Tambah Guru Baru
router.post('/', verifyToken, async (req, res) => {
  try {
    const { namaLengkap, nip, mataPelajaran } = req.body;
    const guruBaru = new Guru({
      namaLengkap, nip, mataPelajaran, user: req.user.id
    });
    const simpanGuru = await guruBaru.save();
    res.status(201).json({ pesan: 'Data guru berhasil disimpan', data: simpanGuru });
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

// API: Ambil Semua Data Guru
router.get('/', verifyToken, async (req, res) => {
  try {
    const semuaGuru = await Guru.find({ user: req.user.id });
    res.json(semuaGuru);
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

// API: Update Data Guru
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const guruDiupdate = await Guru.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body, { new: true }
    );
    if (!guruDiupdate) return res.status(404).json({ pesan: 'Data tidak ditemukan' });
    res.json({ pesan: 'Data guru berhasil diupdate', data: guruDiupdate });
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

// API: Hapus Data Guru
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const guruDihapus = await Guru.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!guruDihapus) return res.status(404).json({ pesan: 'Data tidak ditemukan' });
    res.json({ pesan: 'Data guru berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

module.exports = router;