import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BookingPage.css';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import Chatbot from './Chatbot';
import { FaRobot } from 'react-icons/fa';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    department: '',
    notes: ''
  });
  const [bookingCode, setBookingCode] = useState("");
  const [bookingInfo, setBookingInfo] = useState(null);
  const [specialties, setSpecialties] = useState([]);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function generateBookingCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingCodeGen = generateBookingCode();
      const dataToSave = { ...formData, bookingCode: bookingCodeGen };
      const docRef = await addDoc(collection(db, 'bookings'), dataToSave);
      Swal.fire({
        icon: 'success',
        title: 'Đặt lịch thành công!',
        html: `Thông tin của bạn đã được lưu.<br/><b>Mã đặt lịch:</b> <span style='color:blue'>${bookingCodeGen}</span><br/>Vui lòng lưu lại mã này để tra cứu!`
      });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        date: '',
        department: '',
        notes: ''
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Có lỗi xảy ra khi lưu thông tin!'
      });
      console.error(error);
    }
  };

  const handleCheckBooking = async () => {
    if (!bookingCode) return;
    try {
      const q = await import('firebase/firestore').then(({ query, where, collection, getDocs }) =>
        getDocs(query(collection(db, 'bookings'), where('bookingCode', '==', bookingCode)))
      );
      if (!q.empty) {
        setBookingInfo(q.docs[0].data());
      } else {
        setBookingInfo('notfound');
      }
    } catch (error) {
      setBookingInfo('error');
    }
  };

  useEffect(() => {
    async function fetchSpecialties() {
      const querySnapshot = await getDocs(collection(db, "specialties"));
      setSpecialties(querySnapshot.docs.map(doc => doc.data().name));
    }
    fetchSpecialties();
  }, []);

  function FloatingChatbot() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          className="floating-chatbot-btn"
          onClick={() => setOpen((v) => !v)}
          aria-label="Chatbot hỗ trợ"
        >
          <FaRobot />
        </button>
        {open && (
          <div className="floating-chatbot-popup">
            <button className="close-chatbot-btn" onClick={() => setOpen(false)}>&times;</button>
            <Chatbot />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="page-wrapper">
      {/* Thanh điều hướng */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Trung Tâm Y Tế Cộng Đồng</Link>
        </div>
      </nav>

      {/* Container chính */}
      <div className="booking-container">
        {/* Tiêu đề và nội dung */}
        <div className="booking-header">
          <h1 className="booking-title">Đặt Lịch Khám</h1>
          <p className="booking-subtitle">Dễ dàng đặt lịch với bác sĩ của bạn ngay hôm nay!</p>
        </div>

        {/* Form đặt lịch */}
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-grid-wide">
            <div className="form-group">
              <label>Họ và tên:</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Số điện thoại:</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Ngày khám:</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required min={today} />
            </div>
            <div className="form-group">
              <label>Chuyên khoa:</label>
              <select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">-- Chọn chuyên khoa --</option>
                {specialties.length > 0 ? specialties.map((name, idx) => (
                  <option key={idx} value={name}>{name}</option>
                )) : (
                  <>
                    <option value="Nội tổng quát">Nội tổng quát</option>
                    <option value="Tai mũi họng">Tai mũi họng</option>
                    <option value="Da liễu">Da liễu</option>
                  </>
                )}
              </select>
            </div>
          </div>
          <div className="form-group full-width">
            <label>Ghi chú:</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Bạn muốn dặn gì cho bác sĩ không?" />
          </div>
          <button type="submit" className="booking-button" style={{width: '100%', marginTop: 16, padding: '12px 0', fontSize: 18, borderRadius: 8, background: '#1abc9c', color: '#fff', border: 'none'}}>Đặt Lịch Khám</button>
        </form>
      </div>

      {/* Phần tra cứu đặt lịch riêng biệt */}
      <section className="check-booking-section" style={{margin: '48px auto 0 auto', maxWidth: 600, background: '#f8f8f8', borderRadius: 14, boxShadow: '0 2px 16px #e0e0e0', padding: 40, textAlign: 'center'}}>
        <h2 style={{marginBottom: 24, color: '#1abc9c', fontWeight: 700}}>Tra cứu thông tin đặt lịch</h2>
        <div style={{display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, justifyContent: 'center'}}>
          <input
            type="text"
            placeholder="Nhập mã đặt lịch..."
            value={bookingCode}
            onChange={e => setBookingCode(e.target.value.toUpperCase())}
            style={{padding: 12, borderRadius: 6, border: '1px solid #ccc', flex: 1, fontSize: 16, letterSpacing: 2, maxWidth: 220}}
          />
          <button type="button" onClick={handleCheckBooking} style={{padding: '12px 24px', borderRadius: 6, background: '#1abc9c', color: '#fff', border: 'none', fontWeight: 600, fontSize: 16}}>Tra cứu</button>
        </div>
        {bookingInfo === 'notfound' && <p style={{color: 'red', marginTop: 8}}>Không tìm thấy mã đặt lịch này.</p>}
        {bookingInfo === 'error' && <p style={{color: 'red', marginTop: 8}}>Có lỗi xảy ra khi tra cứu.</p>}
        {bookingInfo && bookingInfo !== 'notfound' && bookingInfo !== 'error' && (
          <div style={{marginTop: 16, background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 8px #eee', textAlign: 'left', display: 'inline-block'}}>
            <h4 style={{color: '#1abc9c'}}>Thông tin đặt lịch:</h4>
            <ul style={{listStyle: 'none', padding: 0, fontSize: 16}}>
              <li><b>Họ và tên:</b> {bookingInfo.fullName}</li>
              <li><b>Email:</b> {bookingInfo.email}</li>
              <li><b>Số điện thoại:</b> {bookingInfo.phone}</li>
              <li><b>Ngày khám:</b> {bookingInfo.date}</li>
              <li><b>Chuyên khoa:</b> {bookingInfo.department}</li>
              <li><b>Ghi chú:</b> {bookingInfo.notes}</li>
              <li><b>Mã đặt lịch:</b> <span style={{color: '#1abc9c'}}>{bookingInfo.bookingCode}</span></li>
            </ul>
          </div>
        )}
      </section>

      {/* Phần Lý do chọn chúng tôi */}
      <section className="why-choose-us">
        <h2 className="section-title">Lý Do Chọn Chúng Tôi</h2>
        <div className="reasons-container">
          <div className="reason-card">
            <img
              src="https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=160&h=160"
              alt="Chuyên nghiệp"
              className="reason-image"
            />
            <h3 className="reason-title">Đội Ngũ Chuyên Nghiệp</h3>
            <p className="reason-description">
              Đội ngũ bác sĩ giàu kinh nghiệm, tận tâm với bệnh nhân.
            </p>
          </div>
          <div className="reason-card">
            <img
              src="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=160&h=160"
              alt="Công nghệ"
              className="reason-image"
            />
            <h3 className="reason-title">Công Nghệ Hiện Đại</h3>
            <p className="reason-description">
              Trang thiết bị tiên tiến, hỗ trợ chẩn đoán chính xác.
            </p>
          </div>
          <div className="reason-card">
            <img
              src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=160&h=160"
              alt="Dịch vụ"
              className="reason-image"
            />
            <h3 className="reason-title">Dịch Vụ Tận Tâm</h3>
            <p className="reason-description">
              Chăm sóc chu đáo, đặt sức khỏe của bạn lên hàng đầu.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Phòng Khám Sức Khỏe. Mọi quyền được bảo lưu.</p>
      </footer>

      <FloatingChatbot />
    </div>
  );
};

export default BookingPage;