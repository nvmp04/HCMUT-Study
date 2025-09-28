import "../../style/UserHomepage/userHeader.css";
import { Home } from "lucide-react";

function UserHeader() {
  return (
    <div className="main-header">
        <div className="menu">
          <div className="menu-item home-icon">
            <Home />
          </div>
          <div className="menu-item"><a href="">ĐẶT LỊCH</a></div>
          <div className="menu-item">GHÉP CẶP TUTOR</div>
          <div className="menu-item">LỊCH CỦA TÔI</div>
          <div className="menu-item">TIẾN ĐỘ HỌC TẬP</div>
          <div className="menu-item">THƯ VIỆN</div>
        </div>
    </div>
  );
}
export default UserHeader;
