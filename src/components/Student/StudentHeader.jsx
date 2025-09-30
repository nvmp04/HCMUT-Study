import "../../style/StudentHomepage/studentHeader.css";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
function StudentHeader() {
  return (
    <div className="main-header">
        <div className="menu">
          <Link to='/student' className="menu-item home-icon">
            <Home />
          </Link>
          <Link to='/student/schedule' className="menu-item">
            ĐẶT LỊCH
          </Link>
          <Link to='' className="menu-item">
            GHÉP CẶP TUTOR
          </Link>
          <Link to='' className="menu-item">LỊCH CỦA TÔI</Link>
          <Link to='' className="menu-item">TIẾN ĐỘ HỌC TẬP</Link>
          <Link to='' className="menu-item">THƯ VIỆN</Link>
        </div>
    </div>
  );
}
export default StudentHeader;
