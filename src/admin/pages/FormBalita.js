import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FormBalita.css";

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

// --- Helper: Validasi Form ---
const validateField = (name, value) => {
  if (!value && value !== 0) return "Wajib diisi"; // Validasi dasar untuk semua field

  switch (name) {
    case "nama":
      return value.length < 3 ? "Nama minimal 3 karakter" : "";
    case "beratBadan":
      return value < 1 || value > 50 ? "Berat harus antara 1-50 kg" : "";
    case "tinggiBadan":
      return value < 40 || value > 150 ? "Tinggi harus antara 40-150 cm" : "";
    case "pengukuranKe":
      return value < 1 ? "Pengukuran minimal ke-1" : "";
    default:
      return "";
  }
};

// --- Simulasi Database ---
const findBalitaById = (id) => {
  const mockDataBalita = [
    {
      id: 1,
      nama: "Budi Santoso",
      tanggalLahir: "2023-05-20",
      pengukuranKe: 3,
      namaOrtu: "Santi Dewi",
      tinggiBadan: 75.5,
      beratBadan: 10.2,
      posyandu: "Anggrek",
    },
    {
      id: 2,
      nama: "Alya Putri",
      tanggalLahir: "2024-01-10",
      pengukuranKe: 2,
      namaOrtu: "Rudi Hartono",
      tinggiBadan: 68.0,
      beratBadan: 8.5,
      posyandu: "Mawar",
    },
  ];
  return mockDataBalita.find((d) => d.id === parseInt(id));
};

const FormBalita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nama: "",
    tanggalLahir: "",
    namaOrtu: "",
    beratBadan: "",
    tinggiBadan: "",
    pengukuranKe: "",
    posyandu: "Anggrek",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const data = findBalitaById(id);
      if (data) {
        const { umur, statusGizi, ...rest } = data;
        setFormData(rest);
      } else {
        alert("Data Balita tidak ditemukan!");
        navigate("/admin/kelola-data-balita");
      }
    }
    setIsLoading(false);
  }, [id, isEditing, navigate]);

  const umurTerkini = useMemo(
    () => hitungUmur(formData.tanggalLahir),
    [formData.tanggalLahir]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
      allTouched[key] = true;
    });

    setErrors(newErrors);
    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      alert("Harap periksa kembali form, masih ada data yang belum valid.");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      console.log(isEditing ? "Update Data:" : "Tambah Data:", {
        ...formData,
        umur: umurTerkini,
      });
      setIsSaving(false);
      alert(
        isEditing
          ? `Data ${formData.nama} berhasil diubah!`
          : `Data ${formData.nama} berhasil ditambahkan!`
      );
      navigate("/admin/kelola-data-balita");
    }, 800);
  };

  if (isLoading && isEditing) {
    return (
      <div className="kelola-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="kelola-container" data-aos="fade-in">
      <div className="balita-form-page">
        <div className="form-header-simple">
          <h1>{isEditing ? "Edit Data Balita" : "Tambah Data Balita Baru"}</h1>
          <p className="form-subtitle-simple">
            {isEditing
              ? "Perbarui informasi balita dengan lengkap"
              : "Isi formulir di bawah untuk menambahkan data balita"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form-balita-simple">
          {/* --- Informasi Anak --- */}
          <div className="form-section-simple">
            <h3 className="section-title-simple">Informasi Anak</h3>
            <div className="form-group-page">
              <label>
                Nama Anak <span className="required-mark">*</span>
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.nama && touched.nama ? "input-error" : ""}
                placeholder="Masukkan nama lengkap anak"
              />
              {errors.nama && touched.nama && (
                <span className="error-text">{errors.nama}</span>
              )}
            </div>
            <div className="form-row-simple">
              <div className="form-group-page">
                <label>
                  Tanggal Lahir <span className="required-mark">*</span>
                </label>
                <input
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.tanggalLahir && touched.tanggalLahir
                      ? "input-error"
                      : ""
                  }
                />
                {errors.tanggalLahir && touched.tanggalLahir && (
                  <span className="error-text">{errors.tanggalLahir}</span>
                )}
              </div>
              <div className="form-group-page">
                <label>Umur (Otomatis)</label>
                <input
                  type="text"
                  value={umurTerkini}
                  readOnly
                  className="input-readonly"
                />
              </div>
            </div>
          </div>

          {/* --- Informasi Orang Tua --- */}
          <div className="form-section-simple">
            <h3 className="section-title-simple">Informasi Orang Tua</h3>
            <div className="form-group-page">
              <label>
                Nama Orang Tua <span className="required-mark">*</span>
              </label>
              <input
                type="text"
                name="namaOrtu"
                value={formData.namaOrtu || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.namaOrtu && touched.namaOrtu ? "input-error" : ""
                }
                placeholder="Masukkan nama orang tua/wali"
              />
              {errors.namaOrtu && touched.namaOrtu && (
                <span className="error-text">{errors.namaOrtu}</span>
              )}
            </div>
            <div className="form-group-page">
              <label>Posyandu</label>
              <select
                name="posyandu"
                value={formData.posyandu}
                onChange={handleChange}
              >
                <option value="Anggrek">Posyandu Anggrek</option>
                <option value="Mawar">Posyandu Mawar</option>
                <option value="Melati">Posyandu Melati</option>
                <option value="Dahlia">Posyandu Dahlia</option>
              </select>
            </div>
          </div>

          {/* --- Data Pengukuran --- */}
          <div className="form-section-simple">
            <h3 className="section-title-simple">Data Pengukuran</h3>
            <div className="form-row-simple">
              <div className="form-group-page">
                <label>
                  Berat Badan (kg) <span className="required-mark">*</span>
                </label>
                <input
                  type="number"
                  name="beratBadan"
                  value={formData.beratBadan || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  step="0.1"
                  placeholder="cth: 8.5"
                  className={
                    errors.beratBadan && touched.beratBadan ? "input-error" : ""
                  }
                />
                {errors.beratBadan && touched.beratBadan && (
                  <span className="error-text">{errors.beratBadan}</span>
                )}
              </div>
              <div className="form-group-page">
                <label>
                  Tinggi Badan (cm) <span className="required-mark">*</span>
                </label>
                <input
                  type="number"
                  name="tinggiBadan"
                  value={formData.tinggiBadan || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  step="0.1"
                  placeholder="cth: 75.5"
                  className={
                    errors.tinggiBadan && touched.tinggiBadan
                      ? "input-error"
                      : ""
                  }
                />
                {errors.tinggiBadan && touched.tinggiBadan && (
                  <span className="error-text">{errors.tinggiBadan}</span>
                )}
              </div>
            </div>
            <div className="form-group-page">
              <label>
                Pengukuran Ke- <span className="required-mark">*</span>
              </label>
              <input
                type="number"
                name="pengukuranKe"
                value={formData.pengukuranKe || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                min="1"
                placeholder="1"
                className={
                  errors.pengukuranKe && touched.pengukuranKe
                    ? "input-error"
                    : ""
                }
              />
              {errors.pengukuranKe && touched.pengukuranKe && (
                <span className="error-text">{errors.pengukuranKe}</span>
              )}
            </div>
          </div>

          {/* --- Tombol Aksi --- */}
          <div className="form-actions-page">
            <button
              type="button"
              onClick={() => navigate("/admin/kelola-data-balita")}
              className="btn-kembali"
              disabled={isSaving}
            >
              Kembali
            </button>
            <button type="submit" className="btn-simpan" disabled={isSaving}>
              {isSaving
                ? "Menyimpan..."
                : isEditing
                ? "Simpan Perubahan"
                : "Tambah Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormBalita;
