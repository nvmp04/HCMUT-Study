import "../../style/StudentHomepage/studentHeader.css";
import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
function StudentHeader() {
  const headerLinks = [
    {
      to: '/student/schedule',
      name: 'ĐẶT LỊCH'
    },
    {
      to: '/student/pairing',
      name: 'GHÉP CẶP TUTOR'
    },
    {
      to: '/student/myschedule',
      name: 'LỊCH CỦA TÔI'
    },
    {
      to: '/student/progress',
      name: 'TIẾN ĐỘ HỌC TẬP'
    },
    {
      to: '/student/library',
      name: 'THƯ VIỆN'
    }
  ]
  const {pathname} = useLocation();
  return (
    <div className="main-header">
        <div className="menu">
          <Link 
          style={{
            backgroundColor: pathname === '/student' && '#00274d',
            color: pathname === '/student' && 'white'
          }}
          to='/student' 
          className="menu-item home-icon">
            <Home />
          </Link>
          {headerLinks.map((link)=>(
            <Link 
            style={{
              backgroundColor: pathname === link.to && '#00274d',
              color: pathname === link.to && 'white'
            }}
            to={link.to} 
            className="menu-item">
              {link.name}
            </Link>
          ))}
        </div>
    </div>
  );
}
export default StudentHeader;
