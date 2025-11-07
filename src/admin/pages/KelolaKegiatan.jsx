import React, { useState, useMemo } from "react";
import "../../styles/admin/KelolaKegiatan.css";
import FormKegiatan from "./FormKegiatan";

const mockKegiatanData = [
  {
    id: 1,
    nama: "Imunisasi Anak Batch 1",
    posyandu: "Posyandu Anggrek",
    waktu: "2025-07-25T15:00",
    penjelasan: "Memberikan imunisasi anti stunting untuk anak usia 0-5 tahun.",
    status: "selesai",
  },
  {
    id: 2,
    nama: "Imunisasi Anak Batch 2",
    posyandu: "Posyandu Mawar",
    waktu: "2025-08-14T08:00",
    penjelasan: "Imunisasi Batch 2 di Balai Desa untuk balita.",
    status: "belum selesai",
  },
  {
    id: 3,
    nama: "Edukasi Kesehatan Ibu",
    posyandu: "Posyandu Anggrek",
    waktu: "2025-09-01T10:00",
    penjelasan: "Pentingnya gizi seimbang untuk ibu hamil dan menyusui.",
    status: "belum selesai",
  },
];

const KelolaKegiatan = () => {
  const [kegiatanList, setKegiatanList] = useState(mockKegiatanData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentKegiatan, setCurrentKegiatan] = useState(null);
  const [filter, setFilter] = useState("");

  const filteredKegiatan = useMemo(() => {
    if (!filter) return kegiatanList;
    return kegiatanList.filter((k) =>
      k.posyandu.toLowerCase().includes(filter.toLowerCase()) ||
      k.nama.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, kegiatanList]);

  // Hitung statistik
  const stats = useMemo(() => {
    const total = kegiatanList.length;
    const selesai = kegiatanList.filter((k) => k.status === "selesai").length;
    const pending = total - selesai;
    return { total, selesai, pending };
  }, [kegiatanList]);

  const handleOpenModal = (kegiatan = null) => {
    setCurrentKegiatan(
      kegiatan
        ? kegiatan
        : {
            id: null,
            nama: "",
            posyandu: "",
            waktu: "",
            penjelasan: "",
            status: "belum selesai",
          }
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = (data) => {
    if (data.id) {
      setKegiatanList(kegiatanList.map((k) => (k.id === data.id ? data : k)));
    } else {
      setKegiatanList([...kegiatanList, { ...data, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) {
      setKegiatanList(kegiatanList.filter((k) => k.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setKegiatanList(
      kegiatanList.map((k) =>
        k.id === id
          ? {
              ...k,
              status: k.status === "selesai" ? "belum selesai" : "selesai",
            }
          : k
      )
    );
  };

  return (
    <div className="kelola-container">
      <div className="kelola-header">
        <h1>
          <span className="header-icon">📅</span>
          Kelola Kegiatan
        </h1>
        <button onClick={() => handleOpenModal()} className="btn-tambah">
          <span>+</span> Tambah Kegiatan
        </button>
      </div>

      {/* Statistics Summary */}
      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-icon total">📊</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Kegiatan</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon selesai">✓</div>
          <div className="stat-content">
            <h3>{stats.selesai}</h3>
            <p>Selesai</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">⏳</div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Belum Selesai</p>
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="filter-wrapper">
        <span className="filter-icon">🔍</span>
        <input
          type="text"
          placeholder="Cari berdasarkan nama kegiatan atau posyandu..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Activity List */}
      {filteredKegiatan.length > 0 ? (
        <div className="kegiatan-list-admin">
          {filteredKegiatan.map((kegiatan) => (
            <div key={kegiatan.id} className="kegiatan-card-admin">
              <div className="kegiatan-card-header">
                <div className="kegiatan-title-section">
                  <h3>{kegiatan.nama}</h3>
                </div>
                <span
                  className={`status-badge ${
                    kegiatan.status === "selesai" ? "selesai" : "belum"
                  }`}
                >
                  {kegiatan.status === "selesai" ? "Selesai" : "Belum Selesai"}
                </span>
              </div>

              <div className="kegiatan-card-info">
                <div className="info-item">
                  <div className="info-icon posyandu">🏥</div>
                  <div className="info-content">
                    <strong>Posyandu:</strong>
                    {kegiatan.posyandu}
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon waktu">🕐</div>
                  <div className="info-content">
                    <strong>Waktu:</strong>
                    {new Date(kegiatan.waktu).toLocaleString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>

              <div className="penjelasan-box">
                <p>{kegiatan.penjelasan}</p>
              </div>

              <div className="kegiatan-card-actions">
                <button
                  onClick={() => handleToggleStatus(kegiatan.id)}
                  className="btn-status"
                >
                  {kegiatan.status === "selesai" ? "↩" : "✓"}
                  {kegiatan.status === "selesai"
                    ? " Tandai Belum Selesai"
                    : " Tandai Selesai"}
                </button>
                <button
                  onClick={() => handleOpenModal(kegiatan)}
                  className="btn-edit"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(kegiatan.id)}
                  className="btn-hapus"
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Tidak Ada Kegiatan Ditemukan</h3>
          <p>
            {filter
              ? `Tidak ada kegiatan yang cocok dengan "${filter}"`
              : "Belum ada kegiatan yang ditambahkan"}
          </p>
        </div>
      )}

      {isModalOpen && (
        <FormKegiatan
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          currentData={currentKegiatan}
        />
      )}
    </div>
  );
};

export default KelolaKegiatan;