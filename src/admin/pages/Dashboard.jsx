import React from "react";
import "../../styles/admin/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container" data-aos="fade-in">
      <div className="dashboard-header">
        <h1>Selamat Datang, Admin!</h1>
        <p>Panel admin SiPekan untuk manajemen data dan konten website.</p>
      </div>

      <div className="summary-cards">
        <div className="card anak-card" data-aos="fade-up" data-aos-delay="100">
          <h3>Anak Terdata</h3>
          <p className="card-number">152</p>
          <div className="card-footer">
            <span>Total anak dalam sistem</span>
          </div>
        </div>
        <div
          className="card kegiatan-card"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h3>Total Kegiatan</h3>
          <p className="card-number">4</p>
          <div className="card-footer">
            <span>Kegiatan telah dipublikasi</span>
          </div>
        </div>
        <div
          className="card berita-card"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h3>Perlu Validasi</h3>
          <p className="card-number">8</p>
          <div className="card-footer">
            <span>Data anak menunggu persetujuan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
