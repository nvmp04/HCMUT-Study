export default function Features(){
    return (
        <section
          id="features"
          className="py-16 px-8 max-w-[1100px] mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-[2rem] mb-3 text-[#014181] font-bold">
              Các tính năng
            </h2>
            <div className="w-20 h-1 bg-[#014181] mx-auto"></div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8 mt-12">
            <div className="bg-white p-8 border-t-4 border-[#014181] shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#014181] text-white flex items-center justify-center text-2xl font-bold mb-4">
                01
              </div>
              <h3 className="text-[#014181] mb-3 font-bold text-lg">
                Quản lý thông tin
              </h3>
              <p className="text-[#555] leading-relaxed">
                Hồ sơ cá nhân, lĩnh vực chuyên môn, nhu cầu hỗ trợ của sinh viên
                và tutor.
              </p>
            </div>

            <div className="bg-white p-8 border-t-4 border-[#014181] shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#014181] text-white flex items-center justify-center text-2xl font-bold mb-4">
                02
              </div>
              <h3 className="text-[#014181] mb-3 font-bold text-lg">
                Đặt & Quản lý lịch
              </h3>
              <p className="text-[#555] leading-relaxed">
                Đặt lịch, hủy/đổi lịch, nhắc lịch tự động và quản lý buổi gặp trực
                tiếp hoặc trực tuyến.
              </p>
            </div>

            <div className="bg-white p-8 border-t-4 border-[#014181] shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#014181] text-white flex items-center justify-center text-2xl font-bold mb-4">
                03
              </div>
              <h3 className="text-[#014181] mb-3 font-bold text-lg">
                Phản hồi & Đánh giá
              </h3>
              <p className="text-[#555] leading-relaxed">
                Sinh viên phản hồi chất lượng, tutor theo dõi tiến bộ, khoa/bộ môn
                khai thác dữ liệu đánh giá.
              </p>
            </div>

            <div className="bg-white p-8 border-t-4 border-[#014181] shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#014181] text-white flex items-center justify-center text-2xl font-bold mb-4">
                04
              </div>
              <h3 className="text-[#014181] mb-3 font-bold text-lg">
                Báo cáo & Thống kê
              </h3>
              <p className="text-[#555] leading-relaxed">
                Hỗ trợ phòng Đào tạo và Công tác Sinh viên theo dõi, xét điểm rèn
                luyện và học bổng.
              </p>
            </div>
          </div>
        </section>
    )
}