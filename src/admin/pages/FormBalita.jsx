import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/admin/FormBalita.css";

const hitungUmur = (tanggalLahir) => {
  if (!tanggalLahir) return { tahun: 0, bulan: 0 };
  const tglLahir = new Date(tanggalLahir);
  const hariIni = new Date();
  let tahun = hariIni.getFullYear() - tglLahir.getFullYear();
  let bulan = hariIni.getMonth() - tglLahir.getMonth();

  if (bulan < 0 || (bulan === 0 && hariIni.getDate() < tglLahir.getDate())) {
    tahun--;
    bulan += 12;
  }
  return { tahun, bulan };
};

const validateField = (name, value) => {
  if (!value && value !== 0) return "Wajib diisi";
  switch (name) {
    case "nama":
      return value.length < 3 ? "Nama minimal 3 karakter" : "";
    case "beratBadan":
      return value < 1 || value > 50 ? "Berat harus antara 1-50 kg" : "";
    case "tinggiBadan":
      return value < 40 || value > 150 ? "Tinggi harus antara 40-150 cm" : "";
    case "pengukuranKe":
      return value < 1 ? "Pengukuran minimal ke-1" : "";
    case "jenisKelamin":
      return value === "" ? "Pilih jenis kelamin" : "";
    case "namaOrtu":
      return value.length < 3 ? "Nama minimal 3 karakter" : "";
    default:
      return "";
  }
};

const findBalitaById = (id) => {
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
    jenisKelamin: "",
    tanggalLahir: "",
    namaOrtu: "",
    beratBadan: "",
    tinggiBadan: "",
    pengukuranKe: "",
    posyandu: "Anggrek",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      // Simulasi loading
      setTimeout(() => {
        const data = findBalitaById(id);
        if (data) {
          setFormData({
            nama: data.nama,
            jenisKelamin: data.jenisKelamin,
            tanggalLahir: data.tanggalLahir,
            namaOrtu: data.namaOrtu,
            beratBadan: data.beratBadan,
            tinggiBadan: data.tinggiBadan,
            pengukuranKe: data.pengukuranKe,
            posyandu: data.posyandu,
          });
        } else {
          alert("Data Balita tidak ditemukan!");
          navigate("/admin/kelola-data-balita");
        }
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(false);
    }
  }, [id, isEditing, navigate]);

  const umurInfo = useMemo(
    () => hitungUmur(formData.tanggalLahir),
    [formData.tanggalLahir]
  );

  const formProgress = useMemo(() => {
    const fields = [
      "nama",
      "jenisKelamin",
      "tanggalLahir",
      "namaOrtu",
      "beratBadan",
      "tinggiBadan",
      "pengukuranKe",
    ];
    const filled = fields.filter(
      (f) => formData[f] && !validateField(f, formData[f])
    ).length;
    return Math.round((filled / fields.length) * 100);
  }, [formData]);

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
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      console.log(isEditing ? "Update Data:" : "Tambah Data:", {
        ...formData,
        umur: `${umurInfo.tahun} tahun ${umurInfo.bulan} bulan`,
      });
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/admin/kelola-data-balita");
      }, 2000);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="form-balita-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-balita-container">
      <div className="form-balita-content">
        {/* Header dengan Progress */}
        <div className="form-header">
          <div className="header-top">
            <button
              className="back-button"
              type="button"
              onClick={() => navigate("/admin/kelola-data-balita")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="form-title">
                {isEditing ? "Edit Data Balita" : "Tambah Data Balita Baru"}
              </h1>
              <p className="form-subtitle">
                {isEditing
                  ? "Perbarui informasi balita"
                  : "Isi formulir dengan lengkap dan akurat"}
              </p>
            </div>
          </div>

          <div className="progress-card">
            <div className="progress-header">
              <span className="progress-label">Progress Pengisian</span>
              <span className="progress-percent">{formProgress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${formProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="success-alert">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#4CAF50" />
              <path
                d="M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>Data berhasil disimpan!</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="balita-form">
          {/* Informasi Anak Card */}
          <div className="form-card">
            <div className="card-header">
              <div className="icon-wrapper">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 className="card-title">Informasi Anak</h2>
            </div>

            <div className="card-content">
              <div className="form-group">
                <label className="form-label">
                  Nama Anak <span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${
                    errors.nama && touched.nama ? "input-error" : ""
                  }`}
                  placeholder="Masukkan nama lengkap anak"
                />
                {errors.nama && touched.nama && (
                  <span className="error-text">{errors.nama}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Jenis Kelamin <span className="required-mark">*</span>
                  </label>
                  <div className="radio-group">
                    <label
                      className={`radio-label ${
                        formData.jenisKelamin === "Laki-laki" ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="jenisKelamin"
                        value="Laki-laki"
                        checked={formData.jenisKelamin === "Laki-laki"}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="radio-text">👦 Laki-laki</span>
                    </label>
                    <label
                      className={`radio-label ${
                        formData.jenisKelamin === "Perempuan" ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="jenisKelamin"
                        value="Perempuan"
                        checked={formData.jenisKelamin === "Perempuan"}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="radio-text">👧 Perempuan</span>
                    </label>
                  </div>
                  {errors.jenisKelamin && touched.jenisKelamin && (
                    <span className="error-text">{errors.jenisKelamin}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Tanggal Lahir <span className="required-mark">*</span>
                  </label>
                  <input
                    type="date"
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input ${
                      errors.tanggalLahir && touched.tanggalLahir
                        ? "input-error"
                        : ""
                    }`}
                  />
                  {errors.tanggalLahir && touched.tanggalLahir && (
                    <span className="error-text">{errors.tanggalLahir}</span>
                  )}
                </div>
              </div>

              {formData.tanggalLahir && (
                <div className="age-display">
                  <div className="age-badge">
                    <span className="age-number">{umurInfo.tahun}</span>
                    <span className="age-label">Tahun</span>
                  </div>
                  <div className="age-badge">
                    <span className="age-number">{umurInfo.bulan}</span>
                    <span className="age-label">Bulan</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Informasi Orang Tua Card */}
          <div className="form-card">
            <div className="card-header">
              <div className="icon-wrapper">
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
              <h2 className="card-title">Informasi Orang Tua</h2>
            </div>

            <div className="card-content">
              <div className="form-group">
                <label className="form-label">
                  Nama Orang Tua/Wali <span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  name="namaOrtu"
                  value={formData.namaOrtu}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${
                    errors.namaOrtu && touched.namaOrtu ? "input-error" : ""
                  }`}
                  placeholder="Masukkan nama orang tua/wali"
                />
                {errors.namaOrtu && touched.namaOrtu && (
                  <span className="error-text">{errors.namaOrtu}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Posyandu</label>
                <select
                  name="posyandu"
                  value={formData.posyandu}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Anggrek">🌸 Posyandu Anggrek</option>
                  <option value="Mawar">🌹 Posyandu Mawar</option>
                  <option value="Melati">🤍 Posyandu Melati</option>
                  <option value="Dahlia">🌺 Posyandu Dahlia</option>
                  <option value="Kenanga">🌼 Posyandu Kenanga</option>
                  <option value="Tulip">🌷 Posyandu Tulip</option>
                  <option value="Teratai">💮 Posyandu Teratai</option>
                  <option value="Kamboja">🏵️ Posyandu Kamboja</option>
                  <option value="Flamboyan">🌻 Posyandu Flamboyan</option>
                  <option value="Cempaka">🌾 Posyandu Cempaka</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Pengukuran Card */}
          <div className="form-card">
            <div className="card-header">
              <div className="icon-wrapper">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h2 className="card-title">Data Pengukuran</h2>
            </div>

            <div className="card-content">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Berat Badan <span className="required-mark">*</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      type="number"
                      name="beratBadan"
                      value={formData.beratBadan}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      step="0.1"
                      className={`form-input ${
                        errors.beratBadan && touched.beratBadan
                          ? "input-error"
                          : ""
                      }`}
                      placeholder="8.5"
                    />
                    <span className="input-icon">kg</span>
                  </div>
                  {errors.beratBadan && touched.beratBadan && (
                    <span className="error-text">{errors.beratBadan}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Tinggi Badan <span className="required-mark">*</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      type="number"
                      name="tinggiBadan"
                      value={formData.tinggiBadan}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      step="0.1"
                      className={`form-input ${
                        errors.tinggiBadan && touched.tinggiBadan
                          ? "input-error"
                          : ""
                      }`}
                      placeholder="75.5"
                    />
                    <span className="input-icon">cm</span>
                  </div>
                  {errors.tinggiBadan && touched.tinggiBadan && (
                    <span className="error-text">{errors.tinggiBadan}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Pengukuran Ke- <span className="required-mark">*</span>
                </label>
                <input
                  type="number"
                  name="pengukuranKe"
                  value={formData.pengukuranKe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="1"
                  className={`form-input ${
                    errors.pengukuranKe && touched.pengukuranKe
                      ? "input-error"
                      : ""
                  }`}
                  placeholder="1"
                />
                {errors.pengukuranKe && touched.pengukuranKe && (
                  <span className="error-text">{errors.pengukuranKe}</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              disabled={isSaving}
              onClick={() => navigate("/admin/kelola-data-balita")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={isSaving || formProgress < 100}
            >
              {isSaving ? (
                <>
                  <div className="spinner-small"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  {isEditing ? "Simpan Perubahan" : "Simpan Data"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormBalita;