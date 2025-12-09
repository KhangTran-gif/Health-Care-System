import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FaHome, FaChartBar, FaStethoscope, FaUserMd } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import "./AdminPage.css";

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newWorkTime, setNewWorkTime] = useState("");
  const [newExperience, setNewExperience] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editSpecialty, setEditSpecialty] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editWorkTime, setEditWorkTime] = useState("");
  const [editExperience, setEditExperience] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchDoctors();
    fetchSpecialties();
  }, []);

  async function fetchDoctors() {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "doctors"));
    setDoctors(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  }
  async function fetchSpecialties() {
    const querySnapshot = await getDocs(collection(db, "specialties"));
    setSpecialties(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!newName.trim() || !newSpecialty) return;
    await addDoc(collection(db, "doctors"), {
      name: newName,
      specialtyId: newSpecialty,
      image: newImage,
      workTime: newWorkTime,
      experience: newExperience,
    });
    setNewName(""); setNewSpecialty(""); setNewImage(""); setNewWorkTime(""); setNewExperience("");
    fetchDoctors();
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, "doctors", id));
    fetchDoctors();
  }

  function startEdit(d) {
    setEditId(d.id);
    setEditName(d.name);
    setEditSpecialty(d.specialtyId || "");
    setEditImage(d.image || "");
    setEditWorkTime(d.workTime || "");
    setEditExperience(d.experience || "");
  }

  async function handleEditSave(id) {
    await updateDoc(doc(db, "doctors", id), {
      name: editName,
      specialtyId: editSpecialty,
      image: editImage,
      workTime: editWorkTime,
      experience: editExperience,
    });
    setEditId(null);
    fetchDoctors();
  }

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
        <div className="admin-title">Quản lý Bác sĩ</div>
        <form onSubmit={handleAdd} style={{marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap'}}>
          <input
            className="admin-edit-input"
            placeholder="Tên bác sĩ"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            required
          />
          <select
            className="admin-edit-input"
            value={newSpecialty}
            onChange={e => setNewSpecialty(e.target.value)}
            required
          >
            <option value="">Chọn chuyên khoa</option>
            {specialties.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <input
            className="admin-edit-input"
            placeholder="Link ảnh bác sĩ (URL)"
            value={newImage}
            onChange={e => setNewImage(e.target.value)}
          />
          <input
            className="admin-edit-input"
            placeholder="Thời gian làm việc (VD: 7h-17h)"
            value={newWorkTime}
            onChange={e => setNewWorkTime(e.target.value)}
          />
          <input
            className="admin-edit-input"
            placeholder="Kinh nghiệm làm việc (VD: 10 năm)"
            value={newExperience}
            onChange={e => setNewExperience(e.target.value)}
          />
          <button className="admin-save-btn" type="submit">Thêm</button>
        </form>
        <div className="admin-table-wrapper">
          {loading ? "Đang tải..." : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tên bác sĩ</th>
                  <th>Chuyên khoa</th>
                  <th>Ảnh</th>
                  <th>Thời gian làm việc</th>
                  <th>Kinh nghiệm</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(d => (
                  <tr key={d.id}>
                    <td>
                      {editId === d.id ? (
                        <input className="admin-edit-input" value={editName} onChange={e => setEditName(e.target.value)} />
                      ) : d.name}
                    </td>
                    <td>
                      {editId === d.id ? (
                        <select className="admin-edit-input" value={editSpecialty} onChange={e => setEditSpecialty(e.target.value)}>
                          <option value="">Chọn chuyên khoa</option>
                          {specialties.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      ) : (specialties.find(s => s.id === d.specialtyId)?.name || "")}
                    </td>
                    <td>
                      {editId === d.id ? (
                        <input className="admin-edit-input" value={editImage} onChange={e => setEditImage(e.target.value)} placeholder="Link ảnh bác sĩ (URL)" />
                      ) : (
                        d.image ? <img src={d.image} alt={d.name} style={{width:40, height:40, borderRadius:'50%', objectFit:'cover'}} /> : null
                      )}
                    </td>
                    <td>
                      {editId === d.id ? (
                        <input className="admin-edit-input" value={editWorkTime} onChange={e => setEditWorkTime(e.target.value)} placeholder="Thời gian làm việc" />
                      ) : d.workTime}
                    </td>
                    <td>
                      {editId === d.id ? (
                        <input className="admin-edit-input" value={editExperience} onChange={e => setEditExperience(e.target.value)} placeholder="Kinh nghiệm làm việc" />
                      ) : d.experience}
                    </td>
                    <td>
                      {editId === d.id ? (
                        <>
                          <button className="admin-save-btn" onClick={() => handleEditSave(d.id)}>Lưu</button>
                          <button className="admin-cancel-btn" onClick={() => setEditId(null)}>Huỷ</button>
                        </>
                      ) : (
                        <>
                          <button className="admin-edit-btn" onClick={() => startEdit(d)}>Sửa</button>
                          <button className="admin-delete-btn" onClick={() => handleDelete(d.id)}>Xoá</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
