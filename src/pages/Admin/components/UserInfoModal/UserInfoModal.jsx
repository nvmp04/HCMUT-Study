import { useState } from "react";
import { Mail, Phone, Hash, Bell, XCircle, X, Ban } from "lucide-react";
import { fetchAPI } from "../../../../utils/fetchAPI";
import { ConfirmBanModal } from "./ConfirmBanModal";
import { ConfirmUnbanModal } from "./ConfirmUnbanModal";
import ReportList from "./ReportList";
import { API_BASE_URL } from "../../../../config/api.config";

export default function UserInfoModal({
  role,
  selectedUser,
  setSelectedUser,
  unsuccessfulSchedules,
}) {
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("");
  const [showConfirmBan, setShowConfirmBan] = useState(false);
  const [showConfirmUnban, setShowConfirmUnban] = useState(false);

  if (!selectedUser) return null;

  // Gửi thông báo
  const handleSendNotification = async () => {
    if (notification.trim()) {
      const url = API_BASE_URL + "/admin/sendnotification";
      await fetchAPI(url, "POST", { id: selectedUser.id, notification }, true);
      alert(`Đã gửi thông báo đến ${selectedUser.name}:\n"${notification}"`);
      setNotification("");
      setShowNotification(false);
    }
  };

  const title = role === "tutor" ? "Thông tin Giảng viên" : "Thông tin Sinh viên";
  const idLabel = role === "tutor" ? "Mã cán bộ" : "Mã sinh viên";
  const hasDecline = role === "tutor";

  return (
    <>
      {/* --- MODAL CHÍNH --- */}
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        onClick={() => setSelectedUser(null)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fadeIn border border-blue-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-blue-50 text-slate-800 px-6 py-4 flex justify-between items-center rounded-t-2xl shadow-sm border-b border-blue-100">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              {title}
            </h2>
            <button
              onClick={() => setSelectedUser(null)}
              className="text-slate-600 hover:bg-blue-100 rounded-full p-1.5 transition"
            >
              ×
            </button>
          </div>

          {/* Nội dung */}
          <div className="p-6 space-y-6 text-slate-700 bg-gradient-to-br from-white via-blue-50 to-blue-100/20">
            {/* Thông tin chung */}
            <div className="border-b border-blue-100 pb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                {selectedUser.name}
                {selectedUser.banned && (
                  <span className="ml-2 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                    Đã bị cấm
                  </span>
                )}
              </h3>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>{selectedUser.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span>{selectedUser.phone}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Hash className="w-5 h-5 text-blue-500" />
                  <span>
                    {idLabel}: {selectedUser.id || "Chưa cập nhật"}
                  </span>
                </div>
              </div>
            </div>

            {/* Gửi thông báo */}
            <div>
              <button
                onClick={() => setShowNotification(!showNotification)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium shadow-sm"
              >
                <Bell className="w-5 h-5" />
                Gửi thông báo
              </button>

              {showNotification && (
                <div className="p-4 mt-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nội dung thông báo
                  </label>
                  <textarea
                    value={notification}
                    onChange={(e) => setNotification(e.target.value)}
                    rows="3"
                    placeholder="Nhập nội dung thông báo..."
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-700 mb-2 transition"
                  />
                  <button
                    onClick={handleSendNotification}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                  >
                    Gửi
                  </button>
                </div>
              )}
            </div>
            {/* Danh sách biên bản buổi học (chỉ student có) */}
            {role === "student" && <ReportList id={selectedUser.id}/>}

            {/* Lịch sử hủy lịch */}
            <div>
              <h5 className="font-medium text-orange-700 mb-2 flex items-center gap-1">
                <XCircle className="w-4 h-4" /> Lịch sử hủy lịch tuần này
              </h5>
              {unsuccessfulSchedules[selectedUser.id]?.cancelSchedule?.length ? (
                <div className="flex flex-wrap gap-2">
                  {unsuccessfulSchedules[selectedUser.id].cancelSchedule.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => alert(`Ngày: ${item.date}\nNội dung: ${item.reason}`)}
                      className="px-3 py-2 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl text-sm hover:bg-orange-100 transition"
                    >
                      <span className="font-medium">{item.date}</span> —{" "}
                      {item.reason.length > 25 ? item.reason.slice(0, 25) + "..." : item.reason}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic ml-1">Không có lịch sử hủy lịch</p>
              )}
            </div>

            {/* Lịch sử từ chối lịch (chỉ tutor) */}
            {hasDecline && (
              <div>
                <h5 className="font-medium text-red-700 mb-2 flex items-center gap-1">
                  <X className="w-4 h-4" /> Lịch sử từ chối lịch tuần này
                </h5>
                {unsuccessfulSchedules[selectedUser.id]?.declineSchedule?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {unsuccessfulSchedules[selectedUser.id].declineSchedule.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => alert(`Ngày: ${item.date}\nNội dung: ${item.reason}`)}
                        className="px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm hover:bg-red-100 transition"
                      >
                        <span className="font-medium">{item.date}</span> —{" "}
                        {item.reason.length > 25 ? item.reason.slice(0, 25) + "..." : item.reason}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic ml-1">Không có lịch sử từ chối lịch</p>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-blue-100 px-6 py-4 bg-blue-50 rounded-b-2xl">
            {!selectedUser.banned ? (
              <button
                onClick={() => setShowConfirmBan(true)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
              >
                Cấm tài khoản
              </button>
            ) : (
              <button
                onClick={()=>setShowConfirmUnban(true)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
              >
                 Gỡ cấm tài khoản
              </button>
            )}

            <button
              onClick={() => setSelectedUser(null)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL XÁC NHẬN CẤM --- */}
      <ConfirmBanModal 
        onOpen={showConfirmBan}
        selectedUser={selectedUser}
        setShowConfirmBan={setShowConfirmBan}
        onClose={()=>{
          setShowConfirmBan(false);
          setSelectedUser(null);
        }}
      />
      <ConfirmUnbanModal
        selectedUser={selectedUser}
        onOpen={showConfirmUnban}
        onClose={()=>{
          setSelectedUser(null);
          setShowConfirmUnban(null);
        }}
      />
    </>
  );
}
