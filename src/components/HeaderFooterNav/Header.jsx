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




const LogoSection = ({ role }) => (
  <Link to={role ? `/${role}` : '/'} className="flex items-center gap-3">
    <div className="bg-indigo-600 p-2 rounded-xl">
      <img src={logo} className="w-8 h-8 brightness-0 invert" alt="logo" />
    </div>
    <div className="hidden sm:block">
      <h2 className="text-xl font-extrabold text-slate-900">Alpha<span className="text-indigo-600">Tutor</span></h2>
      <p className="text-[11px] font-semibold text-slate-500 uppercase">Bách Khoa Mentor</p>
    </div>
  </Link>
);

function  UserActions ({ isProfileOpen, setIsProfileOpen, dropdownRef, onLogoutClick }) {
  const {data: profile, isLoading} = useProfile();
  if(isLoading) return null;
  return <>
  <div className="flex items-center bg-slate-100/80 p-1 rounded-full border border-slate-200">
        <button className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-full transition-all">
          <MessageSquare className="w-5 h-5" />
        </button>
        <div className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-full transition-all cursor-pointer">
          <NotificationDropdown />
        </div>
      </div>

      <div className="w-[1px] h-6 bg-slate-300 mx-2 hidden md:block"></div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full bg-slate-900 text-white shadow-md hover:bg-indigo-950 transition-all"
        >
          <img src={avt} alt="User" className="w-8 h-8 rounded-full border border-white/20" />
          <span className="text-sm font-bold hidden md:inline-block">{profile?.name}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
            >
              <div className="bg-slate-50 px-5 py-4 border-b border-slate-200">
                <p className="text-base font-bold text-slate-900 truncate mt-1">{profile?.name}</p>
                <p className="text-xs text-slate-500 truncate">{profile?.email || 'student@hcmut.edu.vn'}</p>
              </div>
              <div className="p-2">
                <button
                  onClick={onLogoutClick}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Đăng xuất
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  </>
};

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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
          
          <LogoSection role={auth.role} />

          <div className="flex items-center gap-3">
            {/* Kiểm tra trực tiếp bằng auth.token */}
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
                className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                Đăng Nhập
              </button>
            )}
          </div>
          
        </div>
      </motion.header>
    </>
  );
}

export default Header;