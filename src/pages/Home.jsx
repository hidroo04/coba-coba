import React from "react";
import "../styles/pages/Home.css";

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
          {/* ✅ CARD 1 */}
          <div className="feature-item" data-aos="fade-up" data-aos-delay="300">
            <h3>Meningkatkan Kesehatan Ibu dan Anak</h3>
            <p>
              Posyandu berperan penting dalam memantau pertumbuhan dan
              perkembangan anak sejak dini serta memberikan layanan kesehatan
              dasar bagi ibu hamil, ibu menyusui, dan balita agar tercipta
              generasi yang sehat dan kuat.
            </p>
          </div>

          {/* ✅ CARD 2 */}
          <div className="feature-item" data-aos="fade-up" data-aos-delay="400">
            <h3>Mendorong Partisipasi Masyarakat</h3>
            <p>
              Melalui kegiatan Posyandu, masyarakat didorong untuk berperan
              aktif dalam menjaga kesehatan keluarga dan lingkungan. Partisipasi
              aktif warga menjadi kunci keberhasilan program kesehatan di
              tingkat desa atau kelurahan.
            </p>
          </div>

          {/* ✅ CARD 3 */}
          <div className="feature-item" data-aos="fade-up" data-aos-delay="500">
            <h3>Meningkatkan Kesadaran dan Edukasi Gizi</h3>
            <p>
              Posyandu menjadi pusat edukasi bagi masyarakat tentang pentingnya
              asupan gizi seimbang, imunisasi, dan pola hidup sehat guna
              mencegah stunting serta mendukung tumbuh kembang anak secara
              optimal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
