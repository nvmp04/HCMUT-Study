import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import logo from '../../assets/logo.png'
import "../../style/footer.css";

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
                <em>(Bản đồ)</em>
            </p>
            <p>
                ▶ Cơ sở 2: Khu phố Tân Lập, Phường Đông Hòa, TP.HCM{" "}
                <em>(Bản đồ)</em>
            </p>
        </div>

        <div className="footer-col">
            <h4>Thông tin liên hệ và hỗ trợ</h4>
            <p>Sinh viên</p>
            <p>▶ MyBK</p>
            <p>Quý khách</p>
            <p>▶ Email</p>
        </div>

        <div className="footer-col">
            <h4>LIÊN KẾT MẠNG XÃ HỘI</h4>
            <div className="social-icons">
                <a href="#"><Facebook /></a>
                <a href="#"><Instagram /></a>
                <a href="#"><Youtube /></a>
                <a href="#"><Linkedin /></a>
                <a href="#">
                <img
                    src="/assets/tiktok-icon.png"
                    alt="TikTok"
                    className="tiktok-icon"
                />
                </a>
            </div>
        </div>
        </div>
        </footer>
    );
}
