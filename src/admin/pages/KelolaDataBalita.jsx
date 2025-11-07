import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/KelolaDataBalita.css";

const hitungUmur = (tanggalLahir) => {
  if (!tanggalLahir) return "0 tahun 0 bulan";
  const tglLahir = new Date(tanggalLahir);
  const hariIni = new Date();
  let tahun = hariIni.getFullYear() - tglLahir.getFullYear();
  let bulan = hariIni.getMonth() - tglLahir.getMonth();

  if (bulan < 0 || (bulan === 0 && hariIni.getDate() < tglLahir.getDate())) {
    tahun--;
    bulan += 12;
  }
  return `${tahun} tahun ${bulan} bulan`;
};

const hitungProgress = (pengukuranKe) => {
  const target = 12;
  return Math.min((pengukuranKe / target) * 100, 100);
};

const mockDataBalita = [
  {
    id: 1,
    nama: "Budi Santoso",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "2023-05-20",
    pengukuranKe: 3,
    namaOrtu: "Santi Dewi",
    tinggiBadan: 75.5,
    beratBadan: 10.2,
    posyandu: "Anggrek",
    statusGizi: "Normal",
    color: "#FF6B9D",
  },
  {
    id: 2,
    nama: "Alya Putri",
    jenisKelamin: "Perempuan",
    tanggalLahir: "2024-01-10",
    pengukuranKe: 2,
    namaOrtu: "Rudi Hartono",
    tinggiBadan: 68.0,
    beratBadan: 8.5,
    posyandu: "Mawar",
    statusGizi: "Resiko Stunting",
    color: "#4ECDC4",
  },
  {
    id: 3,
    nama: "Ahmad Rizki",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "2023-08-15",
    pengukuranKe: 5,
    namaOrtu: "Dewi Lestari",
    tinggiBadan: 80.0,
    beratBadan: 12.5,
    posyandu: "Melati",
    statusGizi: "Normal",
    color: "#667eea",
  },
  {
    id: 4,
    nama: "Siti Nurhaliza",
    jenisKelamin: "Perempuan",
    tanggalLahir: "2023-11-22",
    pengukuranKe: 4,
    namaOrtu: "Ahmad Yani",
    tinggiBadan: 72.5,
    beratBadan: 9.8,
    posyandu: "Dahlia",
    statusGizi: "Normal",
    color: "#F7B731",
  },
  {
    id: 5,
    nama: "Dimas Pratama",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "2024-02-05",
    pengukuranKe: 1,
    namaOrtu: "Rina Wati",
    tinggiBadan: 65.0,
    beratBadan: 7.5,
    posyandu: "Kenanga",
    statusGizi: "Resiko Stunting",
    color: "#A55EEA",
  },
  {
    id: 6,
    nama: "Fitri Ayu",
    jenisKelamin: "Perempuan",
    tanggalLahir: "2023-06-30",
    pengukuranKe: 6,
    namaOrtu: "Budi Cahyono",
    tinggiBadan: 78.0,
    beratBadan: 11.2,
    posyandu: "Tulip",
    statusGizi: "Normal",
    color: "#26D0CE",
  },
];

const KelolaDataBalita = () => {
  const navigate = useNavigate();
  const [dataBalitaList, setDataBalitaList] = useState(mockDataBalita);
  const [filter, setFilter] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredData = useMemo(() => {
    let filtered = dataBalitaList;

    if (selectedStatus !== "all") {
      filtered = filtered.filter((d) =>
        selectedStatus === "normal"
          ? d.statusGizi === "Normal"
          : d.statusGizi === "Resiko Stunting"
      );
    }

    if (filter) {
      filtered = filtered.filter(
        (d) =>
          d.nama.toLowerCase().includes(filter.toLowerCase()) ||
          d.posyandu.toLowerCase().includes(filter.toLowerCase())
      );
    }

    return filtered;
  }, [filter, dataBalitaList, selectedStatus]);

  const stats = useMemo(
    () => ({
      total: dataBalitaList.length,
      normal: dataBalitaList.filter((d) => d.statusGizi === "Normal").length,
      resiko: dataBalitaList.filter((d) => d.statusGizi === "Resiko Stunting")
        .length,
    }),
    [dataBalitaList]
  );

  const handleViewDetail = (id) => navigate(`/admin/balita/detail/${id}`);
  const handleAdd = () => navigate("/admin/balita/tambah");
  const handleEdit = (id) => navigate(`/admin/balita/edit/${id}`);

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data balita ini?")) {
      setDataBalitaList(dataBalitaList.filter((d) => d.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setDataBalitaList(
      dataBalitaList.map((d) =>
        d.id === id
          ? {
              ...d,
              statusGizi:
                d.statusGizi === "Normal" ? "Resiko Stunting" : "Normal",
            }
          : d
      )
    );
  };

  return (
    <div className="kelola-balita-container">
      {/* Header */}
      <div className="kelola-header">
        <div className="header-left">
          <h1 className="page-title">Kelola Data Balita</h1>
          <p className="page-subtitle">Manajemen data balita posyandu</p>
        </div>
        <button className="btn-add" onClick={handleAdd}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Tambah Data Balita
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card stat-total">
          <div className="stat-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Balita</div>
          </div>
        </div>

        <div className="stat-card stat-normal">
          <div className="stat-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div>
            <div className="stat-number">{stats.normal}</div>
            <div className="stat-label">Status Normal</div>
          </div>
        </div>

        <div className="stat-card stat-resiko">
          <div className="stat-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <div className="stat-number">{stats.resiko}</div>
            <div className="stat-label">Resiko Stunting</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-box">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Cari nama balita atau posyandu..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-actions">
          <div className="filter-group">
            <button
              className={`filter-button ${
                selectedStatus === "all" ? "active" : ""
              }`}
              onClick={() => setSelectedStatus("all")}
            >
              Semua
            </button>
            <button
              className={`filter-button ${
                selectedStatus === "normal" ? "active" : ""
              }`}
              onClick={() => setSelectedStatus("normal")}
            >
              Normal
            </button>
            <button
              className={`filter-button ${
                selectedStatus === "resiko" ? "active" : ""
              }`}
              onClick={() => setSelectedStatus("resiko")}
            >
              Resiko
            </button>
          </div>

          <div className="view-toggle">
            <button
              className={`view-button ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid View"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              className={`view-button ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              title="List View"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Data Display */}
      {filteredData.length === 0 ? (
        <div className="empty-state">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <h3>Tidak ada data ditemukan</h3>
          <p>Coba ubah filter atau kata kunci pencarian</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid-view">
          {filteredData.map((data) => (
            <div key={data.id} className="balita-card">
              <div
                className="card-header"
                style={{
                  background: `linear-gradient(135deg, ${data.color}dd, ${data.color})`,
                }}
              >
                <div className="card-avatar">{data.nama.charAt(0)}</div>
                <div className="card-menu">
                  <button className="menu-button">⋮</button>
                </div>
              </div>

              <div className="card-body">
                <h3 className="card-name">{data.nama}</h3>
                <div className="card-info">
                  <span className="info-badge">
                    {data.jenisKelamin === "Laki-laki" ? "👦" : "👧"}{" "}
                    {data.jenisKelamin}
                  </span>
                  <span className="info-badge">📍 {data.posyandu}</span>
                </div>

                <div className="card-stats">
                  <div className="card-stat">
                    <span className="stat-label">Umur</span>
                    <span className="stat-value">
                      {hitungUmur(data.tanggalLahir)}
                    </span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="card-stat">
                    <span className="stat-label">Orang Tua</span>
                    <span className="stat-value">{data.namaOrtu}</span>
                  </div>
                </div>

                <div className="card-progress">
                  <div className="progress-info">
                    <span className="progress-label">Progress Pengukuran</span>
                    <span className="progress-value">
                      {data.pengukuranKe}/12
                    </span>
                  </div>
                  <div className="progress-bar-small">
                    <div
                      className="progress-fill-small"
                      style={{
                        width: `${hitungProgress(data.pengukuranKe)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="card-measure">
                  <div className="measure-item">
                    <div className="measure-icon">⚖️</div>
                    <div>
                      <div className="measure-value">{data.beratBadan} kg</div>
                      <div className="measure-label">Berat Badan</div>
                    </div>
                  </div>
                  <div className="measure-item">
                    <div className="measure-icon">📏</div>
                    <div>
                      <div className="measure-value">
                        {data.tinggiBadan} cm
                      </div>
                      <div className="measure-label">Tinggi Badan</div>
                    </div>
                  </div>
                </div>

                <div className="card-status">
                  <span
                    className={`status-badge ${
                      data.statusGizi === "Normal" ? "normal" : "resiko"
                    }`}
                  >
                    {data.statusGizi === "Normal" ? "✓" : "!"}{" "}
                    {data.statusGizi}
                  </span>
                </div>

                <div className="card-actions">
                  <button
                    className="action-btn"
                    title="Lihat Detail"
                    onClick={() => handleViewDetail(data.id)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                  <button
                    className="action-btn"
                    title="Edit"
                    onClick={() => handleEdit(data.id)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className="action-btn"
                    title="Toggle Status"
                    onClick={() => handleToggleStatus(data.id)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="1 4 1 10 7 10" />
                      <polyline points="23 20 23 14 17 14" />
                      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                    </svg>
                  </button>
                  <button
                    className="action-btn btn-delete"
                    title="Hapus"
                    onClick={() => handleDelete(data.id)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="list-view">
          {filteredData.map((data) => (
            <div key={data.id} className="list-item">
              <div
                className="list-avatar"
                style={{ background: data.color }}
              >
                {data.nama.charAt(0)}
              </div>
              <div className="list-content">
                <h3 className="list-name">{data.nama}</h3>
                <div className="list-meta">
                  <span>
                    {data.jenisKelamin === "Laki-laki" ? "👦" : "👧"}{" "}
                    {data.jenisKelamin}
                  </span>
                  <span>•</span>
                  <span>📍 {data.posyandu}</span>
                  <span>•</span>
                  <span>{hitungUmur(data.tanggalLahir)}</span>
                </div>
              </div>
              <div className="list-stats">
                <div className="list-stat">
                  <span className="list-stat-label">Berat</span>
                  <span className="list-stat-value">
                    {data.beratBadan} kg
                  </span>
                </div>
                <div className="list-stat">
                  <span className="list-stat-label">Tinggi</span>
                  <span className="list-stat-value">
                    {data.tinggiBadan} cm
                  </span>
                </div>
                <div className="list-stat">
                  <span className="list-stat-label">Pengukuran</span>
                  <span className="list-stat-value">
                    {data.pengukuranKe}/12
                  </span>
                </div>
              </div>
              <span
                className={`status-badge ${
                  data.statusGizi === "Normal" ? "normal" : "resiko"
                }`}
              >
                {data.statusGizi}
              </span>
              <div className="list-actions">
                <button
                  className="list-action-btn"
                  onClick={() => handleViewDetail(data.id)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
                <button
                  className="list-action-btn"
                  onClick={() => handleEdit(data.id)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  className="list-action-btn"
                  onClick={() => handleToggleStatus(data.id)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="1 4 1 10 7 10" />
                    <polyline points="23 20 23 14 17 14" />
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                  </svg>
                </button>
                <button
                  className="list-action-btn btn-delete"
                  onClick={() => handleDelete(data.id)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KelolaDataBalita;