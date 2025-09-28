import "../../style/UserHomepage/userHeader.css";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
function UserHeader() {
  return (
    <div className="main-header">
        <div className="menu">
          <Link to='/user/home' className="menu-item home-icon">
            <Home />
          </Link>
          <Link to='/user/schedule' className="menu-item">
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
export default UserHeader;
