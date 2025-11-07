import React, { useState, useMemo } from "react";
import "../styles/pages/Kegiatan.css";

const defaultNotes = [
  {
    id: "k1",
    title: "Imunisasi Anak Batch 1",
    content: "Memberikan imunisasi anti stunting di posyandu Anggrek.",
    deadline: "2025-07-25T15:00",
    category: "imunisasi",
  },
  {
    id: "k2",
    title: "Imunisasi Anak Batch 2 (Agustus)",
    content:
      "Imunisasi Batch 2 akan dilaksanakan tepat pada tanggal 14 Agustus 2025 di Balai Desa.",
    deadline: "2025-08-14T08:00",
    category: "imunisasi",
  },
  {
    id: "k3",
    title: "Edukasi Kesehatan Ibu dan Anak",
    content:
      "Membahas pentingnya gizi seimbang untuk tumbuh kembang optimal bersama Dokter Mira.",
    deadline: "2025-09-01T10:00",
    category: "edukasi",
  },
  {
    id: "k4",
    title: "Pemeriksaan Kesehatan Rutin",
    content:
      "Pemeriksaan kesehatan gratis untuk anak balita di Puskesmas Kecamatan.",
    deadline: "2025-10-05T09:00",
    category: "pemeriksaan",
  },
];

const Kegiatan = () => {
  const [filters, setFilters] = useState({
    date: "",
    category: "all",
    name: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ date: "", category: "all", name: "" });
    document.getElementById("filterForm").reset();
  };

  const filteredNotes = useMemo(() => {
    return defaultNotes.filter((note) => {
      const filterDate = filters.date ? new Date(filters.date) : null;
      const noteDate = note.deadline ? new Date(note.deadline) : null;

      const categoryMatch =
        filters.category === "all" || note.category === filters.category;
      const nameMatch =
        !filters.name ||
        note.title.toLowerCase().includes(filters.name.toLowerCase());
      const dateMatch =
        !filterDate ||
        (noteDate &&
          noteDate.getFullYear() === filterDate.getFullYear() &&
          noteDate.getMonth() === filterDate.getMonth() &&
          noteDate.getDate() === filterDate.getDate());

      return categoryMatch && nameMatch && dateMatch;
    });
  }, [filters]);

  const formatDate = (dateString) => {
    if (!dateString) return "Waktu belum ditentukan";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    };
    return new Date(dateString).toLocaleString("id-ID", options) + " WIB";
  };

  const getCategoryName = (category) => {
    const names = {
      imunisasi: "Imunisasi",
      edukasi: "Edukasi",
      pemeriksaan: "Pemeriksaan",
    };
    return names[category] || category;
  };

  return (
    <div className="container-posanak">
      <div className="main-content-posanak">
        <aside className="filter-sidebar" data-aos="fade-right">
          <h2 className="sidebar-title">Filter kegiatan</h2>
          <form id="filterForm" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group-filter">
              <label htmlFor="date" className="filter-label">
                Waktu
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="filter-input"
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group-filter">
              <label htmlFor="category" className="filter-label">
                Kategori
              </label>
              <select
                id="category"
                name="category"
                className="filter-select"
                onChange={handleFilterChange}
              >
                <option value="all">Pilih kategori</option>
                <option value="imunisasi">Imunisasi</option>
                <option value="edukasi">Edukasi</option>
                <option value="pemeriksaan">Pemeriksaan</option>
              </select>
            </div>
            <div className="form-group-filter">
              <label htmlFor="name" className="filter-label">
                Nama Kegiatan
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="filter-input"
                placeholder="Cari nama kegiatan..."
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-actions">
              <button
                type="button"
                className="filter-btn reset-btn"
                onClick={resetFilters}
              >
                <i className="fas fa-redo"></i> Reset Filter
              </button>
            </div>
          </form>
        </aside>

        <main className="kegiatan-list">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => (
              <div
                className="note-card"
                key={note.id}
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <h3 className="note-title">{note.title}</h3>
                <p className="note-content">{note.content}</p>
                <div className="note-meta">
                  <div className="note-deadline">
                    <i className="fas fa-calendar-alt"></i>
                    <span>{formatDate(note.deadline)}</span>
                  </div>
                  <div className="category-info">
                    <span>{getCategoryName(note.category)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state" data-aos="fade-up">
              <h2>Tidak ada kegiatan ditemukan</h2>
              <p>Coba ubah kriteria filter Anda atau reset filter.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Kegiatan;
