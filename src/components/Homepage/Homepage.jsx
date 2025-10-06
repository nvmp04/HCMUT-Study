import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Benefits from "./Benefits";
import NavigationBar from "../HeaderFooter/NavigationBar";

function Homepage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const role = auth.role;

  async function handleLogin() {
    navigate("/login");
  }

  return (
    <>
      <NavigationBar/>
      <div className="font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] text-[#222] leading-[1.6] bg-[#f9f9f9]">
        {/* Hero section */}
        <section className="hero">
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] pt-8 z-0"></div>
          <div className="relative z-10 max-w-[600px] mx-auto">
            <h1 className="text-[2.2rem] mb-4 font-bold">Chương trình Tutor - HCMUT</h1>
            <p className="mx-auto ">
              Hỗ trợ sinh viên trong học tập và phát triển kỹ năng, kết nối với
              giảng viên, nghiên cứu sinh và sinh viên năm trên giàu kinh nghiệm.
            </p>
            {!auth.token && (
              <button
                onClick={handleLogin}
                className="bg-[#ffcc00] mt-1 text-[#003366] py-[0.4rem] px-[1.5rem] rounded-lg font-bold hover:bg-[#ffdb4d] transition-colors"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </section>

        {/* About section */}
        <section
          id="about"
          className="py-12 px-8 max-w-[1100px] mx-auto "
        >
          <h2 className="text-[1.8rem] mb-4 text-[#003366] font-bold">Mục tiêu</h2>
          <p className="text-[1rem] text-[#333]">
            Hệ thống được xây dựng nhằm quản lý và vận hành chương trình Tutor
            hiệu quả, hiện đại, có khả năng mở rộng, đáp ứng nhu cầu thực tiễn
            trong môi trường giáo dục đại học.
          </p>
        </section>

        {/* Benefits section */}
        <Benefits />

        {/* Features section */}
        <section
          id="features"
          className="py-12 px-8 max-w-[1100px] mx-auto text-center"
        >
          <h2 className="text-[1.8rem] mb-4 text-[#003366] font-bold">
            Các tính năng
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 mt-8">
            <div className="bg-white p-6 rounded-[10px] shadow-md transition-transform hover:-translate-y-[5px]">
              <h3 className="text-[#0055a5] mb-2 font-semibold text-lg">
                Quản lý thông tin
              </h3>
              <p>
                Hồ sơ cá nhân, lĩnh vực chuyên môn, nhu cầu hỗ trợ của sinh viên
                và tutor.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[10px] shadow-md transition-transform hover:-translate-y-[5px]">
              <h3 className="text-[#0055a5] mb-2 font-semibold text-lg">
                Đặt & Quản lý lịch
              </h3>
              <p>
                Đặt lịch, hủy/đổi lịch, nhắc lịch tự động và quản lý buổi gặp trực
                tiếp hoặc trực tuyến.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[10px] shadow-md transition-transform hover:-translate-y-[5px]">
              <h3 className="text-[#0055a5] mb-2 font-semibold text-lg">
                Phản hồi & Đánh giá
              </h3>
              <p>
                Sinh viên phản hồi chất lượng, tutor theo dõi tiến bộ, khoa/bộ môn
                khai thác dữ liệu đánh giá.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[10px] shadow-md transition-transform hover:-translate-y-[5px]">
              <h3 className="text-[#0055a5] mb-2 font-semibold text-lg">
                Báo cáo & Thống kê
              </h3>
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
