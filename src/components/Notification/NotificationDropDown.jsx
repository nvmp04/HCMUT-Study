import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { fetchAPI } from "../../utils/fetchAPI";
import { useSocket } from "../../features/websocket/hooks/useSocket";
import { API_BASE_URL } from "../../config/api.config";

export default function NotificationDropdown() {
  const {socket} = useSocket();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const id = sessionStorage.getItem('id');
  const url = API_BASE_URL + '/notification/get'
  const {data, isLoading} = useQuery({
    queryKey: ['getnotifications'], 
    queryFn: ()=> fetchAPI(url, 'GET', null, true)
  })
  useEffect(()=>{
    if(!socket) return;
    function handleEvent({notifId}){
      queryClient.invalidateQueries(['getnotifications']);
    }
    socket.on('notification', handleEvent);
    return () => {
      socket.off('notification', handleEvent);
    };
  },[id, socket]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if(isLoading) return <></>
  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    if (diff < 60) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days === 1) return "Hôm qua";
    if (days < 6) return `${days} ngày trước`;
    return time.toLocaleDateString("vi-VN");
  };
  const notifications = data?.notifications?.map(n => ({
    ...n,
    time: formatTime(n.time),
  })) || [];
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAsRead = async (_id) => {
    const url = API_BASE_URL + '/notification/read'
    await fetchAPI(url, 'PUT', {_id}, true);
    queryClient.invalidateQueries(['getnotifications']);
  };

  const deleteNotification = async (_id) => {
    const url = API_BASE_URL + '/notification/delete';
    await fetchAPI(url, 'DELETE', { _id }, true);
    queryClient.invalidateQueries(['getnotifications']);
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
          </div>

          <div className="overflow-y-auto max-h-[360px]">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`flex gap-3 px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors relative ${
                    !notif.read ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => markAsRead(notif._id)}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{notif.title}</h4>
                    <p className="text-[0.8125rem] text-gray-500 leading-snug mb-1">{notif.message}</p>
                    <span className="text-xs text-gray-400">{notif.time}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notif._id);
                    }}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                  {!notif.read && (
                    <div className="absolute top-1/2 right-7 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
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
