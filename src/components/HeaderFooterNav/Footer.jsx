import { Facebook, Instagram, Youtube, Mail, MapPin } from "lucide-react";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/truongdhbachkhoa?locale=vi_VN", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/truongdaihocbachkhoa.1957/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@bkoisp", label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="col-span-1">
              <div className="flex items-start gap-3 mb-6">
                <img src={logo} className="w-14 h-14 rounded-xl shadow-soft" alt="logo" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">HCMUT</p>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent leading-tight">
                    Tutor Program
                  </h3>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Kết nối sinh viên với các tutor giàu kinh nghiệm để hỗ trợ học tập chuyên nghiệp.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, backgroundColor: "#4F46E5" }}
                      className="p-2.5 bg-slate-800 hover:bg-primary-600 rounded-lg transition-all duration-300"
                      title={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="col-span-1">
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wide">Sản Phẩm</h4>
              <ul className="space-y-3">
                {["Các Tính Năng", "Giáo Viên", "Học Viên", "An Toàn"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div variants={itemVariants} className="col-span-1">
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wide">Hỗ Trợ</h4>
              <ul className="space-y-3">
                {["Trung Tâm Trợ Giúp", "Tài Liệu", "Cộng Đồng", "Trạng Thái"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="col-span-1">
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wide">Liên Hệ</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-slate-400">268 Lý Thường Kiệt</p>
                    <p className="text-slate-500 text-xs">TP.HCM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <a href="mailto:tutor@hcmut.edu.vn" className="text-slate-400 hover:text-primary-400 transition-colors text-sm">
                    tutor@hcmut.edu.vn
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-slate-800 my-8"
          />

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400"
          >
            <p>© 2024 HCMUT Tutor Program. Bảo lưu mọi quyền.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary-400 transition-colors">
                Chính Sách Bảo Mật
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Điều Khoản Dịch Vụ
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Tùy Chọn Cookie
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
