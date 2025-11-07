import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/admin/FormKegiatan.css";

const FormKegiatan = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Untuk edit mode
  
  const [formData, setFormData] = useState({
    nama: "",
    tempatKegiatan: "",
    waktu: "",
    penjelasan: "",
    status: "belum selesai",
  });
  
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [progress, setProgress] = useState(0);

  // Load data jika mode edit
  useEffect(() => {
    if (id) {
      // Simulasi fetch data - ganti dengan API call
      // const data = fetchKegiatanById(id);
      // setFormData(data);
    }
  }, [id]);

  // Calculate progress
  useEffect(() => {
    const fields = ["nama", "tempatKegiatan", "waktu", "penjelasan"];
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
    
    if (!formData.tempatKegiatan?.trim()) {
      newErrors.tempatKegiatan = "Tempat kegiatan wajib diisi";
    }
    
    if (!formData.waktu) {
      newErrors.waktu = "Tanggal dan waktu wajib diisi";
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
      
      // Simulasi API call
      setTimeout(() => {
        // Save data here
        console.log("Saving data:", formData);
        
        // Redirect back to list
        navigate("/admin/kelola-kegiatan");
      }, 1500);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Apakah Anda yakin ingin membatalkan? Data yang diisi akan hilang.")) {
      navigate("/admin/kelola-kegiatan");
    }
  };

  return (
    <div className="form-kegiatan-page">
      <div className="form-container">
        {/* Back Button */}
        <button onClick={handleCancel} className="back-button">
          ← Kembali
        </button>

        {/* Header */}
        <div className="form-page-header">
          <h1>{id ? "Edit Data Kegiatan" : "Tambah Data Kegiatan Baru"}</h1>
          <p>Isi formulir dengan lengkap dan akurat</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-label">
            <span>Progress Pengisian</span>
            <span className="progress-percentage">{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Section 1: Informasi Kegiatan */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-icon">📋</div>
              <h2 className="section-title">Informasi Kegiatan</h2>
            </div>
            <div className="section-body">
              {/* Nama Kegiatan */}
              <div className="form-group">
                <label htmlFor="nama" className="form-label">
                  Nama Kegiatan
                  <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className={`form-input ${errors.nama ? "error" : ""}`}
                  placeholder="Masukkan nama kegiatan"
                  maxLength={100}
                />
                {errors.nama && (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {errors.nama}
                  </div>
                )}
              </div>

              {/* Row: Tempat Kegiatan & Waktu */}
              <div className="form-row">
                {/* Tempat Kegiatan */}
                <div className="form-group">
                  <label htmlFor="tempatKegiatan" className="form-label">
                    Tempat Kegiatan
                    <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="tempatKegiatan"
                    name="tempatKegiatan"
                    value={formData.tempatKegiatan}
                    onChange={handleChange}
                    className={`form-input ${errors.tempatKegiatan ? "error" : ""}`}
                    placeholder="Contoh: Posyandu Anggrek"
                    maxLength={100}
                  />
                  {errors.tempatKegiatan && (
                    <div className="error-message">
                      <span className="error-icon">⚠️</span>
                      {errors.tempatKegiatan}
                    </div>
                  )}
                </div>

                {/* Tanggal & Waktu */}
                <div className="form-group">
                  <label htmlFor="waktu" className="form-label">
                    Tanggal & Waktu
                    <span className="required-star">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="waktu"
                    name="waktu"
                    value={formData.waktu}
                    onChange={handleChange}
                    className={`form-input ${errors.waktu ? "error" : ""}`}
                  />
                  {errors.waktu && (
                    <div className="error-message">
                      <span className="error-icon">⚠️</span>
                      {errors.waktu}
                    </div>
                  )}
                </div>
              </div>

              {/* Penjelasan */}
              <div className="form-group">
                <label htmlFor="penjelasan" className="form-label">
                  Penjelasan Singkat
                  <span className="required-star">*</span>
                </label>
                <textarea
                  id="penjelasan"
                  name="penjelasan"
                  value={formData.penjelasan}
                  onChange={handleChange}
                  className={`form-textarea ${errors.penjelasan ? "error" : ""}`}
                  placeholder="Jelaskan detail kegiatan yang akan dilaksanakan..."
                  maxLength={500}
                ></textarea>
                <div className={`char-counter ${charCount > 450 ? "warning" : ""}`}>
                  {charCount}/500 karakter
                </div>
                {errors.penjelasan && (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {errors.penjelasan}
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
              ❌ Batal
            </button>
            <button
              type="submit"
              className="btn btn-submit"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span className="spinner"></span>
                  Menyimpan...
                </>
              ) : (
                <>
                  ✓ Simpan Kegiatan
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