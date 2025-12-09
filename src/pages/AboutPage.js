import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // State cho accordion FAQ
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = [
    {
      question: "Làm thế nào để đặt lịch khám trực tuyến?",
      answer: "Bạn có thể đặt lịch khám qua website hoặc gọi hotline 1900 123 456 để được hỗ trợ."
    },
    {
      question: "Trung tâm có hỗ trợ bảo hiểm y tế không?",
      answer: "Trung tâm hỗ trợ thanh toán bảo hiểm y tế và các loại bảo hiểm sức khỏe liên kết."
    },
    {
      question: "Tôi có thể nhận kết quả khám qua email không?",
      answer: "Có, bạn có thể chọn nhận kết quả qua email hoặc trực tiếp tại trung tâm."
    },
    {
      question: "Trung tâm có làm việc cuối tuần không?",
      answer: "Trung tâm làm việc từ thứ 2 đến chủ nhật, 7h00 - 17h00 hàng ngày."
    }
  ];

  return (
    <div className="home-wrapper">
      <header className="header-gradient text-white text-center py-5 shadow">
        <h1 className="display-4 fw-bold" data-aos="fade-down">
          Giới thiệu về Trung tâm Y tế Cộng Đồng
        </h1>
        <p className="lead" data-aos="fade-up">
          Lịch sử hình thành, sứ mệnh và giá trị cốt lõi
        </p>
        <Button className="glow-button mt-3" onClick={() => navigate("/")}>Về trang chủ</Button>
      </header>

      {/* Lịch sử hình thành */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6} data-aos="fade-right">
            <img
              src="/images.jpg"
              alt="Lịch sử hình thành"
              className="img-fluid rounded-4 shadow-lg"
            />
          </Col>
          <Col md={6} data-aos="fade-left">
            <h2 className="text-gradient mb-3">Lịch sử hình thành</h2>
            <p>
              Trung tâm Y tế Cộng Đồng được thành lập năm 2010 với mục tiêu mang lại dịch vụ chăm sóc sức khỏe chất lượng cao cho cộng đồng. Trải qua hơn một thập kỷ phát triển, trung tâm đã không ngừng mở rộng quy mô, đầu tư trang thiết bị hiện đại và xây dựng đội ngũ y bác sĩ tận tâm, chuyên môn cao.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Sứ mệnh và giá trị cốt lõi */}
      <Container className="my-5">
        <Row>
          <Col md={6} data-aos="fade-right">
            <Card className="h-100 shadow-sm border-info">
              <Card.Body>
                <Card.Title className="text-gradient">Sứ mệnh</Card.Title>
                <Card.Text>
                  Đặt sức khỏe cộng đồng lên hàng đầu, cung cấp dịch vụ y tế hiện đại, thân thiện, an toàn và hiệu quả cho mọi người dân.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} data-aos="fade-left">
            <Card className="h-100 shadow-sm border-success">
              <Card.Body>
                <Card.Title className="text-gradient">Giá trị cốt lõi</Card.Title>
                <ul>
                  <li>Chuyên nghiệp – Tận tâm – Minh bạch</li>
                  <li>Đổi mới sáng tạo</li>
                  <li>Hợp tác và phát triển bền vững</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Chính sách chất lượng & an toàn */}
      <Container className="my-5">
        <Row>
          <Col md={6} data-aos="fade-right">
            <Card className="shadow-sm h-100 border-info">
              <Card.Body>
                <Card.Title className="text-gradient">Chính sách chất lượng</Card.Title>
                <Card.Text>
                  Trung tâm cam kết cung cấp dịch vụ y tế chất lượng cao, lấy người bệnh làm trung tâm, tuân thủ các tiêu chuẩn quốc tế về an toàn và bảo mật thông tin.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} data-aos="fade-left">
            <Card className="shadow-sm h-100 border-success">
              <Card.Body>
                <Card.Title className="text-gradient">An toàn người bệnh</Card.Title>
                <Card.Text>
                  Đội ngũ y bác sĩ thường xuyên được đào tạo, cập nhật kiến thức mới, quy trình kiểm soát nhiễm khuẩn nghiêm ngặt, đảm bảo an toàn tối đa cho người bệnh.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

{/* Thành tựu nổi bật */}
      <Container className="my-5">
        <h2 className="text-center text-gradient mb-5" data-aos="fade-up">Thành tựu nổi bật</h2>
        <Row className="text-center">
          <Col md={3} data-aos="zoom-in">
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <h3 className="text-gradient">15+</h3>
                <div>Năm hoạt động</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} data-aos="zoom-in">
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <h3 className="text-gradient">100.000+</h3>
                <div>Lượt khám mỗi năm</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} data-aos="zoom-in">
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <h3 className="text-gradient">ISO 9001:2015</h3>
                <div>Chứng nhận chất lượng</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} data-aos="zoom-in">
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <h3 className="text-gradient">30+</h3>
                <div>Đối tác lớn</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Quy trình khám chữa bệnh */}
      <Container className="my-5">
        <h2 className="text-center text-gradient mb-5" data-aos="fade-up">Quy trình khám chữa bệnh</h2>
        <Row className="justify-content-center">
          <Col md={10}>
            <ol className="process-list">
              <li>Đăng ký đặt lịch trực tuyến hoặc tại quầy tiếp nhận</li>
              <li>Tiếp nhận và hướng dẫn tại quầy lễ tân</li>
              <li>Khám lâm sàng và cận lâm sàng (nếu cần)</li>
              <li>Nhận kết quả, tư vấn điều trị</li>
              <li>Thanh toán và nhận đơn thuốc, hướng dẫn chăm sóc</li>
            </ol>
          </Col>
        </Row>
      </Container>

      {/* Cơ sở vật chất */}
      <Container className="my-5">
        <h2 className="text-center text-gradient mb-5" data-aos="fade-up">
          Cơ sở vật chất hiện đại
        </h2>
        <Row>
          {["https://images.unsplash.com/photo-1606206873764-fd15e242df52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"].map((img, idx) => (
            <Col md={4} className="mb-4" key={idx} data-aos="zoom-in">
              <Card className="shadow-sm h-100">
                <Card.Img variant="top" src={img} alt="Cơ sở vật chất" className="facility-img" />
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Hình ảnh hoạt động cộng đồng */}
      <Container className="my-5">
        <h2 className="text-center text-gradient mb-5" data-aos="fade-up">Hoạt động cộng đồng</h2>
        <Row>
          {["https://plus.unsplash.com/premium_photo-1683134055585-3d84cb07b60e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1643321612557-57cef422f401?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1643321613180-68d62b93cb79?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"].map((img, idx) => (
            <Col md={4} className="mb-4" key={idx} data-aos="zoom-in">
              <Card className="shadow-sm h-100">
                <Card.Img variant="top" src={img} alt="Hoạt động cộng đồng" className="facility-img" />
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Video giới thiệu */}
      <Container className="my-5">
        <h2 className="text-center text-gradient mb-4" data-aos="fade-up">Video giới thiệu</h2>
        <Row className="justify-content-center">
          <Col md={8} data-aos="zoom-in">
            <div className="ratio ratio-16x9 rounded-4 shadow-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/7LGsnH_URw0"
                title="Video giới thiệu Trung tâm Y tế Cộng Đồng thực tế"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 0 }}
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>

      {/* FAQ */}
      <Container className="my-5">
        <h2 className="text-center text-gradient mb-4" data-aos="fade-up">Câu hỏi thường gặp</h2>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, idx) => (
                <div className="accordion-item" key={idx}>
                  <h2 className="accordion-header" id={`faq${idx}`}> 
                    <button
                      className={`accordion-button${openIdx === idx ? '' : ' collapsed'}`}
                      type="button"
                      aria-expanded={openIdx === idx}
                      onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse collapse${openIdx === idx ? ' show' : ''}`}
                    aria-labelledby={`faq${idx}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Thông tin liên hệ */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6} data-aos="fade-right">
            <div className="map-container h-100">
              <iframe
                title="Bản đồ Trung tâm Y tế Cộng Đồng"
                src="https://www.google.com/maps?q=10.762622,106.660172&z=15&output=embed"
                width="100%"
                height="320"
                style={{ border: 0, borderRadius: "12px", boxShadow: "0 2px 12px rgba(32,201,151,0.07)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
          <Col md={6} data-aos="fade-left">
            <div className="contact-section h-100 d-flex flex-column justify-content-center">
              <h2 className="text-gradient mb-3">Liên hệ với chúng tôi</h2>
              <p>Địa chỉ: 66 Yên Lãng, Quận Thủ Đức, TP. Hồ Chí Minh</p>
              <p>
                Hotline: <strong>1900 123 456</strong> | Email: nhathao@ytcd.com.vn
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <footer className="footer text-white text-center py-4">
        <p className="mb-0">&copy; 2025 Trung tâm Y tế Cộng Đồng. All rights reserved.</p>
      </footer>
    </div>
  );
}
