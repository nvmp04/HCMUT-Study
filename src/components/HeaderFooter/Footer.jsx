import { Facebook, Instagram, Play, Youtube } from "lucide-react";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#00274d] text-white p-8 text-[0.95rem]">
      <div className="flex justify-between flex-wrap gap-8">
        <div>
          <div className="flex mb-[10%]">
            <img src={logo} className="w-[60px] mb-4 mr-2" alt="logo" />
            <div className="logo">
              <p className="text-[0.8rem]">ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH</p>
              <h3 className="text-[1.1rem] font-bold my-1">
                TRƯỜNG ĐẠI HỌC BÁCH KHOA
              </h3>
            </div>
          </div>
          <p className="my-[0.2rem]">
            ▶ Cơ sở 1: 268 Lý Thường Kiệt, Phường Diên Hồng, TP.HCM{" "}
          </p>
          <p className="my-[0.2rem]">
            ▶ Cơ sở 2: Khu phố Tân Lập, Phường Đông Hòa, TP.HCM{" "}
          </p>
        </div>

        <div className="flex flex-col items-center flex-1 min-w-[220px]">
          <h4 className="text-[1rem] font-semibold mb-[0.8rem]">
            Thông tin liên hệ và hỗ trợ
          </h4>
          <p className="my-[0.2rem]">Sinh viên</p>
          <a
            href="https://mybk.hcmut.edu.vn/my/index.action"
            className="my-[0.2rem] flex items-center"
          >
             ▶ MyBK
          </a>
        </div>

        <div className="flex flex-col items-center flex-1 min-w-[220px]">
          <h4 className="text-[1rem] font-semibold mb-[0.8rem]">
            LIÊN KẾT MẠNG XÃ HỘI
          </h4>
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.facebook.com/truongdhbachkhoa?locale=vi_VN"
              className="flex items-center justify-center text-white text-[1.5rem] transition duration-300 "
            >
              <Facebook className="hover:text-[#00aced]"/>
            </a>
            <a
              href="https://www.instagram.com/truongdaihocbachkhoa.1957/"
              className="flex items-center justify-center text-white text-[1.5rem] transition duration-300 "
            >
              <Instagram className="hover:text-[#e900ed]"/>
            </a>
            <a
              href="https://www.youtube.com/@bkoisp"
              className="flex items-center justify-center text-white text-[1.5rem] transition duration-300 "
            >
              <Youtube className="hover:text-[#ed0000]"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
