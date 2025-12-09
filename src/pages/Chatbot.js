import React, { useState } from 'react';
import './Chatbot.css';

const QUESTIONS = [
  {
    question: 'Làm thế nào để đặt lịch khám?',
    answer: 'Bạn có thể vào trang Đặt Lịch Khám, điền đầy đủ thông tin và nhấn Đặt Lịch Khám. Sau khi đặt thành công, bạn sẽ nhận được mã đặt lịch để tra cứu.'
  },
  {
    question: 'Tôi cần mang theo gì khi đi khám?',
    answer: 'Bạn nên mang theo giấy tờ tùy thân, thẻ bảo hiểm y tế (nếu có) và các giấy tờ liên quan đến bệnh án trước đó.'
  },
  {
    question: 'Làm sao để tra cứu thông tin đặt lịch?',
    answer: 'Bạn vào mục Tra cứu thông tin đặt lịch, nhập mã đặt lịch đã nhận được sau khi đặt lịch để xem chi tiết.'
  },
  {
    question: 'Thời gian làm việc của phòng khám?',
    answer: 'Phòng khám làm việc từ 7h00 đến 17h00 các ngày trong tuần (trừ Chủ nhật và ngày lễ).'
  },
  {
    question: 'Có thể đổi lịch khám không?',
    answer: 'Bạn vui lòng liên hệ hotline hoặc đến trực tiếp phòng khám để được hỗ trợ đổi lịch.'
  },
  {
    question: 'Phòng khám có hỗ trợ khám bảo hiểm y tế không?',
    answer: 'Có, phòng khám hỗ trợ khám và thanh toán bằng thẻ bảo hiểm y tế theo quy định.'
  },
  {
    question: 'Tôi có thể đặt lịch khám cho người thân không?',
    answer: 'Bạn hoàn toàn có thể đặt lịch khám cho người thân, chỉ cần điền thông tin của người cần khám vào form.'
  },
  {
    question: 'Có dịch vụ khám tại nhà không?',
    answer: 'Phòng khám có hỗ trợ dịch vụ khám tại nhà cho người cao tuổi hoặc khó di chuyển. Vui lòng liên hệ hotline để biết thêm chi tiết.'
  },
];

export default function Chatbot() {
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [showQuick, setShowQuick] = useState(false);

  function handleAsk(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    // Tìm câu trả lời phù hợp
    const found = QUESTIONS.find(q => trimmed.toLowerCase() === q.question.toLowerCase());
    if (found) {
      setHistory([...history, { q: trimmed, a: found.answer }]);
    } else {
      setHistory([...history, { q: trimmed, a: 'Xin lỗi, tôi chưa có câu trả lời cho câu hỏi này. Vui lòng chọn câu hỏi có sẵn hoặc liên hệ phòng khám.' }]);
    }
    setInput("");
    setSelected(null);
  }

  return (
    <div className="chatbot-box" style={{display: 'flex', flexDirection: 'column', height: 420, minWidth: 340, position: 'relative'}}>
      <h3 className="chatbot-title">Chatbot Hỗ Trợ</h3>
      <div style={{flex: 1, overflowY: 'auto', paddingBottom: 12}}>
        {selected !== null && false && (
          <div className="chatbot-answer" style={{marginBottom: 10}}>{QUESTIONS[selected].answer}</div>
        )}
        {history.length > 0 && (
          <div className="chatbot-history" style={{marginTop: 8}}>
            <h4 style={{fontSize: 15, color: '#1abc9c', marginBottom: 8}}>Lịch sử hỏi đáp</h4>
            <ul style={{listStyle: 'none', padding: 0, fontSize: 15}}>
              {history.map((item, i) => (
                <li key={i} style={{marginBottom: 10}}>
                  <div style={{fontWeight: 600}}><span style={{color:'#1abc9c'}}>Bạn:</span> {item.q}</div>
                  <div style={{marginLeft: 8}}><span style={{color:'#888'}}>Chatbot:</span> {item.a}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Nút mở câu hỏi nhanh */}
      <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 4}}>
        <button
          className="chatbot-quick-toggle"
          onClick={() => setShowQuick(v => !v)}
          style={{background: '#e8f9f4', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 18, color: '#1abc9c', cursor: 'pointer'}}
          title="Câu hỏi nhanh"
        >
          <span role="img" aria-label="quick-questions">💡</span>
        </button>
        {showQuick && (
          <div className="chatbot-quick-questions" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            background: '#f6f6f6',
            borderRadius: 12,
            padding: 10,
            boxShadow: '0 2px 8px #eee',
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 2,
            maxHeight: 220,
            overflowY: 'auto',
            bottom: 60 // Đặt lại vị trí ngay phía trên input, không bị đẩy lên quá cao
          }}>
            {QUESTIONS.slice(0, 4).map((item, idx) => (
              <button
                key={idx}
                className="chatbot-quick-btn"
                onClick={() => { setInput(item.question); setShowQuick(false); }}
                type="button"
                style={{
                  background: '#e8f9f4',
                  color: '#1abc9c',
                  border: 'none',
                  borderRadius: 16,
                  padding: '7px 14px',
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  textAlign: 'left',
                  whiteSpace: 'normal',
                  maxWidth: '100%',
                  minHeight: 0,
                }}
                title={item.question}
              >
                {item.question}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={handleAsk} style={{display: 'flex', gap: 8, flex: 1}}>
          <input
            type="text"
            className="chatbot-input"
            placeholder="Nhập câu hỏi của bạn..."
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{flex: 1, borderRadius: 20, border: '1px solid #1abc9c', padding: 10, fontSize: 15, background: '#f6f6f6'}}
          />
          <button type="submit" className="chatbot-ask-btn" style={{borderRadius: 20, background: '#1abc9c', color: '#fff', border: 'none', padding: '0 18px', fontWeight: 600}}>Gửi</button>
        </form>
      </div>
    </div>
  );
}
