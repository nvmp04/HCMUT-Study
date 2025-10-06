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
    <section className="py-4 px-4 sm:px-8 lg:px-[10rem]">
      <div className="flex flex-col gap-12">
        {benefits.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-start ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Tiêu đề */}
            <div className="relative inline-flex items-center gap-2 bg-[#0a2a66] text-white font-semibold py-2 px-4 border-2 border-[#0a2a66] min-h-[50px] z-10">
              {item.icon}
              <span className="text-sm sm:text-base">{item.title}</span>
              <span className="absolute bottom-[-6px] right-[-6px] w-full h-full border-2 border-[#0a2a66] z-[-1]"></span>
            </div>

            {/* Nội dung mô tả */}
            <div
              className={`bg-[#e6f2ff] rounded-md mt-2 md:mt-[0.8rem] py-3 px-5 w-full md:max-w-[600px] ${
                index % 2 === 1 ? "md:mr-auto" : "md:ml-auto"
              }`}
            >
              <p className="text-sm sm:text-base">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
