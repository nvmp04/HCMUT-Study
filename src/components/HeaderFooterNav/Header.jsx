import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, MessageSquare, ChevronDown } from 'lucide-react';
import { LogoutModal } from '../LogoutModal';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useProfile } from '../../features/profile/hooks/useProfile';
import NotificationDropdown from '../Notification/NotificationDropDown';
import logo from '../../assets/logo.png';
import avt from '../../assets/avt.jpg';

// --- COMPONENT: LOGO ---
const LogoSection = ({ role }) => (
  <Link to={role ? `/${role}` : '/'} className="flex items-center gap-3 group">
    <div className="bg-emerald-500 p-2 rounded-xl transition-transform group-hover:rotate-6 duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
      <img src={logo} className="w-6 h-6 brightness-0" alt="logo" />
    </div>
    <div className="hidden sm:block">
      <h2 className="text-lg font-[1000] text-white tracking-tighter uppercase leading-none">
        Alpha<span className="text-emerald-500">Tutor</span>
      </h2>
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Bách Khoa Mentor</p>
    </div>
  </Link>
);

// --- COMPONENT: USER ACTIONS ---
function UserActions({ isProfileOpen, setIsProfileOpen, dropdownRef, onLogoutClick }) {
  const { data: profile, isLoading } = useProfile();
  if (isLoading) return null;

  return (
    <>
      <div className="flex items-center bg-black/20 p-1 rounded-full border border-white/5">
        <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors">
          <MessageSquare className="w-5 h-5" />
        </button>
        <div className="p-2 text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer">
          <NotificationDropdown />
        </div>
      </div>

      <div className="w-[1px] h-4 bg-white/10 mx-3 hidden md:block"></div>

      {/* Profile Trigger */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          
        >
          <div className="relative">
            <img src={avt} alt="User" className="w-8 h-8 rounded-full border border-emerald-500/20 object-cover" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-[#020617] rounded-full"></div>
          </div>
        </button>

        {/* Profile Dropdown - Fix màu #020617 đồng bộ tuyệt đối */}
        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="absolute right-0 mt-4 w-64 bg-[#020617] rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-white/10 z-50 overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-white/5 bg-white/[0.01]">
                <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-1 italic">Authorized Access</p>
                <p className="text-sm font-bold text-white truncate">{profile?.name}</p>
                <p className="text-[10px] text-slate-500 truncate font-medium">{profile?.email}</p>
              </div>
              <div className="p-2">
                <button
                  onClick={onLogoutClick}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black text-red-400 hover:bg-red-500/10 rounded-xl transition-all uppercase tracking-widest"
                >
                  <LogOut className="w-4 h-4" /> Đăng xuất
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// --- MAIN HEADER ---
function Header() {
  const { auth } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <LogoutModal isOpen={isLogoutModalOpen} setIsOpen={setIsLogoutModalOpen} />
      
      <motion.header
        className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#020617] transform-gpu"
        style={{ isolation: 'isolate' }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-[80px] flex items-center justify-between">
          
          <LogoSection role={auth.role} />

          <div className="flex items-center gap-3">
            {auth.token ? (
              <UserActions
                isProfileOpen={isProfileOpen}
                setIsProfileOpen={setIsProfileOpen}
                dropdownRef={dropdownRef}
                onLogoutClick={() => {
                    setIsLogoutModalOpen(true);
                    setIsProfileOpen(false);
                }}
              />
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-3 bg-emerald-500 text-slate-950 text-[10px] font-[1000] uppercase tracking-[0.2em] rounded-full hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
              >
                Bắt đầu ngay
              </button>
            )}
          </div>
          
        </div>
      </motion.header>
    </>
  );
}

export default Header;