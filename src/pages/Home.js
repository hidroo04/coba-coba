import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 data-aos="fade-up" data-aos-delay="100">
          Menuju Hidup <br /> yang Lebih Baik
        </h1>
        <p data-aos="fade-up" data-aos-delay="200">
          Tingkatkan kesehatan keluarga Anda bersama kami. Dengan perawatan
          ahli, layanan terbaik, dan komitmen pada kesejahteraan anak-anak, kami
          memberikan solusi kesehatan untuk semua.
        </p>

        <div className="features">
          <div className="feature-item" data-aos="fade-up" data-aos-delay="300">
            <div className="icon-circle">
              <span className="icon">➕</span>
            </div>
            <h3>Mengoptimalkan Layanan Kesehatan</h3>
            <p>
              Strategi Efektif dalam Meningkatkan Kualitas dan Aksesibilitas
              Layanan Kesehatan
            </p>
          </div>

          <div className="feature-item" data-aos="fade-up" data-aos-delay="400">
            <div className="icon-circle">
              <span className="icon">👤</span>
            </div>
            <h3>Meningkatkan Kesejahteraan Sosial</h3>
            <p>
              Strategi Mendalam untuk Meningkatkan Kesejahteraan Sosial dengan
              Berbagai Pendekatan yang Terintegrasi
            </p>
          </div>

          <div className="feature-item" data-aos="fade-up" data-aos-delay="500">
            <div className="icon-circle">
              <span className="icon">💬</span>
            </div>
            <h3>Pusat Informasi dan Konseling Anak</h3>
            <p>
              Pusat Informasi dan Konseling untuk meningkatkan kesejahteraan
              melalui bantuan yang tersedia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
