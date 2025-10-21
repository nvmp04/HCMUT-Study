import { Home, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import NotificationDropdown from "../Notification/NotificationDropDown";

function NavigationBar() {
  const role = sessionStorage.getItem('role');
  let headerLinks;
  if (role === 'student')  
    headerLinks = [
    { to: '/student/schedule', name: 'ĐẶT LỊCH' },
    { to: '/student/myschedule', name: 'LỊCH CỦA TÔI' },
    { to: '/student/ai', name: 'TRỢ LÝ AI' },
    { to: '/student/library', name: 'THƯ VIỆN' }
  ]
  else if (role === 'tutor')
    headerLinks = [
    { to: '/tutor/myschedule', name: 'LỊCH CỦA TÔI' },
    { to: '/tutor/appointments', name: 'CÁC CUỘC HẸN'},
    { to: '/tutor/mystudent', name: 'HỌC VIÊN CỦA TÔI' },
    { to: '/tutor/library', name: 'THƯ VIỆN' }
  ];
  else return null;

  const { pathname } = useLocation();

  return (
    <div className="sticky top-0 z-11 mt-[2px] bg-white h-[50px] border-b border-gray-300">
      <div className="flex items-center justify-center h-full gap-5 list-none p-0 m-0">
        <Link
          to={'/' + role}
          className={`flex items-center justify-center h-full px-5 font-semibold text-[clamp(0.65rem,1.5vw,0.9rem)] cursor-pointer ${
            pathname === '/'+role ? "bg-[#00274d] text-white" : "text-[#222] hover:bg-[#00274d] hover:text-white"
          }`}
        >
          <Home className="text-xl" />
        </Link>

        {headerLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center justify-center h-full px-5 font-semibold text-[clamp(0.65rem,1.5vw,0.9rem)] cursor-pointer ${
              pathname === link.to
                ? "bg-[#00274d] text-white"
                : "text-[#222] hover:bg-[#00274d] hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}

        <NotificationDropdown />
      </div>
    </div>
  );
}

export default NavigationBar;
