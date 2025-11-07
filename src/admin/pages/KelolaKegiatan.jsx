import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/KelolaKegiatan.css";

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
  const navigate = useNavigate();
  const [kegiatanList, setKegiatanList] = useState(mockKegiatanData);
  const [filter, setFilter] = useState("");
  const [activeTab, setActiveTab] = useState("semua");

  const filteredKegiatan = useMemo(() => {
    let filtered = kegiatanList;

    // Filter by status tab
    if (activeTab === "selesai") {
      filtered = filtered.filter((k) => k.status === "selesai");
    } else if (activeTab === "belum") {
      filtered = filtered.filter((k) => k.status === "belum selesai");
    }

    // Filter by search
    if (filter) {
      filtered = filtered.filter(
        (k) =>
          k.posyandu.toLowerCase().includes(filter.toLowerCase()) ||
          k.nama.toLowerCase().includes(filter.toLowerCase())
      );
    }

    return filtered;
  }, [filter, kegiatanList, activeTab]);

  // Hitung statistik
  const stats = useMemo(() => {
    const total = kegiatanList.length;
    const selesai = kegiatanList.filter((k) => k.status === "selesai").length;
    const pending = total - selesai;
    return { total, selesai, pending };
  }, [kegiatanList]);

  const handleOpenForm = (id = null) => {
    if (id) {
      navigate(`/admin/kelola-kegiatan/edit/${id}`);
    } else {
      navigate("/admin/kelola-kegiatan/tambah");
    }
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
      {/* Header Section */}
      <div className="kelola-header">
        <div className="header-left">
          <div className="header-icon-wrapper">
            <span className="header-icon">📅</span>
          </div>
          <div className="header-text">
            <h1>Kelola Kegiatan</h1>
            <p>Manajemen kegiatan posyandu</p>
          </div>
        </div>
        <button onClick={() => handleOpenForm()} className="btn-tambah">
          <span className="btn-icon">+</span>
          Tambah Kegiatan
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-container">
        <div className="stat-card stat-total">
          <div className="stat-icon-box">
            <span className="stat-icon">📊</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Kegiatan</div>
          </div>
          <div className="stat-trend">
            <span className="trend-icon">📈</span>
          </div>
        </div>

        <div className="stat-card stat-selesai">
          <div className="stat-icon-box">
            <span className="stat-icon">✓</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.selesai}</div>
            <div className="stat-label">Selesai</div>
          </div>
          <div className="stat-progress">
            <div
              className="progress-fill"
              style={{
                width: `${(stats.selesai / stats.total) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-icon-box">
            <span className="stat-icon">⏳</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Belum Selesai</div>
          </div>
          <div className="stat-progress">
            <div
              className="progress-fill"
              style={{
                width: `${(stats.pending / stats.total) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Filter and Tabs Section */}
      <div className="filter-section">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Cari kegiatan atau posyandu..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
          {filter && (
            <button
              className="clear-search"
              onClick={() => setFilter("")}
            >
              ✕
            </button>
          )}
        </div>

        <div className="tabs-wrapper">
          <button
            className={`tab-btn ${activeTab === "semua" ? "active" : ""}`}
            onClick={() => setActiveTab("semua")}
          >
            <span className="tab-icon">📋</span>
            Semua
            <span className="tab-badge">{stats.total}</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "selesai" ? "active" : ""}`}
            onClick={() => setActiveTab("selesai")}
          >
            <span className="tab-icon">✓</span>
            Selesai
            <span className="tab-badge">{stats.selesai}</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "belum" ? "active" : ""}`}
            onClick={() => setActiveTab("belum")}
          >
            <span className="tab-icon">⏳</span>
            Belum Selesai
            <span className="tab-badge">{stats.pending}</span>
          </button>
        </div>
      </div>

      {/* Activity List */}
      {filteredKegiatan.length > 0 ? (
        <div className="kegiatan-grid">
          {filteredKegiatan.map((kegiatan) => (
            <div key={kegiatan.id} className="kegiatan-card">
              <div className="card-header">
                <div className="card-title-section">
                  <h3 className="card-title">{kegiatan.nama}</h3>
                  <span
                    className={`status-badge ${
                      kegiatan.status === "selesai" ? "badge-selesai" : "badge-pending"
                    }`}
                  >
                    <span className="badge-dot"></span>
                    {kegiatan.status === "selesai" ? "Selesai" : "Belum Selesai"}
                  </span>
                </div>
              </div>

              <div className="card-body">
                <div className="info-row">
                  <div className="info-badge posyandu-badge">
                    <span className="info-icon">🏥</span>
                    <span className="info-text">{kegiatan.posyandu}</span>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-badge time-badge">
                    <span className="info-icon">🕐</span>
                    <span className="info-text">
                      {new Date(kegiatan.waktu).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      {" • "}
                      {new Date(kegiatan.waktu).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="description-box">
                  <p className="description-text">{kegiatan.penjelasan}</p>
                </div>
              </div>

              <div className="card-footer">
                <div className="action-buttons">
                  <button
                    onClick={() => handleToggleStatus(kegiatan.id)}
                    className="action-btn btn-status"
                    title={
                      kegiatan.status === "selesai"
                        ? "Tandai Belum Selesai"
                        : "Tandai Selesai"
                    }
                  >
                    <span className="btn-icon">
                      {kegiatan.status === "selesai" ? "↩" : "✓"}
                    </span>
                  </button>
                  <button
                    onClick={() => handleOpenForm(kegiatan.id)}
                    className="action-btn btn-edit"
                    title="Edit"
                  >
                    <span className="btn-icon">✏️</span>
                  </button>
                  <button
                    onClick={() => handleDelete(kegiatan.id)}
                    className="action-btn btn-delete"
                    title="Hapus"
                  >
                    <span className="btn-icon">🗑️</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon-wrapper">
            <span className="empty-icon">🔍</span>
          </div>
          <h3 className="empty-title">Tidak Ada Kegiatan</h3>
          <p className="empty-text">
            {filter
              ? `Tidak ada kegiatan yang cocok dengan "${filter}"`
              : activeTab === "selesai"
              ? "Belum ada kegiatan yang selesai"
              : activeTab === "belum"
              ? "Semua kegiatan sudah selesai"
              : "Belum ada kegiatan yang ditambahkan"}
          </p>
          {!filter && activeTab === "semua" && (
            <button
              onClick={() => handleOpenForm()}
              className="btn-empty-action"
            >
              <span>+</span> Tambah Kegiatan Pertama
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default KelolaKegiatan;