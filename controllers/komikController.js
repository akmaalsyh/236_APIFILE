// Memuat koneksi database/models dan service layer
const db = require('../models');
const komikService = require('../services/komikService');

// --- Fungsi Controller untuk Operasi CRUD ---

// 1. CREATE Komik
async function createKomik(req, res) {
  try {
    // Mengambil data dari body request
    const komikData = req.body;

    // Menangani upload file (gambar) jika ada
    if (req.file) {
      // Mengisi metadata gambar ke komikData
      komikData.imageType = req.file.mimetype;
      komikData.imageName = req.file.originalname;
      komikData.imageData = req.file.buffer; // Buffer berisi data biner gambar
    }

    // Memanggil service untuk membuat komik
    const result = await komikService.createKomik(db, komikData);

    // Mengirim response sukses
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    // Mengirim response error (Bad Request)
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

// 2. READ All Komik
async function getAllKomik(req, res) {
  try {
    // Memanggil service untuk mengambil semua komik
    const result = await komikService.getAllKomik(db);

    // Mengirim response sukses
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    // Mengirim response error (Internal Server Error)
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// 3. READ Komik By ID
async function getKomikById(req, res) {
  try {
    // Mengambil ID dari parameter URL
    const {
      id
    } = req.params;

    // Memanggil service untuk mengambil komik berdasarkan ID
    const result = await komikService.getKomikById(db, id);

    // Mengirim response sukses
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    // Mengirim response error (Not Found/Bad Request)
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
}

// 4. UPDATE Komik
async function updateKomik(req, res) {
  try {
    // Mengambil data update dari body request
    const komikData = req.body;

    // Menangani upload file (gambar) jika ada
    if (req.file) {
      // Mengisi metadata gambar ke komikData
      komikData.imageType = req.file.mimetype;
      komikData.imageName = req.file.originalname;
      komikData.imageData = req.file.buffer; // Buffer berisi data biner gambar
    }

    // Memanggil service untuk mengupdate komik. ID diambil dari parameter URL.
    const result = await komikService.updateKomik(db, req.params.id, komikData);

    // Mengirim response sukses
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    // Mengirim response error (Bad Request/Not Found)
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

// 5. DELETE Komik
async function deleteKomik(req, res) {
  try {
    // Memanggil service untuk menghapus komik. ID diambil dari parameter URL.
    const result = await komikService.deleteKomik(db, req.params.id);

    // Mengirim response sukses
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    // Mengirim response error (Bad Request/Not Found)
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

// --- Export Fungsi ---

module.exports = {
  createKomik,
  getAllKomik,
  getKomikById,
  updateKomik,
  deleteKomik,
};