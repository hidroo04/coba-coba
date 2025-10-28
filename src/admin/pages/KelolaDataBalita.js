import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./KelolaDataBalita.css"; 

// --- Helper: Hitung Umur ---
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

// --- Simulasi Data Balita ---
const mockDataBalita = [
  {
    id: 1,
    nama: "Budi Santoso",
    tanggalLahir: "2023-05-20",
    umur: hitungUmur("2023-05-20"),
    pengukuranKe: 3,
    namaOrtu: "Santi Dewi",
    tinggiBadan: 75.5,
    beratBadan: 10.2,
    posyandu: "Anggrek",
    statusGizi: "Normal",
  },
  {
    id: 2,
    nama: "Alya Putri",
    tanggalLahir: "2024-01-10",
    umur: hitungUmur("2024-01-10"),
    pengukuranKe: 2,
    namaOrtu: "Rudi Hartono",
    tinggiBadan: 68.0,
    beratBadan: 8.5,
    posyandu: "Mawar",
    statusGizi: "Resiko Stunting",
  },
];

const KelolaDataBalita = () => {
  const [dataBalitaList, setDataBalitaList] = useState(mockDataBalita);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const filteredData = useMemo(() => {
    if (!filter) return dataBalitaList;
    return dataBalitaList.filter((d) =>
      d.nama.toLowerCase().includes(filter.toLowerCase()) ||
      d.namaOrtu.toLowerCase().includes(filter.toLowerCase()) ||
      d.posyandu.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, dataBalitaList]);

  // Fungsi navigasi ke halaman Tambah
  const handleAdd = () => {
    console.log("Navigate to: /admin/balita/tambah");
    navigate("/admin/balita/tambah");
  };

  // Fungsi navigasi ke halaman Edit
  const handleEdit = (id) => {
    console.log("Navigate to edit, ID:", id);
    navigate(`/admin/balita/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data balita ini?")) {
      setDataBalitaList(dataBalitaList.filter((d) => d.id !== id));
      alert(`Data Balita ID ${id} telah dihapus.`);
    }
  };
  
  // Fungsi simulasi toggle status gizi
  const handleToggleStatus = (id) => {
    setDataBalitaList(
      dataBalitaList.map((d) =>
        d.id === id
          ? {
              ...d,
              statusGizi: d.statusGizi === "Normal" ? "Resiko Stunting" : "Normal",
            }
          : d
      )
    );
  };

  return (
    <div className="kelola-container" data-aos="fade-in">
      <div className="kelola-header">
        <h1>Kelola Data Balita</h1>
        <button onClick={handleAdd} className="btn-tambah">
          + Tambah Data Balita
        </button>
      </div>

      <div className="filter-wrapper">
        <input
          type="text"
          placeholder="Cari berdasarkan nama balita/orang tua/posyandu..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="data-balita-list-admin">
        {filteredData.map((data) => (
          <div
            key={data.id}
            className="data-balita-card-admin"
            data-aos="fade-up"
          >
            <div className="data-balita-card-header">
              <h3>{data.nama}</h3>
              <span
                className={`status-badge ${
                  data.statusGizi === "Normal" ? "normal" : "resiko"
                }`}
              >
                {data.statusGizi}
              </span>
            </div>
            
            <p className="posyandu-info">
              <strong>Posyandu:</strong> {data.posyandu}
            </p>
            <p className="ttl-info">
              <strong>Tgl Lahir:</strong> {new Date(data.tanggalLahir).toLocaleDateString('id-ID')} ({data.umur})
            </p>
            <p className="pengukuran-info">
              Pengukuran ke-{data.pengukuranKe}: {data.beratBadan} kg / {data.tinggiBadan} cm
            </p>

            <div className="data-balita-card-actions">
              <button
                onClick={() => handleToggleStatus(data.id)}
                className="btn-status"
              >
                {data.statusGizi === "Normal"
                  ? "Tandai Resiko"
                  : "Tandai Normal"}
              </button>
              <button
                onClick={() => handleEdit(data.id)}
                className="btn-edit"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(data.id)}
                className="btn-hapus"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
        
        {filteredData.length === 0 && (
          <p className="no-data-message">Tidak ada data balita yang ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default KelolaDataBalita;