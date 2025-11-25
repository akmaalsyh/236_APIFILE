// Fungsi untuk membuat komik baru
async function createKomik(database, komikData) {
  const {
    title,
    description,
    author,
    imageType,
    imageName,
    imageData
  } = komikData;

  // Validasi data wajib
  if (!title || !description || !author) {
    throw new Error('Title, description, dan author wajib diisi');
  }

  // Membuat komik baru di database
  const newKomik = await database.Komik.create({
    title,
    description,
    author,
    imageType: imageType || null,
    imageName: imageName || null,
    imageData: imageData || null,
  });

  return newKomik;
}

// Fungsi untuk mendapatkan semua komik
async function getAllKomik(database) {
  // Mengambil semua data komik dari database
  const komiks = await database.Komik.findAll();

  // Memproses data gambar (imageData) menjadi base64 jika ada
  return komiks.map(k => {
    if (k.imageData) {
      // Mengubah Buffer ke string base64
      k.imageData = k.imageData.toString('base64');
    }
    return k;
  });
}

// Fungsi untuk mendapatkan komik berdasarkan ID
async function getKomikById(database, id) {
  // Mencari komik berdasarkan Primary Key (ID)
  const komik = await database.Komik.findByPk(id);

  // Jika komik tidak ditemukan
  if (!komik) throw new Error('Komik tidak ditemukan');

  // Memproses data gambar (imageData) menjadi base64 jika ada
  if (komik.imageData) {
    komik.imageData = komik.imageData.toString('base64');
  }

  return komik;
}

// Fungsi untuk memperbarui data komik
async function updateKomik(database, id, komikData) {
  // Mencari komik berdasarkan Primary Key (ID)
  const komik = await database.Komik.findByPk(id);

  // Jika komik tidak ditemukan
  if (!komik) {
    throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
  }

  // Memperbarui data komik
  await komik.update(komikData);

  return komik;
}

// Fungsi untuk menghapus komik
async function deleteKomik(database, id) {
  // Mencari komik berdasarkan Primary Key (ID)
  const komik = await database.Komik.findByPk(id);

  // Jika komik tidak ditemukan
  if (!komik) {
    throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
  }

  // Menghapus komik dari database
  await komik.destroy();

  return {
    message: `Komik dengan ID ${id} berhasil dihapus`
  };
}

// Ekspor semua fungsi service
module.exports = {
  createKomik,
  getAllKomik,
  getKomikById,
  updateKomik,
  deleteKomik,
};