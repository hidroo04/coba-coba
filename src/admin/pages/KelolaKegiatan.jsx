import React, { useState, useMemo } from "react"; // <--- useEffect DIHAPUS DARI SINI
import "../../styles/admin/KelolaKegiatan.css";
import FormKegiatan from "./FormKegiatan";

const mockKegiatanData = [
  {
    id: 1,
    nama: "Imunisasi Anak Batch 1",
    posyandu: "Anggrek",
    waktu: "2025-07-25T15:00",
    penjelasan: "Memberikan imunisasi anti stunting.",
    status: "selesai",
  },
  {
    id: 2,
    nama: "Imunisasi Anak Batch 2",
    posyandu: "Mawar",
    waktu: "2025-08-14T08:00",
    penjelasan: "Imunisasi Batch 2 di Balai Desa.",
    status: "belum selesai",
  },
  {
    id: 3,
    nama: "Edukasi Kesehatan Ibu",
    posyandu: "Anggrek",
    waktu: "2025-09-01T10:00",
    penjelasan: "Pentingnya gizi seimbang.",
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
      k.posyandu.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, kegiatanList]);

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
    <div className="kelola-container" data-aos="fade-in">
      <div className="kelola-header">
        <h1>Kelola Kegiatan</h1>
        <button onClick={() => handleOpenModal()} className="btn-tambah">
          + Tambah Kegiatan
        </button>
      </div>

      <div className="filter-wrapper">
        <input
          type="text"
          placeholder="Cari berdasarkan nama posyandu..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="kegiatan-list-admin">
        {filteredKegiatan.map((kegiatan) => (
          <div
            key={kegiatan.id}
            className="kegiatan-card-admin"
            data-aos="fade-up"
          >
            <div className="kegiatan-card-header">
              <h3>{kegiatan.nama}</h3>
              <span
                className={`status-badge ${
                  kegiatan.status === "selesai" ? "selesai" : "belum"
                }`}
              >
                {kegiatan.status}
              </span>
            </div>
            <p className="posyandu-info">
              <strong>Posyandu:</strong> {kegiatan.posyandu}
            </p>
            <p className="waktu-info">
              <strong>Waktu:</strong>{" "}
              {new Date(kegiatan.waktu).toLocaleString("id-ID")}
            </p>
            <p className="penjelasan-info">{kegiatan.penjelasan}</p>
            <div className="kegiatan-card-actions">
              <button
                onClick={() => handleToggleStatus(kegiatan.id)}
                className="btn-status"
              >
                {kegiatan.status === "selesai"
                  ? "Tandai Belum Selesai"
                  : "Tandai Selesai"}
              </button>
              <button
                onClick={() => handleOpenModal(kegiatan)}
                className="btn-edit"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(kegiatan.id)}
                className="btn-hapus"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

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
