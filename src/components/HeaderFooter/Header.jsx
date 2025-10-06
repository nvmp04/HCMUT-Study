import logo from '../../assets/logo.png'
import { useAuth } from '../../hooks/useAuth';
import { LogOut, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutModal({ setIsOpen, isOpen }) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  function handleLogOut() {
    sessionStorage.clear();
    setAuth({ token: null, role: null });
    setIsOpen(false);
    navigate('/');
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[1000] ${
        isOpen ? 'flex' : 'hidden'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm cursor-pointer"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-[448px] mx-4 z-[1001]">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-[#fb923c]" strokeWidth={3} />
          </div>
        </div>

        <h2 className="text-[30px] font-bold text-[#1f2937] text-center mb-4">
          Đăng xuất
        </h2>

        <p className="text-[#4b5563] text-center mb-8 text-[18px] leading-[1.6]">
          Bạn có chắc bạn muốn đăng xuất?
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 py-3 px-6 rounded-lg text-[16px] font-semibold bg-[#e5e7eb] text-[#374151] hover:bg-[#d1d5db] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogOut}
            className="flex-1 py-3 px-6 rounded-lg text-[16px] font-semibold bg-[#ef4444] text-white hover:bg-[#dc2626] transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <LogoutModal setIsOpen={setIsOpen} isOpen={isOpen} />
      <header className="flex items-center pt-[10px] pb-[10px] bg-[#00274d] text-white">
        <img src={logo} className="ml-[4%] mr-[1%] w-[50px]" alt="logo" />
        <div className="font-bold">
          <p className="text-[8px]">ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH</p>
          <h2 className="text-[12px]">TRƯỜNG ĐẠI HỌC BÁCH KHOA</h2>
        </div>
        <nav className="flex items-center ml-auto mr-[2%] gap-6">
          <a href="/" className="text-white font-medium hover:underline">
            Trang chủ
          </a>
          <a href="#about" className="text-white font-medium hover:underline">
            Giới thiệu
          </a>
          <a href="#contact" className="text-white font-medium hover:underline">
            Liên hệ
          </a>
          {auth.token && (
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-[2px] text-[13px] font-medium py-[5px] px-[10px] bg-[#ef4444] text-white rounded-lg border-0 hover:bg-[#dc2626] transition-colors"
            >
              <LogOut size={20} />
              <span>Đăng xuất</span>
            </button>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;
