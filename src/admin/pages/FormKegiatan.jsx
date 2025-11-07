import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/admin/FormKegiatan.css";

const FormKegiatan = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nama: "",
    posyandu: "",
    tanggal: "",
    waktu: "",
    penjelasan: "",
    status: "belum selesai",
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Load data jika mode edit
  useEffect(() => {
    if (id) {
      // Simulasi fetch data
      const mockData = {
        nama: "Imunisasi Anak Batch 1",
        posyandu: "Posyandu Anggrek",
        tanggal: "2025-07-25",
        waktu: "15:00",
        penjelasan: "Memberikan imunisasi anti stunting untuk anak usia 0-5 tahun.",
        status: "belum selesai",
      };
      setFormData(mockData);
      setCharCount(mockData.penjelasan.length);
    }
  }, [id]);

  // Calculate progress
  useEffect(() => {
    const fields = ["nama", "posyandu", "tanggal", "waktu", "penjelasan"];
    const filled = fields.filter((field) => formData[field]?.trim()).length;
    const percentage = (filled / fields.length) * 100;
    setProgress(percentage);
  }, [formData]);

  const validate = () => {
    const newErrors = {};

    if (!formData.nama?.trim()) {
      newErrors.nama = "Nama kegiatan wajib diisi";
    } else if (formData.nama.length < 5) {
      newErrors.nama = "Nama kegiatan minimal 5 karakter";
    }

    if (!formData.posyandu?.trim()) {
      newErrors.posyandu = "Posyandu wajib diisi";
    }

    if (!formData.tanggal) {
      newErrors.tanggal = "Tanggal wajib diisi";
    }

    if (!formData.waktu) {
      newErrors.waktu = "Waktu wajib diisi";
    }

    if (!formData.penjelasan?.trim()) {
      newErrors.penjelasan = "Penjelasan wajib diisi";
    } else if (formData.penjelasan.length < 10) {
      newErrors.penjelasan = "Penjelasan minimal 10 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "penjelasan") {
      setCharCount(value.length);
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSaving(true);

      setTimeout(() => {
        console.log("Saving data:", formData);
        navigate("/admin/kelola-kegiatan");
      }, 1500);
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleCancel = () => {
    if (
      progress > 0 &&
      !window.confirm(
        "Apakah Anda yakin ingin membatalkan? Data yang diisi akan hilang."
      )
    ) {
      return;
    }
    navigate("/admin/kelola-kegiatan");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="form-kegiatan-page">
      <div className="form-container">
        {/* Header Navigation */}
        <div className="form-nav">
          <button onClick={handleCancel} className="back-button">
            <span className="back-icon">←</span>
            <span>Kembali</span>
          </button>
          <div className="form-breadcrumb">
            <span className="breadcrumb-item">Kelola Kegiatan</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item active">
              {id ? "Edit Kegiatan" : "Tambah Kegiatan"}
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="form-header">
          <div className="form-header-content">
            <div className="form-header-icon">
              <span>{id ? "✏️" : "➕"}</span>
            </div>
            <div className="form-header-text">
              <h1>{id ? "Edit Data Kegiatan" : "Tambah Kegiatan Baru"}</h1>
              <p>
                {id
                  ? "Perbarui informasi kegiatan dengan data yang akurat"
                  : "Lengkapi formulir untuk menambahkan kegiatan posyandu"}
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="progress-card">
            <div className="progress-info">
              <span className="progress-label">Progress Pengisian</span>
              <span className="progress-percentage">{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar-wrapper">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              >
                <div className="progress-shimmer"></div>
              </div>
            </div>
            <div className="progress-steps">
              <div className={`step ${formData.nama ? "completed" : ""}`}>
                <span className="step-icon">
                  {formData.nama ? "✓" : "1"}
                </span>
                <span className="step-label">Nama</span>
              </div>
              <div className={`step ${formData.posyandu ? "completed" : ""}`}>
                <span className="step-icon">
                  {formData.posyandu ? "✓" : "2"}
                </span>
                <span className="step-label">Posyandu</span>
              </div>
              <div className={`step ${formData.tanggal && formData.waktu ? "completed" : ""}`}>
                <span className="step-icon">
                  {formData.tanggal && formData.waktu ? "✓" : "3"}
                </span>
                <span className="step-label">Jadwal</span>
              </div>
              <div className={`step ${formData.penjelasan ? "completed" : ""}`}>
                <span className="step-icon">
                  {formData.penjelasan ? "✓" : "4"}
                </span>
                <span className="step-label">Detail</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Section: Informasi Dasar */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon-wrapper">
                <span className="section-icon">📋</span>
              </div>
              <div className="section-title-wrapper">
                <h2 className="section-title">Informasi Dasar</h2>
                <p className="section-subtitle">
                  Data utama kegiatan posyandu
                </p>
              </div>
            </div>

            <div className="section-body">
              {/* Nama Kegiatan */}
              <div className="form-group">
                <label htmlFor="nama" className="form-label">
                  <span className="label-text">Nama Kegiatan</span>
                  <span className="required-mark">*</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">📝</span>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className={`form-input ${errors.nama ? "error" : ""} ${
                      formData.nama ? "filled" : ""
                    }`}
                    placeholder="Contoh: Imunisasi Anak Batch 1"
                    maxLength={100}
                  />
                  {formData.nama && (
                    <span className="input-check">✓</span>
                  )}
                </div>
                {errors.nama && (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <span>{errors.nama}</span>
                  </div>
                )}
              </div>

              {/* Posyandu */}
              <div className="form-group">
                <label htmlFor="posyandu" className="form-label">
                  <span className="label-text">Nama Posyandu</span>
                  <span className="required-mark">*</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">🏥</span>
                  <input
                    type="text"
                    id="posyandu"
                    name="posyandu"
                    value={formData.posyandu}
                    onChange={handleChange}
                    className={`form-input ${errors.posyandu ? "error" : ""} ${
                      formData.posyandu ? "filled" : ""
                    }`}
                    placeholder="Contoh: Posyandu Anggrek"
                    maxLength={100}
                  />
                  {formData.posyandu && (
                    <span className="input-check">✓</span>
                  )}
                </div>
                {errors.posyandu && (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <span>{errors.posyandu}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section: Jadwal Kegiatan */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon-wrapper">
                <span className="section-icon">📅</span>
              </div>
              <div className="section-title-wrapper">
                <h2 className="section-title">Jadwal Kegiatan</h2>
                <p className="section-subtitle">
                  Tentukan tanggal dan waktu pelaksanaan
                </p>
              </div>
            </div>

            <div className="section-body">
              <div className="form-row">
                {/* Tanggal */}
                <div className="form-group">
                  <label htmlFor="tanggal" className="form-label">
                    <span className="label-text">Tanggal</span>
                    <span className="required-mark">*</span>
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">📆</span>
                    <input
                      type="date"
                      id="tanggal"
                      name="tanggal"
                      value={formData.tanggal}
                      onChange={handleChange}
                      className={`form-input date-input ${
                        errors.tanggal ? "error" : ""
                      } ${formData.tanggal ? "filled" : ""}`}
                    />
                    {formData.tanggal && (
                      <span className="input-check">✓</span>
                    )}
                  </div>
                  {formData.tanggal && (
                    <div className="date-preview">
                      <span className="preview-icon">📍</span>
                      <span className="preview-text">
                        {formatDate(formData.tanggal)}
                      </span>
                    </div>
                  )}
                  {errors.tanggal && (
                    <div className="error-message">
                      <span className="error-icon">⚠️</span>
                      <span>{errors.tanggal}</span>
                    </div>
                  )}
                </div>

                {/* Waktu */}
                <div className="form-group">
                  <label htmlFor="waktu" className="form-label">
                    <span className="label-text">Waktu</span>
                    <span className="required-mark">*</span>
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">🕐</span>
                    <input
                      type="time"
                      id="waktu"
                      name="waktu"
                      value={formData.waktu}
                      onChange={handleChange}
                      className={`form-input time-input ${
                        errors.waktu ? "error" : ""
                      } ${formData.waktu ? "filled" : ""}`}
                    />
                    {formData.waktu && (
                      <span className="input-check">✓</span>
                    )}
                  </div>
                  {errors.waktu && (
                    <div className="error-message">
                      <span className="error-icon">⚠️</span>
                      <span>{errors.waktu}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Detail Kegiatan */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon-wrapper">
                <span className="section-icon">📄</span>
              </div>
              <div className="section-title-wrapper">
                <h2 className="section-title">Detail Kegiatan</h2>
                <p className="section-subtitle">
                  Jelaskan informasi lengkap tentang kegiatan
                </p>
              </div>
            </div>

            <div className="section-body">
              <div className="form-group">
                <label htmlFor="penjelasan" className="form-label">
                  <span className="label-text">Penjelasan Kegiatan</span>
                  <span className="required-mark">*</span>
                </label>
                <div className="textarea-wrapper">
                  <textarea
                    id="penjelasan"
                    name="penjelasan"
                    value={formData.penjelasan}
                    onChange={handleChange}
                    className={`form-textarea ${errors.penjelasan ? "error" : ""} ${
                      formData.penjelasan ? "filled" : ""
                    }`}
                    placeholder="Jelaskan tujuan, sasaran, dan detail pelaksanaan kegiatan..."
                    maxLength={500}
                  ></textarea>
                  <div className="char-counter">
                    <div className="counter-bar">
                      <div
                        className="counter-fill"
                        style={{ width: `${(charCount / 500) * 100}%` }}
                      ></div>
                    </div>
                    <span
                      className={`counter-text ${
                        charCount > 450 ? "warning" : ""
                      }`}
                    >
                      {charCount} / 500 karakter
                    </span>
                  </div>
                </div>
                {errors.penjelasan && (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <span>{errors.penjelasan}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-cancel"
              disabled={isSaving}
            >
              <span className="btn-icon">✕</span>
              <span>Batal</span>
            </button>
            <button
              type="submit"
              className="btn btn-submit"
              disabled={isSaving || progress < 100}
            >
              {isSaving ? (
                <>
                  <span className="spinner"></span>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <span className="btn-icon">✓</span>
                  <span>{id ? "Perbarui Kegiatan" : "Simpan Kegiatan"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormKegiatan;