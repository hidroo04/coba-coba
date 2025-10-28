import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Impor Komponen Layout Publik
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Impor Halaman Publik
import Home from "./pages/Home";
import Kegiatan from "./pages/Kegiatan";
import Berita from "./pages/Berita";
import DataAnak from "./pages/DataAnak";
import LoginAdmin from "./pages/LoginAdmin";

// Impor Komponen Layout dan Halaman Admin
import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import KelolaKegiatan from "./admin/pages/KelolaKegiatan";
import KelolaDataBalita from "./admin/pages/KelolaDataBalita";
import FormBalita from "./admin/pages/FormBalita";

/**
 * Komponen helper untuk otomatis scroll ke atas saat pindah halaman
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * Komponen Cerdas untuk Mengatur Layout
 * Ini akan memeriksa URL dan memutuskan apakah akan menampilkan
 * layout publik (Navbar + Footer) atau layout admin/login.
 */
const LayoutController = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginRoute = location.pathname === "/login-admin";

  // Jika ini adalah halaman admin atau halaman login, JANGAN tampilkan Navbar & Footer publik
  if (isAdminRoute || isLoginRoute) {
    return <>{children}</>;
  }

  // Jika ini halaman publik, tampilkan layout lengkap (Navbar, Konten, Footer)
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

/**
 * Komponen Utama Aplikasi
 */
function App() {
  // Inisialisasi AOS (Animasi)
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <LayoutController>
        <Routes>
          {/* == Rute Halaman Publik == */}
          <Route path="/" element={<Home />} />
          <Route path="/kegiatan" element={<Kegiatan />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/data-anak" element={<DataAnak />} />
          <Route path="/login-admin" element={<LoginAdmin />} />

          <Route path="/admin" element={<AdminLayout />}>
            {/* Halaman utama admin di /admin */}
            <Route index element={<Dashboard />} />
            <Route path="kelola-kegiatan" element={<KelolaKegiatan />} />
            <Route path="kelola-data-balita" element={<KelolaDataBalita />} />
            <Route path="balita/tambah" element={<FormBalita />} /> 
            <Route path="balita/edit/:id" element={<FormBalita />} />
          </Route>
        </Routes>
      </LayoutController>
    </Router>
  );
}

export default App;
