import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../styles/admin/FormKegiatan.css";

// Daftar Pilihan Posyandu
const daftarPosyandu = [
  "Posyandu Anggrek",
  "Posyandu Mawar",
  "Posyandu Melati",
  "Posyandu Dahlia",
  "Posyandu Kenanga",
  "Posyandu Tulip",
  "Posyandu Teratai",
  "Posyandu Kamboja",
  "Posyandu Flamboyan",
  "Posyandu Cempaka",
];

const FormKegiatan = ({ isOpen, onClose, onSave, currentData }) => {
  const [formData, setFormData] = useState(currentData);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Saat membuka form baru, pastikan posyandu kosong
    const initialData = {
      ...currentData,
      posyandu: currentData?.posyandu || "",
    };
    setFormData(initialData);
    setErrors({});
    setIsSaving(false);
  }, [currentData, isOpen]);

  // Nonaktifkan scroll body saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.nama?.trim()) newErrors.nama = "Nama kegiatan wajib diisi.";
    if (!formData.posyandu) newErrors.posyandu = "Posyandu wajib dipilih.";
    if (!formData.waktu) newErrors.waktu = "Tanggal dan waktu wajib diisi.";
    if (!formData.penjelasan?.trim())
      newErrors.penjelasan = "Penjelasan wajib diisi.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSaving(true);
      setTimeout(() => {
        onSave(formData);
        setIsSaving(false);
      }, 1000);
    }
  };

  if (!isOpen) return null;

  // Gunakan portal agar modal menempel langsung ke <body>
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{currentData.id ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}</h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="nama">Nama Kegiatan</label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
              />
              {errors.nama && <span className="error-text">{errors.nama}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="posyandu">Posyandu</label>
              <select
                id="posyandu"
                name="posyandu"
                value={formData.posyandu}
                onChange={handleChange}
              >
                <option value="" disabled>
                  -- Pilih Posyandu --
                </option>
                {daftarPosyandu.map((namaPosyandu) => (
                  <option key={namaPosyandu} value={namaPosyandu}>
                    {namaPosyandu}
                  </option>
                ))}
              </select>
              {errors.posyandu && (
                <span className="error-text">{errors.posyandu}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="waktu">Tanggal & Waktu</label>
              <input
                type="datetime-local"
                id="waktu"
                name="waktu"
                value={formData.waktu}
                onChange={handleChange}
              />
              {errors.waktu && (
                <span className="error-text">{errors.waktu}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="penjelasan">Penjelasan Singkat</label>
              <textarea
                id="penjelasan"
                name="penjelasan"
                value={formData.penjelasan}
                onChange={handleChange}
              ></textarea>
              {errors.penjelasan && (
                <span className="error-text">{errors.penjelasan}</span>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn-batal"
              disabled={isSaving}
            >
              Batal
            </button>
            <button type="submit" className="btn-simpan" disabled={isSaving}>
              {isSaving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default FormKegiatan;
