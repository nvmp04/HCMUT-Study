import { BookOpen, Target, Handshake, Award } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Hỗ trợ học tập",
      desc: "Được hướng dẫn trực tiếp từ tutor giàu kinh nghiệm.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Định hướng phát triển",
      desc: "Xây dựng kỹ năng mềm, quản lý thời gian, nghiên cứu.",
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      title: "Kết nối cộng đồng",
      desc: "Tạo dựng mối quan hệ học tập, hỗ trợ lâu dài.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Ghi nhận & đánh giá",
      desc: "Phản hồi từ tutor được tính vào điểm rèn luyện, học bổng.",
    },
  ];

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[2rem] mb-3 text-[#014181] font-bold">
            Lợi ích của chương trình
          </h2>
          <div className="w-20 h-1 bg-[#014181] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-[#f8f9fa] p-6 border-l-4 border-[#014181] hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#014181] text-white flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[#014181] font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#555] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}