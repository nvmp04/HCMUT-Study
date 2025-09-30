import {
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import logo from '../../assets/logo.png'
import "../../style/HeaderFooter/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="">
            <div className="logo-footer">
                <img src={logo} className="logoImg" alt="logo" />
                <div className="logo">
                    <p>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH</p>
                    <h2>TRƯỜNG ĐẠI HỌC BÁCH KHOA</h2>
                </div>
            </div>
            <p>
                ▶ Cơ sở 1: 268 Lý Thường Kiệt, Phường Diên Hồng, TP.HCM{" "}
            </p>
            <p>
                ▶ Cơ sở 2: Khu phố Tân Lập, Phường Đông Hòa, TP.HCM{" "}
            </p>
        </div>

        <div className="footer-col">
            <h4>Thông tin liên hệ và hỗ trợ</h4>
            <p>Sinh viên</p>
            <a href="https://mybk.hcmut.edu.vn/my/index.action">▶ MyBK</a>
        </div>

        <div className="footer-col">
            <h4>LIÊN KẾT MẠNG XÃ HỘI</h4>
            <div className="social-icons">
                <a href="https://www.facebook.com/truongdhbachkhoa?locale=vi_VN" className="fb"><Facebook /></a>
                <a href="https://www.instagram.com/truongdaihocbachkhoa.1957/" className="ig"><Instagram /></a>
                <a href="https://www.youtube.com/@bkoisp" className="yt"><Youtube /></a>
            </div>
        </div>
        </div>
        </footer>
    );
}
