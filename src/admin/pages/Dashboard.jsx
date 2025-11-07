import React, { useState, useEffect } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "../../styles/admin/Dashboard.css";

const Dashboard = () => {
  // 🔗 DATABASE CONNECTION POINT - State untuk data dari backend
  const [dashboardStats, setDashboardStats] = useState({
    totalBalita: 152,
    totalKegiatan: 4,
    perluValidasi: 8,
    normalGizi: 120,
  });

  // 🔗 DATABASE CONNECTION POINT - Data grafik pertumbuhan
  const [growthData, setGrowthData] = useState([
    { bulan: "Jan", beratRata: 8.2, tinggiRata: 68.5, jumlahBalita: 145 },
    { bulan: "Feb", beratRata: 8.5, tinggiRata: 69.2, jumlahBalita: 148 },
    { bulan: "Mar", beratRata: 8.8, tinggiRata: 70.0, jumlahBalita: 150 },
    { bulan: "Apr", beratRata: 9.0, tinggiRata: 70.5, jumlahBalita: 152 },
    { bulan: "Mei", beratRata: 9.2, tinggiRata: 71.0, jumlahBalita: 152 },
    { bulan: "Jun", beratRata: 9.5, tinggiRata: 71.8, jumlahBalita: 152 },
    { bulan: "Jul", beratRata: 9.7, tinggiRata: 72.5, jumlahBalita: 152 },
  ]);

  // 🔗 DATABASE CONNECTION POINT - Data distribusi status gizi
  const [statusGiziData, setStatusGiziData] = useState([
    { status: "Normal", jumlah: 120, persentase: 79 },
    { status: "Resiko Stunting", jumlah: 25, persentase: 16 },
    { status: "Gizi Kurang", jumlah: 7, persentase: 5 },
  ]);

  // 🔗 DATABASE CONNECTION POINT - Data posyandu terpopuler
  const [topPosyandu, setTopPosyandu] = useState([
    { nama: "Posyandu Anggrek", jumlahBalita: 35, pertumbuhan: "+5.2%" },
    { nama: "Posyandu Mawar", jumlahBalita: 28, pertumbuhan: "+3.1%" },
    { nama: "Posyandu Melati", jumlahBalita: 24, pertumbuhan: "+2.8%" },
    { nama: "Posyandu Dahlia", jumlahBalita: 22, pertumbuhan: "+1.9%" },
  ]);

  // 🔗 DATABASE CONNECTION POINT - Data kegiatan mendatang
  const [upcomingActivities, setUpcomingActivities] = useState([
    {
      id: 1,
      nama: "Imunisasi Anak Batch 2",
      tanggal: "2025-08-14",
      posyandu: "Mawar",
    },
    {
      id: 2,
      nama: "Edukasi Kesehatan Ibu",
      tanggal: "2025-09-01",
      posyandu: "Anggrek",
    },
  ]);

  // 🔗 DATABASE CONNECTION POINT - Fetch data dari API
  useEffect(() => {
    // TODO: Replace with actual API calls
    fetchDashboardData();
  }, []);

  // 🔗 DATABASE CONNECTION POINT - Function untuk fetch data
  const fetchDashboardData = async () => {
    try {
      // TODO: Uncomment dan sesuaikan dengan endpoint backend
      // const statsResponse = await fetch('/api/dashboard/stats');
      // const statsData = await statsResponse.json();
      // setDashboardStats(statsData);

      // const growthResponse = await fetch('/api/dashboard/growth-chart');
      // const growthData = await growthResponse.json();
      // setGrowthData(growthData);

      // const giziResponse = await fetch('/api/dashboard/status-gizi');
      // const giziData = await giziResponse.json();
      // setStatusGiziData(giziData);

      // const posyanduResponse = await fetch('/api/dashboard/top-posyandu');
      // const posyanduData = await posyanduResponse.json();
      // setTopPosyandu(posyanduData);

      // const activitiesResponse = await fetch('/api/dashboard/upcoming-activities');
      // const activitiesData = await activitiesResponse.json();
      // setUpcomingActivities(activitiesData);

      console.log("📊 Dashboard data loaded");
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].payload.bulan}</p>
          <p className="tooltip-value" style={{ color: "#10b981" }}>
            Berat: {payload[0].value} kg
          </p>
          <p className="tooltip-value" style={{ color: "#6366f1" }}>
            Tinggi: {payload[1].value} cm
          </p>
          <p className="tooltip-info">
            Total Balita: {payload[0].payload.jumlahBalita}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-modern-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Monitoring data posyandu dan pertumbuhan balita</p>
        </div>
        <div className="header-actions">
          <button className="btn-refresh" onClick={fetchDashboardData}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="1 4 1 10 7 10" />
              <polyline points="23 20 23 14 17 14" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
            Refresh
          </button>
          <select className="time-filter">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card-modern stat-primary">
          <div className="stat-icon-wrapper">
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
          <div className="stat-content">
            <h3>Total Balita</h3>
            <div className="stat-number">{dashboardStats.totalBalita}</div>
            <div className="stat-trend positive">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5z" />
              </svg>
              <span>+2.8%</span>
              <span className="trend-label">vs last month</span>
            </div>
          </div>
        </div>

        <div className="stat-card-modern stat-success">
          <div className="stat-icon-wrapper">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>Status Normal</h3>
            <div className="stat-number">{dashboardStats.normalGizi}</div>
            <div className="stat-trend positive">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5z" />
              </svg>
              <span>+3.2%</span>
              <span className="trend-label">vs last month</span>
            </div>
          </div>
        </div>

        <div className="stat-card-modern stat-warning">
          <div className="stat-icon-wrapper">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>Perlu Validasi</h3>
            <div className="stat-number">{dashboardStats.perluValidasi}</div>
            <div className="stat-trend negative">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z" />
              </svg>
              <span>-1.5%</span>
              <span className="trend-label">vs last month</span>
            </div>
          </div>
        </div>

        <div className="stat-card-modern stat-info">
          <div className="stat-icon-wrapper">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>Total Kegiatan</h3>
            <div className="stat-number">{dashboardStats.totalKegiatan}</div>
            <div className="stat-trend neutral">
              <span>Published activities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Growth Analytics Chart */}
        <div className="dashboard-card chart-card">
          <div className="card-header-modern">
            <div>
              <h2>Analytics Pertumbuhan Balita</h2>
              <p>Rata-rata berat dan tinggi badan per bulan</p>
            </div>
            <select className="chart-filter">
              <option>6 Bulan Terakhir</option>
              <option>1 Tahun Terakhir</option>
              <option>Semua Data</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorBerat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTinggi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="bulan"
                  stroke="#64748b"
                  style={{ fontSize: "13px" }}
                />
                <YAxis stroke="#64748b" style={{ fontSize: "13px" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "14px", paddingTop: "10px" }}
                />
                <Area
                  type="monotone"
                  dataKey="beratRata"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBerat)"
                  name="Berat Rata-rata (kg)"
                />
                <Area
                  type="monotone"
                  dataKey="tinggiRata"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTinggi)"
                  name="Tinggi Rata-rata (cm)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Posyandu */}
        <div className="dashboard-card">
          <div className="card-header-modern">
            <h2>Posyandu Terpopuler</h2>
            <button className="btn-view-all">View All</button>
          </div>
          <div className="posyandu-list">
            {topPosyandu.map((posyandu, index) => (
              <div key={index} className="posyandu-item">
                <div className="posyandu-rank">{index + 1}</div>
                <div className="posyandu-info">
                  <h4>{posyandu.nama}</h4>
                  <p>{posyandu.jumlahBalita} Balita</p>
                </div>
                <div className="posyandu-growth positive">
                  {posyandu.pertumbuhan}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Gizi Distribution */}
        <div className="dashboard-card">
          <div className="card-header-modern">
            <h2>Distribusi Status Gizi</h2>
          </div>
          <div className="status-gizi-list">
            {statusGiziData.map((item, index) => (
              <div key={index} className="status-item">
                <div className="status-info">
                  <div className="status-label">
                    <span
                      className={`status-dot ${
                        item.status === "Normal"
                          ? "dot-success"
                          : item.status === "Resiko Stunting"
                          ? "dot-warning"
                          : "dot-danger"
                      }`}
                    ></span>
                    {item.status}
                  </div>
                  <div className="status-count">{item.jumlah} Balita</div>
                </div>
                <div className="status-progress">
                  <div className="progress-bar-wrapper">
                    <div
                      className={`progress-bar-fill ${
                        item.status === "Normal"
                          ? "fill-success"
                          : item.status === "Resiko Stunting"
                          ? "fill-warning"
                          : "fill-danger"
                      }`}
                      style={{ width: `${item.persentase}%` }}
                    ></div>
                  </div>
                  <span className="progress-percentage">{item.persentase}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Activities */}
        <div className="dashboard-card">
          <div className="card-header-modern">
            <h2>Kegiatan Mendatang</h2>
            <button className="btn-view-all">View All</button>
          </div>
          <div className="activities-list">
            {upcomingActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-date">
                  <div className="date-day">
                    {new Date(activity.tanggal).getDate()}
                  </div>
                  <div className="date-month">
                    {new Date(activity.tanggal).toLocaleDateString("id-ID", {
                      month: "short",
                    })}
                  </div>
                </div>
                <div className="activity-info">
                  <h4>{activity.nama}</h4>
                  <p>📍 Posyandu {activity.posyandu}</p>
                </div>
                <button className="btn-activity-action">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;