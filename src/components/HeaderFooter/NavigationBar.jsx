import { Home, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Xác nhận lịch học thành công',
      message: 'Lịch học "Cấu trúc dữ liệu" vào 10:00 - 05/10/2025 đã được xác nhận.',
      time: '5 phút trước',
      read: false
    },
    {
      id: 2,
      type: 'cancel',
      title: 'Lịch học đã bị hủy',
      message: 'Buổi học "Lập trình Web" vào 14:00 - 07/10/2025 đã bị hủy. Lý do: Tutor có việc đột xuất.',
      time: '1 giờ trước',
      read: false
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Nhắc nhở: Buổi học sắp diễn ra',
      message: 'Buổi học "Cơ sở dữ liệu" sẽ bắt đầu sau 30 phút tại phòng H6-305.',
      time: '2 giờ trước',
      read: true
    },
    {
      id: 4,
      type: 'reschedule',
      title: 'Yêu cầu đổi lịch được chấp nhận',
      message: 'Lịch học "Trí tuệ nhân tạo" đã được đổi sang 15:00 - 08/10/2025.',
      time: '1 ngày trước',
      read: true
    }
  ]);

  const dropdownRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <span className="cursor-pointer relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[0.625rem] font-semibold rounded-full w-[1.15rem] h-[1.125rem] flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </span>

      {isOpen && (
        <div className="absolute top-[calc(100%+0.5rem)] right-0 w-[380px] max-h-[500px] bg-white rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.15)] z-[1000] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-800 m-0">Thông báo</h3>
            {unreadCount > 0 && (
              <button
                className="text-blue-500 text-xs cursor-pointer px-2 py-1 rounded transition-colors hover:bg-blue-50"
                onClick={markAllAsRead}
              >
                Đánh dấu đã đọc
              </button>
            )}
          </div>

          <div className="overflow-y-auto max-h-[360px]">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex gap-3 px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors relative ${
                    !notif.read ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{notif.title}</h4>
                    <p className="text-[0.8125rem] text-gray-500 leading-snug line-clamp-2 mb-1">{notif.message}</p>
                    <span className="text-xs text-gray-400">{notif.time}</span>
                  </div>
                  {!notif.read && (
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="m-0 text-gray-400 text-sm">Không có thông báo mới</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NavigationBar() {
  const role = sessionStorage.getItem('role');
  let headerLinks;
  if (role === 'student')  
    headerLinks = [
    { to: '/student/schedule', name: 'ĐẶT LỊCH' },
    { to: '/student/pairing', name: 'GHÉP CẶP TUTOR' },
    { to: '/student/myschedule', name: 'LỊCH CỦA TÔI' },
    { to: '/student/progress', name: 'TIẾN ĐỘ HỌC TẬP' },
    { to: '/student/library', name: 'THƯ VIỆN' }
  ]
  else if (role === 'tutor')
    headerLinks = [
    { to: '/tutor/myschedule', name: 'LỊCH CỦA TÔI' },
    { to: '/tutor/', name: 'HỌC VIÊN CỦA TÔI' },
    { to: '/tutor/library', name: 'THƯ VIỆN' }
  ];
  else return;
  const { pathname } = useLocation();

  return (
    <div className="sticky top-0 z-10 mt-[2px] bg-white h-[50px] border-b border-gray-300">
      <div className="flex items-center justify-center h-full gap-12 list-none p-0 m-0">
        <Link
          to={'/' + role}
          className={`flex items-center justify-center h-full px-5 font-semibold text-sm sm:text-base md:text-[1.1rem] cursor-pointer ${
            pathname === '/'+role ? "bg-[#00274d] text-white" : "text-[#222] hover:bg-[#00274d] hover:text-white"
          }`}
        >
          <Home className="text-xl" />
        </Link>

        {headerLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center justify-center h-full px-5 font-semibold text-sm sm:text-base md:text-[1.1rem] cursor-pointer ${
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
