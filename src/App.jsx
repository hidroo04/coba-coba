import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import "./styles/global/App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Kegiatan from "./pages/Kegiatan";
import Berita from "./pages/Berita";
import DataAnak from "./pages/DataAnak";
import LoginAdmin from "./pages/LoginAdmin";

import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import KelolaKegiatan from "./admin/pages/KelolaKegiatan";
import FormKegiatan from "./admin/pages/FormKegiatan";
import KelolaDataBalita from "./admin/pages/KelolaDataBalita";
import FormBalita from "./admin/pages/FormBalita";
import DetailBalita from "./admin/pages/DetailBalita";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const LayoutController = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginRoute = location.pathname === "/login-admin";

  if (isAdminRoute || isLoginRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

function App() {
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
          <Route path="/" element={<Home />} />
          <Route path="/kegiatan" element={<Kegiatan />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/data-anak" element={<DataAnak />} />
          <Route path="/login-admin" element={<LoginAdmin />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="kelola-kegiatan" element={<KelolaKegiatan />} />
            <Route path="" element={<FormKegiatan />} />
            <Route path="./admin/kelola-kegiatan/edit/:id" element={<FormKegiatan />} />
            <Route path="kelola-data-balita" element={<KelolaDataBalita />} />
            <Route path="balita/tambah" element={<FormBalita />} />
            <Route path="balita/edit/:id" element={<FormBalita />} />
            <Route path="balita/detail/:id" element={<DetailBalita />} />
          </Route>
        </Routes>
      </LayoutController>
    </Router>
  );
}

export default App;
