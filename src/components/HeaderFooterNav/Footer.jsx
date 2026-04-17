import { Facebook, Instagram, Youtube, Mail, MapPin, ArrowUpRight } from "lucide-react";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/truongdhbachkhoa?locale=vi_VN", label: "FB" },
    { icon: Instagram, href: "https://www.instagram.com/truongdaihocbachkhoa.1957/", label: "IG" },
    { icon: Youtube, href: "https://www.youtube.com/@bkoisp", label: "YT" },
  ];

  return (
    <footer className="bg-[#050810] text-slate-400 relative overflow-hidden border-t border-white/5 font-sans">
      
      {/* 1. BACKGROUND DECORATION: Lưới grid mờ và glow nhẹ */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 md:px-16 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20"
        >
          {/* BRAND SECTION (2 COLUMNS WIDTH) */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <img src={logo} className="w-12 h-12 grayscale brightness-200" alt="logo" />
              <div>
                <h3 className="text-xl font-[1000] tracking-tighter text-white uppercase italic">
                  CONQUER
                </h3>
              </div>
            </div>
            
            <p className="max-w-sm text-sm leading-relaxed font-light italic">
              "Khai phá tiềm năng học thuật thông qua kết nối Mentor-Student cấp độ cao. Hệ thống chuẩn hóa kiến thức nội bộ Bách Khoa."
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, color: "#10b981" }}
                    className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-500 transition-colors uppercase border border-white/5 px-4 py-2 rounded-full hover:bg-white/5"
                  >
                    <Icon size={14} /> {social.label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Nền tảng</h4>
            <ul className="space-y-4">
              {["Hệ thống Mentor", "Lịch trình", "Tài nguyên AI", "Cộng đồng"].map((item) => (
                <li key={item}>
                  <a href="#" className="group flex items-center gap-2 text-sm font-light hover:text-emerald-400 transition-all">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-emerald-500 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SUPPORT */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Hỗ trợ</h4>
            <ul className="space-y-4">
              {["Trung tâm HELP", "Điều khoản", "Bảo mật", "API Access"].map((item) => (
                <li key={item}>
                  <a href="#" className="group flex items-center gap-2 text-sm font-light hover:text-emerald-400 transition-all">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-emerald-500 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Kết nối</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <MapPin className="w-5 h-5 text-emerald-500 mt-1" />
                <div className="text-sm">
                  <p className="text-slate-300 font-bold uppercase tracking-tighter">Campus BK</p>
                  <p className="text-slate-500 font-light italic">268 Lý Thường Kiệt, Q.10</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <Mail className="w-5 h-5 text-emerald-500" />
                <a href="mailto:tutor@hcmut.edu.vn" className="text-sm font-light hover:text-emerald-400 transition-colors">
                  tutor@hcmut.edu.vn
                </a>
              </div>
              <button className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:gap-4 transition-all">
                Gửi yêu cầu hỗ trợ <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-700">
               © 2026 CONQUER • PHÁT TRIỂN BỞI NGUYỄN VIỆT MINH PHÚ
             </p>
          </div>
          
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-500 transition-colors underline decoration-emerald-500/20 underline-offset-4">Cookie Settings</a>
          </div>
        </div>
      </div>

      {/* Trang trí góc dưới */}
      <div className="absolute bottom-[-5%] right-[-5%] w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />
    </footer>
  );
}