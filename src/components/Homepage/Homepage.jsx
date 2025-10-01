import "../../style/homepage.css"
import Benefits from "./Benefits";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../../hooks/useAuth'
import StudentHeader from '../Student/StudentHeader'
function Homepage() {
  const navigate = useNavigate();
  async function handleLogin() {
    navigate('/login');
  }
  const {auth} = useAuth();
  const role = auth.role;
  return (
    <>
    {role === 'student' && <StudentHeader/>}
    <div className="homepage">
      <section className="hero">
        <div className="overlay-hero">
            <div className="hero-content">
            <h1>Chương trình Tutor - HCMUT</h1>
            <p>
                Hỗ trợ sinh viên trong học tập và phát triển kỹ năng, kết nối với
                giảng viên, nghiên cứu sinh và sinh viên năm trên giàu kinh nghiệm.
            </p>
            {!auth.token && <button onClick={()=>handleLogin()}className="cta-btn">Đăng nhập</button>}
        </div>
        </div>
      </section>
      <section id="about" className="about">
        <h2>Mục tiêu</h2>
        <p>
          Hệ thống được xây dựng nhằm quản lý và vận hành chương trình Tutor
          hiệu quả, hiện đại, có khả năng mở rộng, đáp ứng nhu cầu thực tiễn
          trong môi trường giáo dục đại học.
        </p>
      </section>
      <Benefits/>
      <section id="features" className="features">
        <h2>Các tính năng</h2>
        <div className="feature-list">
          <div className="feature-card">
            <h3>Quản lý thông tin</h3>
            <p>
              Hồ sơ cá nhân, lĩnh vực chuyên môn, nhu cầu hỗ trợ của sinh viên
              và tutor.
            </p>
          </div>
          <div className="feature-card">
            <h3>Đặt & Quản lý lịch</h3>
            <p>
              Đặt lịch, hủy/đổi lịch, nhắc lịch tự động và quản lý buổi gặp trực
              tiếp hoặc trực tuyến.
            </p>
          </div>
          <div className="feature-card">
            <h3>Phản hồi & Đánh giá</h3>
            <p>
              Sinh viên phản hồi chất lượng, tutor theo dõi tiến bộ, khoa/bộ môn
              khai thác dữ liệu đánh giá.
            </p>
          </div>
          <div className="feature-card">
            <h3>Báo cáo & Thống kê</h3>
            <p>
              Hỗ trợ phòng Đào tạo và Công tác Sinh viên theo dõi, xét điểm rèn
              luyện và học bổng.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
export default Homepage;
