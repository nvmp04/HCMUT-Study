import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Calendar, Clock, Zap, Book, Search, RefreshCcw } from "lucide-react";
import { useRoleSwitch } from "../../features/auth/hooks/useRoleSwitch";

function NavigationBar() {
  const role = sessionStorage.getItem('role');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { switchRole, canSwitchToTutor, needsTutorRegistration } = useRoleSwitch();

  const navItems = role === 'student' 
    ? [
        { to: '/student', icon: Home, label: 'Trang Chủ' },
        { to: '/student/schedule', icon: Search, label: 'Đặt Lịch' },
        { to: '/student/myschedule', icon: Calendar, label: 'Lịch Của Tôi' },
        { to: '/student/ai', icon: Zap, label: 'Lộ Trình' },
        { to: '/student/library', icon: Book, label: 'Thư Viện' },
      ]
    : [
        { to: '/tutor', icon: Home, label: 'Trang Chủ' },
        { to: '/tutor/myschedule', icon: Calendar, label: 'Lịch Dạy' },
        { to: '/tutor/appointments', icon: Clock, label: 'Lịch Hẹn' },
        { to: '/tutor/mystudent', icon: Zap, label: 'Học Viên' },
        { to: '/tutor/library', icon: Book, label: 'Thư Viện' },
      ];

  const targetRole = role === 'student' ? 'tutor' : 'student';

  const handleRoleSwitch = () => {
    if (targetRole === 'tutor' && needsTutorRegistration) {
      navigate('/tutor-onboarding');
      return;
    }
    switchRole(targetRole);
  };

  return (
    <div className="fixed top-24 left-0 w-full flex justify-center z-40 pointer-events-none">
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 bg-[#050810]/60 backdrop-blur-xl p-1.5 rounded-full border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] pointer-events-auto"
      >
        {/* MAP NAV ITEMS */}
        {navItems.map((item) => {
          const isActive = pathname === item.to;
          const Icon = item.icon;
          
          return (
            <Link key={item.to} to={item.to} className="relative px-5 py-2.5 transition-all">
              <div className={`flex items-center gap-2 z-10 relative transition-colors duration-300
                ${isActive ? 'text-slate-950' : 'text-slate-400 hover:text-white'}`}>
                <Icon size={14} strokeWidth={isActive ? 3 : 2} />
                <span className="text-[9px] font-[1000] uppercase tracking-[0.2em]">{item.label}</span>
              </div>
              
              {isActive && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-emerald-500 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}

        {/* DIVIDER MẢNH */}
        <div className="w-[1px] h-4 bg-white/10 mx-2" />

        {/* NÚT SWITCH ROLE TÍCH HỢP TRONG PILL */}
        <button
          onClick={handleRoleSwitch}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-white/[0.03] transition-all"
          title={`Chuyển sang ${targetRole === 'student' ? 'Học Viên' : 'Gia Sư'}`}
        >
          <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
          <span className="text-[9px] font-black uppercase tracking-widest italic">
            Làm <span className="text-emerald-500">{targetRole === 'student' ? 'Học Viên' : 'Gia Sư'}</span>
          </span>
        </button>
      </motion.div>
    </div>
  );
}

export default NavigationBar;