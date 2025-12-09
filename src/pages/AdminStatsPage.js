import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./AdminPage.css";
import { FaHome, FaChartBar, FaStethoscope, FaUserMd } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminStatsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      setBookings(querySnapshot.docs.map((doc) => doc.data()));
      setLoading(false);
    }
    fetchData();
  }, []);

  // Thống kê số lượng đặt lịch theo chuyên khoa
  const departmentStats = {};
  bookings.forEach((b) => {
    const dept = b.department || b.specialty || "Khác";
    departmentStats[dept] = (departmentStats[dept] || 0) + 1;
  });
  const departments = Object.keys(departmentStats);
  const counts = departments.map((d) => departmentStats[d]);

  // Thống kê số lượng đặt lịch theo ngày
  const dateStats = {};
  bookings.forEach((b) => {
    if (b.date) dateStats[b.date] = (dateStats[b.date] || 0) + 1;
  });
  const dates = Object.keys(dateStats).sort();
  const dateCounts = dates.map((d) => dateStats[d]);

  // Màu cho các phần của Pie chart
  const pieColorsDept = [
    '#1abc9c', '#e74c3c', '#f6c23e', '#3498db', '#9b59b6', '#2ecc71', '#e67e22', '#34495e', '#fd79a8', '#00b894', '#fdcb6e', '#636e72'
  ];
  const pieColorsDate = [
    '#16c79a', '#f6c23e', '#e67e22', '#00b894', '#fdcb6e', '#636e72', '#e17055', '#00bcd4', '#6c5ce7', '#b2bec3', '#fab1a0'
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar menu luôn hiển thị, không cần đóng/mở */}
      <aside className="admin-sidebar-pro static">
        <div className="sidebar-header">
          <span className="sidebar-logo">Open <b>Admin</b></span>
        </div>
        <nav className="sidebar-nav">
          <ul style={{padding: 0, margin: 0, listStyle: 'none'}}>
            <li>
              <button className={`sidebar-menu-btn${location.pathname === '/' ? ' active' : ''}`} onClick={() => navigate('/') }>
                <FaHome style={{marginRight: 8}} /> Trang chủ
              </button>
            </li>
            <li>
              <button className={`sidebar-menu-btn${location.pathname === '/admin/stats' ? ' active' : ''}`} onClick={() => navigate('/admin/stats')}>
                <FaChartBar style={{marginRight: 8}} /> Thống kê
              </button>
            </li>
            <li>
              <button className={`sidebar-menu-btn${location.pathname === '/admin' ? ' active' : ''}`} onClick={() => navigate('/admin')}>
                <span style={{marginRight: 8}}>📋</span> Đặt lịch khám
              </button>
            </li>
            <li>
              <button className={`sidebar-menu-btn${location.pathname === '/admin/specialties' ? ' active' : ''}`} onClick={() => navigate('/admin/specialties')}>
                <FaStethoscope style={{marginRight: 8}} /> Quản lý chuyên khoa
              </button>
            </li>
            <li>
              <button className={`sidebar-menu-btn${location.pathname === '/admin/doctors' ? ' active' : ''}`} onClick={() => navigate('/admin/doctors')}>
                <FaUserMd style={{marginRight: 8}} /> Quản lý bác sĩ
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main-content">
        <h2 className="admin-title">Thống kê đặt lịch khám</h2>
        {loading ? (
          <div>Đang tải dữ liệu...</div>
        ) : (
          <div className="admin-table-wrapper" style={{background: 'transparent', boxShadow: 'none', maxWidth: 900, display: 'flex', flexDirection: 'row', gap: 32, justifyContent: 'center', alignItems: 'flex-start'}}>
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h4 style={{color: '#1abc9c', marginBottom: 18}}>Tỉ lệ đặt lịch theo chuyên khoa</h4>
              <div style={{width: 340, maxWidth: '100%'}}>
                <Pie
                  data={{
                    labels: departments,
                    datasets: [
                      {
                        label: "Số lượng đặt lịch",
                        data: counts,
                        backgroundColor: pieColorsDept.slice(0, departments.length),
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } },
                  }}
                />
              </div>
            </div>
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h4 style={{color: '#1abc9c', marginBottom: 18}}>Tỉ lệ đặt lịch theo ngày</h4>
              <div style={{width: 340, maxWidth: '100%'}}>
                <Pie
                  data={{
                    labels: dates,
                    datasets: [
                      {
                        label: "Số lượng đặt lịch",
                        data: dateCounts,
                        backgroundColor: pieColorsDate.slice(0, dates.length),
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
