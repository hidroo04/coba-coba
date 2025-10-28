import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FormBalita.css";

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
  switch(name) {
    case 'nama':
      return value.length < 3 ? 'Nama minimal 3 karakter' : '';
    case 'beratBadan':
      return value < 2 || value > 30 ? 'Berat badan harus antara 2-30 kg' : '';
    case 'tinggiBadan':
      return value < 40 || value > 120 ? 'Tinggi badan harus antara 40-120 cm' : '';
    case 'pengukuranKe':
      return value < 1 ? 'Pengukuran minimal ke-1' : '';
    default:
      return '';
  }
};

// --- SIMULASI: Ganti dengan API Call nyata ---
const findBalitaById = (id) => {
  const mockDataBalita = [
    { id: 1, nama: "Budi Santoso", tanggalLahir: "2023-05-20", pengukuranKe: 3, namaOrtu: "Santi Dewi", tinggiBadan: 75.5, beratBadan: 10.2, posyandu: "Anggrek" },
    { id: 2, nama: "Alya Putri", tanggalLahir: "2024-01-10", pengukuranKe: 2, namaOrtu: "Rudi Hartono", tinggiBadan: 68.0, beratBadan: 8.5, posyandu: "Mawar" },
  ];
  return mockDataBalita.find(d => d.id === parseInt(id));
};

const FormBalita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nama: '', tanggalLahir: '', namaOrtu: '', beratBadan: '',
    tinggiBadan: '', pengukuranKe: '', posyandu: 'Anggrek'
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
        navigate('/admin/kelola-data-balita');
      }
    }
    setIsLoading(false);
  }, [id, isEditing, navigate]);

  const umurTerkini = useMemo(() => {
    return hitungUmur(formData.tanggalLahir);
  }, [formData.tanggalLahir]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' || name === 'tinggiBadan' || name === 'beratBadan' || name === 'pengukuranKe'
      ? parseFloat(value) || value
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Real-time validation
    if (touched[name]) {
      const error = validateField(name, finalValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (!formData.nama || !formData.tanggalLahir) {
      alert("Nama dan Tanggal Lahir wajib diisi!");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    // Simulate API call
    setIsSaving(true);
    setTimeout(() => {
      console.log(isEditing ? "Update Data:" : "Tambah Data:", { ...formData, umur: umurTerkini });
      setIsSaving(false);
      
      alert(isEditing 
        ? `Data ${formData.nama} berhasil diubah!`
        : `Data ${formData.nama} berhasil ditambahkan!`
      );
      
      navigate('/admin/kelola-data-balita');
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
          
          {/* Informasi Anak */}
          <div className="form-section-simple">
            <h3 className="section-title-simple">Informasi Anak</h3>
            
            <div className="form-group-page">
              <label>Nama Anak <span className="required-mark">*</span></label>
              <input
                type="text"
                name="nama"
                value={formData.nama || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.nama && touched.nama ? 'input-error-simple' : ''}
                placeholder="Masukkan nama lengkap anak"
                required
              />
              {errors.nama && touched.nama && (
                <span className="error-text-simple">{errors.nama}</span>
              )}
            </div>

            <div className="form-row-simple">
              <div className="form-group-page">
                <label>Tanggal Lahir <span className="required-mark">*</span></label>
                <input
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group-page">
                <label>Umur (Otomatis)</label>
                <input
                  type="text"
                  value={umurTerkini}
                  readOnly
                  className="input-readonly-simple"
                />
              </div>
            </div>
          </div>

          {/* Informasi Orang Tua */}
          <div className="form-section-simple">
            <h3 className="section-title-simple">Informasi Orang Tua</h3>
            
            <div className="form-group-page">
              <label>Nama Orang Tua <span className="required-mark">*</span></label>
              <input
                type="text"
                name="namaOrtu"
                value={formData.namaOrtu || ''}
                onChange={handleChange}
                placeholder="Masukkan nama orang tua/wali"
                required
              />
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

          {/* Data Pengukuran */}
          <div className="form-section-simple">
            <h3 className="section-title-simple">Data Pengukuran</h3>
            
            <div className="form-row-simple">
              <div className="form-group-page">
                <label>Berat Badan (kg) <span className="required-mark">*</span></label>
                <input
                  type="number"
                  name="beratBadan"
                  value={formData.beratBadan || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  step="0.1"
                  placeholder="0.0"
                  className={errors.beratBadan && touched.beratBadan ? 'input-error-simple' : ''}
                  required
                />
                {errors.beratBadan && touched.beratBadan && (
                  <span className="error-text-simple">{errors.beratBadan}</span>
                )}
              </div>

              <div className="form-group-page">
                <label>Tinggi Badan (cm) <span className="required-mark">*</span></label>
                <input
                  type="number"
                  name="tinggiBadan"
                  value={formData.tinggiBadan || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  step="0.1"
                  placeholder="0.0"
                  className={errors.tinggiBadan && touched.tinggiBadan ? 'input-error-simple' : ''}
                  required
                />
                {errors.tinggiBadan && touched.tinggiBadan && (
                  <span className="error-text-simple">{errors.tinggiBadan}</span>
                )}
              </div>
            </div>

            <div className="form-group-page">
              <label>Pengukuran Ke- <span className="required-mark">*</span></label>
              <input
                type="number"
                name="pengukuranKe"
                value={formData.pengukuranKe || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                min="1"
                placeholder="1"
                className={errors.pengukuranKe && touched.pengukuranKe ? 'input-error-simple' : ''}
                required
              />
              {errors.pengukuranKe && touched.pengukuranKe && (
                <span className="error-text-simple">{errors.pengukuranKe}</span>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions-page">
            <button
              type="button"
              onClick={() => navigate('/admin/kelola-data-balita')}
              className="btn-kembali"
              disabled={isSaving}
            >
              Kembali
            </button>
            <button
              type="submit"
              className="btn-tambah"
              disabled={isSaving}
            >
              {isSaving ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Data')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormBalita;