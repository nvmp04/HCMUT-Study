export default function About(){
    return (
        <section id="about" className="py-16 px-8 max-w-[1100px] mx-auto">
          <div className="border-l-4 border-[#014181] pl-6 mb-12">
            <h2 className="text-[2rem] mb-2 text-[#014181] font-bold">Mục tiêu</h2>
            <div className="w-16 h-1 bg-[#014181]/20 mb-6"></div>
            <p className="text-[1.05rem] text-[#333] leading-relaxed max-w-[900px]">
              Hệ thống được xây dựng nhằm quản lý và vận hành chương trình Tutor
              hiệu quả, hiện đại, có khả năng mở rộng, đáp ứng nhu cầu thực tiễn
              trong môi trường giáo dục đại học.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 bg-white p-8 shadow-sm border-l-4 border-[#014181]/30">
            <div>
              <h3 className="text-[#014181] font-bold text-lg mb-2">Hiệu quả</h3>
              <p className="text-[#555] text-sm leading-relaxed">
                Tối ưu hóa quy trình kết nối giữa sinh viên và tutor, tiết kiệm thời gian và nguồn lực.
              </p>
            </div>

            <div>
              <h3 className="text-[#014181] font-bold text-lg mb-2">Hiện đại</h3>
              <p className="text-[#555] text-sm leading-relaxed">
                Ứng dụng công nghệ thông tin trong quản lý, theo dõi và đánh giá hoạt động hỗ trợ học tập.
              </p>
            </div>

            <div>
              <h3 className="text-[#014181] font-bold text-lg mb-2">Mở rộng</h3>
              <p className="text-[#555] text-sm leading-relaxed">
                Khả năng phát triển và tích hợp với các hệ thống khác trong trường đại học.
              </p>
            </div>
          </div>
        </section>
    )
}