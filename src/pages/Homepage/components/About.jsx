import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function About() {
  const standards = [
    {
      no: "01",
      title: "Đội ngũ Mentor uy tín",
      description: "Chúng tôi không chỉ chọn người giỏi, chúng tôi chọn những chuyên gia có khả năng truyền đạt và tư duy thực chiến."
    },
    {
      no: "02",
      title: "Cá nhân hóa lộ trình",
      description: "Không có giáo trình chung cho tất cả. Mọi buổi học đều được thiết kế riêng dựa trên lỗ hổng kiến thức của bạn."
    },
    {
      no: "03",
      title: "Minh bạch & An toàn",
      description: "Hệ thống thanh toán và đánh giá được vận hành tự động, đảm bảo quyền lợi tuyệt đối cho cả người học và người dạy."
    }
  ];

  return (
    <section id="about" className="py-32 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        
        {/* Header Section: Left Aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-emerald-500 font-black text-[10px] tracking-[0.5em] uppercase">
              Our Vision
            </p>
            <h2 className="text-5xl md:text-7xl font-[1000] tracking-tighter uppercase leading-[0.9]">
              Tiêu chuẩn <br />
              <span className="text-slate-700 italic font-light lowercase tracking-normal">mới trong</span> <br />
              Giáo dục.
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 text-xl font-light leading-relaxed max-w-md pb-2"
          >
            Chúng tôi tin rằng giáo dục hiệu quả nhất đến từ sự kết nối giữa người đi trước và người đi sau. Không rườm rà, tập trung thẳng vào mục tiêu.
          </motion.p>
        </div>

        {/* The Standards: Typography-focused List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border-y border-white/5">
          {standards.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-12 hover:bg-emerald-500/5 transition-colors duration-500 border-r last:border-r-0 border-white/5"
            >
              <span className="text-5xl font-black text-slate-800 group-hover:text-emerald-500/20 transition-colors">
                {item.no}
              </span>
              <h3 className="text-xl font-bold mt-8 mb-4 uppercase tracking-widest text-emerald-400">
                {item.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-light">
                {item.description}
              </p>
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="text-emerald-500" size={24} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Background Element */}
        <div className="mt-32 flex justify-center">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}