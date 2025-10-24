import React, { useState } from "react";
import "./KelolaBerita.css";

// Gunakan struktur data yang SAMA PERSIS dengan di halaman Berita.js
// Ini adalah "kontrak" data antara frontend dan backend nanti.
const mockNewsData = [
  {
    id: 1,
    category: "stunting",
    imgSrc:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80",
    date: "2025-10-15",
    author: "Kemenkes RI",
    title: "Memahami Stunting: Penyebab dan Pencegahan",
    linkUrl:
      "https://www.kemkes.go.id/article/view/18040500001/distribusi-cegah-stunting-itu-penting.html",
  },
  {
    id: 2,
    category: "tumbuh-kembang",
    imgSrc:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    date: "2025-10-12",
    author: "IDAI",
    title: "Tahapan Tumbuh Kembang Anak Usia 0-5 Tahun",
    linkUrl:
      "https://www.idai.or.id/artikel/seputar-kesehatan-anak/pemantauan-perkembangan-anak-panduan-orang-tua",
  },
  {
    id: 3,
    category: "gizi",
    imgSrc:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    date: "2025-10-10",
    author: "Nutrisionis",
    title: "Panduan Gizi Seimbang untuk Anak Balita",
    linkUrl:
      "https://health.kompas.com/read/2022/03/21/130000168/panduan-gizi-seimbang-untuk-anak-balita",
  },
];

const KelolaBerita = () => {
  const [beritaList, setBeritaList] = useState(mockNewsData);

  // Fungsi placeholder untuk aksi
  const handleAdd = () => {
    alert('Fitur "Tambah Berita Baru" akan segera diimplementasikan.');
  };

  const handleEdit = (id) => {
    alert(`Fitur "Edit Berita ID: ${id}" akan segera diimplementasikan.`);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus berita dengan ID: ${id}?`
      )
    ) {
      setBeritaList(beritaList.filter((item) => item.id !== id));
      alert(`Berita ID: ${id} telah dihapus (simulasi).`);
    }
  };

  return (
    <div className="kelola-container" data-aos="fade-in">
      <div className="kelola-header">
        <h1>Kelola Berita</h1>
        <button onClick={handleAdd} className="btn-tambah">
          + Tambah Berita Baru
        </button>
      </div>

      <div className="table-wrapper">
        <table className="content-table">
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Judul</th>
              <th>Kategori</th>
              <th>Penulis</th>
              <th>Tanggal Terbit</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {beritaList.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="thumbnail-img"
                  />
                </td>
                <td>{item.title}</td>
                <td>
                  <span className={`kategori-badge ${item.category}`}>
                    {item.category.replace("-", " ")}
                  </span>
                </td>
                <td>{item.author}</td>
                <td>
                  {new Date(item.date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn-hapus"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelolaBerita;
