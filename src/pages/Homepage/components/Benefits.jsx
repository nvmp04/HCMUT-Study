import { motion } from 'framer-motion';
import { BookOpen, Target, Handshake, Award, ArrowUpRight } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: <BookOpen size={24} />,
      title: 'Hỗ trợ chuyên sâu',
      desc: 'Nhận sự dẫn dắt trực tiếp từ những Mentor đã kinh qua các thách thức thực tế, tối ưu hóa phong cách học tập riêng biệt của bạn.',
    },
    {
      icon: <Target size={24} />,
      title: 'Phát triển sự nghiệp',
      desc: 'Không chỉ dừng lại ở kiến thức, bạn được rèn luyện kỹ năng mềm, quản lý thời gian và tư duy nghiên cứu chuyên nghiệp.',
    },
    {
      icon: <Handshake size={24} />,
      title: 'Mạng lưới kết nối',
      desc: 'Xây dựng mối quan hệ giá trị với cộng đồng chuyên gia và bạn đồng hành cùng chí hướng bứt phá.',
    },
    {
      icon: <Award size={24} />,
      title: 'Chứng nhận năng lực',
      desc: 'Sự tiến bộ của bạn được ghi nhận qua các cột mốc thực tế, giúp làm đẹp Profile và khẳng định vị thế cá nhân.',
    },
  ];

  return (
    <section id="benefits" className="py-32 bg-[#020617] text-white overflow-hidden relative">
      

      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        
        {/* Header - Minimal & Sharp */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-emerald-500 font-black text-[10px] tracking-[0.5em] uppercase mb-4">Values</p>
            <h2 className="text-5xl md:text-6xl font-[1000] tracking-tighter uppercase leading-none">
              GIÁ TRỊ <br /> ĐẶC QUYỀN.
            </h2>
          </motion.div>
          <p className="text-slate-500 text-lg font-light max-w-sm border-b border-white/5 pb-4">
            Hệ sinh thái toàn diện hỗ trợ sự tăng trưởng bền vững của cả tri thức và sự nghiệp.
          </p>
        </div>

        {/* Benefits Grid - Industrial & Border-focused */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {benefits.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-12 hover:bg-emerald-500/[0.02] transition-all duration-700 relative overflow-hidden"
            >
              {/* Hover Indicator */}
              <div className="absolute top-0 left-0 w-[2px] h-0 bg-emerald-500 group-hover:h-full transition-all duration-500"></div>
              
              <div className="flex flex-col gap-8">
                <div className="text-emerald-500 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {item.icon}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-light text-lg">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/10 group-hover:text-emerald-500 transition-colors">
                  Details <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section - Bỏ Badge rẻ tiền, dùng Typography sạch */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 pt-16 border-t border-white/5">
          <div className="flex flex-col gap-2">
            <span className="text-5xl font-black tracking-tighter">98%</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-[0.3em]">Hài lòng tuyệt đối</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-5xl font-black tracking-tighter">1.2K+</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-[0.3em]">Phiên học thực chiến</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-5xl font-black tracking-tighter">4.8/5</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-[0.3em]">Đánh giá chuyên gia</span>
          </div>
        </div>

      </div>
    </section>
  );
}