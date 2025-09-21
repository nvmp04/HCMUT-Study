import { BookOpen, Target, Handshake, Award } from "lucide-react";
import "../../style/benefits.css";

export default function Benefits() {
  const benefits = [
    {
      icon: <BookOpen className="benefit-icon" />,
      title: "Hỗ trợ học tập",
      desc: "Được hướng dẫn trực tiếp từ tutor giàu kinh nghiệm.",
    },
    {
      icon: <Target className="benefit-icon" />,
      title: "Định hướng phát triển",
      desc: "Xây dựng kỹ năng mềm, quản lý thời gian, nghiên cứu.",
    },
    {
      icon: <Handshake className="benefit-icon" />,
      title: "Kết nối cộng đồng",
      desc: "Tạo dựng mối quan hệ học tập, hỗ trợ lâu dài.",
    },
    {
      icon: <Award className="benefit-icon" />,
      title: "Ghi nhận & đánh giá",
      desc: "Phản hồi từ tutor được tính vào điểm rèn luyện, học bổng.",
    },
  ];

  return (
    <section className="benefits-alt">
      <div className="benefits-list">
        {benefits.map((item, index) => (
          <div
            className={`benefit-block ${index % 2 === 1 ? "reverse" : ""}`}
            key={index}>
            <div className="benefit-title-box">
              {item.icon}
              <span>{item.title}</span>
            </div>
            <div className="benefit-desc-box">
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
