import logo from '../../assets/logo.png'
import { useAuth } from '../../hooks/useAuth';
import '../../style/HeaderFooter/header.css'
import { LogOut, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutModal({setIsOpen, isOpen}) {
  const navigate = useNavigate();
  const {setAuth} = useAuth();
  function handleLogOut() {
    sessionStorage.clear();
    setAuth({token: null, role: null});
    setIsOpen(false);
    navigate('/')
  };

  return (
        <div className="modal-overlay" style={{display: isOpen ? 'flex' : 'none'}} >
          <div className="modal-backdrop" onClick={()=>setIsOpen(false)} />
          
          <div className="modal-content">
            <div className="modal-icon">
              <div className="icon-circle">
                <AlertCircle className="icon" strokeWidth={3} />
              </div>
            </div>
            
            <h2 className="modal-title">Đăng xuất</h2>
            
            <p className="modal-text">
              Bạn có chắc bạn muốn đăng xuất?
            </p>
            
            <div className="modal-buttons">
              <button onClick={()=>setIsOpen(false)} className="btn btn-cancel">
                Cancel
              </button>
              <button onClick={()=>handleLogOut()} className="btn btn-ok">
                OK
              </button>
            </div>
          </div>
        </div>
  )
}
function Header(){
    const {auth} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
        <LogoutModal setIsOpen={setIsOpen} isOpen={isOpen}/>
        <header className="header">
            <img src={logo} className="logoImg" alt="logo" />
            <div className="logo">
                <p>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH</p>
                <h2>TRƯỜNG ĐẠI HỌC BÁCH KHOA</h2>
            </div>
            <nav className="nav">
                <a href="/">Trang chủ</a>
                <a href="#about">Giới thiệu</a>
                <a href="#contact">Liên hệ</a>
                {auth.token && <button className="" onClick={()=>setIsOpen(true)}>
                    <LogOut size={20} />
                    <span>Đăng xuất</span>
                </button>}
            </nav>
        </header>
        </>
    )
}
export default Header;