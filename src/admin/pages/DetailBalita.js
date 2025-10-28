import React, { useRef } from "react"; // 👈 PASTIKAN 'useRef' DI-IMPORT
import { useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./DetailBalita.css";

// ... (kode registrasi ChartJS dan mockDatabase tidak berubah)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const mockDatabaseLengkap = {
  1: {
    id: 1,
    nama: "Budi Santoso",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "2023-05-20",
    namaOrtu: "Santi Dewi",
    posyandu: "Anggrek",
    riwayat: [
      { tanggal: "2023-11-20", berat: 8.5, tinggi: 70, pengukuranKe: 1 },
      { tanggal: "2024-02-21", berat: 9.5, tinggi: 73, pengukuranKe: 2 },
      { tanggal: "2024-05-20", berat: 10.2, tinggi: 75.5, pengukuranKe: 3 },
    ],
  },
  2: {
    id: 2,
    nama: "Alya Putri",
    jenisKelamin: "Perempuan",
    tanggalLahir: "2024-01-10",
    namaOrtu: "Rudi Hartono",
    posyandu: "Mawar",
    riwayat: [
      { tanggal: "2024-04-10", berat: 6.0, tinggi: 62, pengukuranKe: 1 },
      { tanggal: "2024-07-11", berat: 8.5, tinggi: 68, pengukuranKe: 2 },
    ],
  },
};

const DetailBalita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dataAnak = mockDatabaseLengkap[id];

  // ==========================================================
  // BAGIAN 1: BUAT 'REF' UNTUK MENANDAI KONTEN
  // ==========================================================
  const componentToPrintRef = useRef();

  // ==========================================================
  // BAGIAN 2: HUBUNGKAN FUNGSI CETAK DENGAN 'REF'
  // ==========================================================
  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef.current, // <-- Memberitahu library apa yang harus dicetak
    documentTitle: `Data Pertumbuhan - ${dataAnak?.nama || "Anak"}`,
  });

  if (!dataAnak) {
    return (
      <div className="detail-container">
        <h1>Data Tidak Ditemukan</h1>
        <button
          onClick={() => navigate("/admin/kelola-data-balita")}
          className="btn-kembali"
        >
          Kembali
        </button>
      </div>
    );
  }

  // ... (kode chartData dan chartOptions tidak berubah)
  const chartData = {
    labels: dataAnak.riwayat.map((r) =>
      new Date(r.tanggal).toLocaleDateString("id-ID", {
        month: "short",
        year: "numeric",
      })
    ),
    datasets: [
      {
        label: "Berat Badan (kg)",
        data: dataAnak.riwayat.map((r) => r.berat),
        borderColor: "#3498db",
        yAxisID: "y",
      },
      {
        label: "Tinggi Badan (cm)",
        data: dataAnak.riwayat.map((r) => r.tinggi),
        borderColor: "#e74c3c",
        yAxisID: "y1",
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    animation: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Grafik Pertumbuhan Anak" },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: { display: true, text: "Berat Badan (kg)" },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: { display: true, text: "Tinggi Badan (cm)" },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div className="detail-container" data-aos="fade-in">
      <div className="detail-header">
        <h1>Detail Data: {dataAnak.nama}</h1>
        <div className="header-buttons">
          <button onClick={() => navigate(-1)} className="btn-kembali">
            Kembali
          </button>
          <button onClick={handlePrint} className="btn-print">
            Download PDF
          </button>
        </div>
      </div>

      {/* ========================================================== */}
      {/* BAGIAN 3: PASANG 'REF' KE DIV YANG MEMBUNGKUS KONTEN */}
      {/* ========================================================== */}
      <div ref={componentToPrintRef} className="print-area">
        <div className="detail-layout">
          {/* ... (Konten di dalamnya tidak perlu diubah) ... */}
          <div className="detail-card info-card">
            <h3>Informasi Personal</h3>
            <ul>
              <li>
                <strong>Nama:</strong>
                <span>{dataAnak.nama}</span>
              </li>
              <li>
                <strong>Jenis Kelamin:</strong>
                <span>{dataAnak.jenisKelamin}</span>
              </li>
              <li>
                <strong>Tanggal Lahir:</strong>
                <span>
                  {new Date(dataAnak.tanggalLahir).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </li>
              <li>
                <strong>Nama Orang Tua:</strong>
                <span>{dataAnak.namaOrtu}</span>
              </li>
              <li>
                <strong>Posyandu:</strong>
                <span>{dataAnak.posyandu}</span>
              </li>
            </ul>
          </div>
          <div className="detail-card table-card">
            <h3>Riwayat Pengukuran</h3>
            <div className="table-wrapper">
              <table className="history-table">
                {/* ... (isi tabel tidak berubah) ... */}
                <thead>
                  <tr>
                    <th>Pengukuran Ke-</th>
                    <th>Tanggal</th>
                    <th>Berat Badan (kg)</th>
                    <th>Tinggi Badan (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {dataAnak.riwayat.map((item) => (
                    <tr key={item.pengukuranKe}>
                      <td>{item.pengukuranKe}</td>
                      <td>
                        {new Date(item.tanggal).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td>{item.berat}</td>
                      <td>{item.tinggi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="detail-card chart-card">
            <h3>Grafik Pertumbuhan</h3>
            <Line options={chartOptions} data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBalita;
