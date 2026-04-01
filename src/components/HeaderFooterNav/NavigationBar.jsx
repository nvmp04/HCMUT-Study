import { Home, Calendar, Clock, Zap, Book, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function NavigationBar() {
  const role = sessionStorage.getItem('role');
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname } = useLocation();

  let navItems = [];
  if (role === 'student') {
    navItems = [
      { to: '/student', icon: Home, label: 'Trang Chủ' },
      { to: '/student/schedule', icon: Calendar, label: 'Đặt Lịch' },
      { to: '/student/myschedule', icon: Clock, label: 'Lịch' },
      { to: '/student/ai', icon: Zap, label: 'Lộ Trình' },
      { to: '/student/library', icon: Book, label: 'Thư Viện' },
    ];
  } else if (role === 'tutor') {
    navItems = [
      { to: '/tutor', icon: Home, label: 'Trang Chủ' },
      { to: '/tutor/myschedule', icon: Calendar, label: 'Lịch' },
      { to: '/tutor/appointments', icon: Clock, label: 'Hẹn' },
      { to: '/tutor/mystudent', icon: Zap, label: 'Học Viên' },
      { to: '/tutor/library', icon: Book, label: 'Thư Viện' },
    ];
  } else return null;

  return (
    <motion.nav
      className={`fixed z-40 transition-all duration-300 ease-in-out
        /* Mobile */
        bottom-0 left-0 w-full h-16 flex flex-row bg-[#0F172A] border-t border-slate-800
        /* Desktop */
        md:bottom-auto md:top-[88px] md:left-4 md:flex-col md:rounded-2xl md:border md:h-[calc(100vh-110px)]
        ${isExpanded ? 'md:w-64' : 'md:w-[72px]'} 
      `}
    >
      {/* 1. Toggle Button Container - FIXED WIDTH ANCHOR */}
      <div className="hidden md:block h-20 border-b border-slate-800/50 relative flex-shrink-0">
        <div className="absolute left-0 top-0 w-[72px] h-full flex items-center justify-center">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300
              ${isExpanded 
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 shadow-[0_0_15px_rgba(79,70,229,0.2)]' 
                : 'text-slate-400 hover:bg-slate-800'
              }`}
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 2. Navigation Items */}
      <div className="flex-1 flex flex-row md:flex-col gap-1 p-2 w-full justify-around md:justify-start overflow-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col md:flex-row items-center rounded-xl transition-all relative group
                h-12 md:h-14 w-full overflow-hidden
                ${isActive
                  ? 'text-indigo-400 md:bg-indigo-600 md:text-white md:shadow-lg md:shadow-indigo-900/40'
                  : 'text-slate-500 md:text-slate-400 hover:text-slate-200 md:hover:bg-slate-800/50'
                }
              `}
            >
              {/* Icon Container - Cố định width bằng width của sidebar lúc thu gọn */}
              <div className="flex-shrink-0 w-full md:w-[56px] h-full flex items-center justify-center ml-0 md:ml-[0.5px]">
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>

              {/* Label - Dùng animate presence và layout để tránh giật */}
              <div className="hidden md:block flex-1">
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.2 }}
                      className="font-bold text-sm whitespace-nowrap pl-2 block"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Label cho Mobile */}
              <span className="md:hidden text-[10px] font-bold tracking-tight">
                {item.label}
              </span>

              {/* Tooltip khi thu gọn */}
              {!isExpanded && (
                <div className="hidden md:block absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded border border-slate-700 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 uppercase tracking-tighter">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}

export default NavigationBar;