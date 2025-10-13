import { useState } from "react";
import { X, XCircle, CheckCircle, Link } from "lucide-react";
import { fetchAPI } from "../../../utils/fetchAPI";
import { useQueryClient } from "@tanstack/react-query";

export default function RequestModal({ slot, day, date, onClose}) {
  const queryClient = useQueryClient()
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [step, setStep] = useState("info");
  const [method, setMethod] = useState("online");
  const [detail, setDetail] = useState("");

  async function handleFinalAccept(){
    if (!detail.trim()) {
      return alert(
        method === "offline" ? "Vui lòng nhập địa điểm học!" : "Vui lòng nhập liên kết cuộc họp!"
      );
    }
    const content = {status:'accepted', slotId: slot.slotId, type: method, detail};
    const url = 'http://localhost:5000/tutor/response';
    await fetchAPI(url, 'PUT', content, true);
    queryClient.invalidateQueries(['schedule']);
    onClose();
  };
  async function handleDecline(){
    if (!declineReason.trim()) return alert("Vui lòng nhập lý do từ chối!");
    const content = {reason: declineReason, slotId: slot.slotId};
    const url = 'http://localhost:5000/tutor/decline';
    await fetchAPI(url, 'DELETE', content, true);
    queryClient.invalidateQueries(['schedule']);
    onClose();
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 max-w-md w-[92%] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={22} />
        </button>

        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          {step === "info" ? "Yêu cầu đặt lịch" : "Chọn hình thức học"}
        </h3>
        {step === "info" && (
          <>
            <div className="mb-4 bg-gray-50 p-3 rounded-md border border-gray-100">
              <p className="text-sm"><strong>Học viên:</strong> {slot.studentName}</p>
              <p className="text-sm"><strong>Tên buổi học:</strong> {slot.title}</p>
              <p className="text-sm mt-2"><strong>Thời gian:</strong> {day}, {date} — {slot.time}</p>
            </div>
            {showDeclineForm && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Lý do từ chối:
                </label>
                <textarea
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  rows={3}
                  className="w-full border rounded-md p-2 text-sm focus:ring focus:ring-red-200"
                  placeholder="Nhập lý do từ chối..."
                ></textarea>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-9 py-2 rounded-md bg-gray-100 text-slate-700 hover:bg-gray-200"
              >
                Đóng
              </button>

              {!showDeclineForm ? (
                <button
                  onClick={() => setShowDeclineForm(true)}
                  className="px-4 py-2 rounded-md bg-red-400 text-white hover:bg-red-500 flex items-center gap-2"
                >
                  <XCircle size={18} /> Từ chối
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleDecline();
                  }}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
                >
                  <XCircle size={18} /> Xác nhận từ chối
                </button>
              )}

              <button
                onClick={() => setStep("chooseMethod")}
                className="px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 flex items-center gap-2"
              >
                <CheckCircle size={18} /> Chấp nhận
              </button>
            </div>
          </>
        )}
        {step === "chooseMethod" && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Hình thức học
              </label>
              <div className="flex gap-4">
                <button
                  className={`px-4 py-2 rounded-lg border transition ${
                    method === "online"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-slate-700 border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setMethod("online")}
                >
                  Học online
                </button>
                <button
                  className={`px-4 py-2 rounded-lg border transition ${
                    method === "offline"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-slate-700 border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setMethod("offline")}
                >
                  Học offline
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {method === "offline" ? "Địa điểm học" : "Liên kết cuộc họp"}
              </label>

              <input
                type="text"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder={
                  method === "offline"
                    ? "Nhập địa điểm học"
                    : "Nhập liên kết Zoom/Google Meet"
                }
                className="w-full border rounded-md p-2 text-sm focus:ring focus:ring-blue-200"
              />
              {method === "online" && (
                <div className="mt-2">
                  <a
                    href="https://meet.google.com/landing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm flex items-center gap-1"
                  >
                    <Link/> Tạo link Google Meet
                  </a>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setStep("info")}
                className="px-4 py-2 rounded-md bg-gray-100 text-slate-700 hover:bg-gray-200"
              >
                Quay lại
              </button>
              <button
                onClick={handleFinalAccept}
                className="px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 flex items-center gap-2"
              >
                <CheckCircle size={18} /> Xác nhận
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
