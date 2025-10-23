import { useState } from "react";
import { X, XCircle, CheckCircle, Link } from "lucide-react";
import { fetchAPI } from "../../../utils/fetchAPI";
import { useQueryClient } from "@tanstack/react-query";
import AIcheckingModal from "../../../components/AIchekingModal";
import AIwarningModal from "../../../components/AIwarningModal";
import { checkTutorReason } from "../../../services/AIcheck";

export default function RequestModal({ slot, day, date, onClose }) {
  if(!slot) return null;
  const queryClient = useQueryClient();
  const [step, setStep] = useState("info");
  const [method, setMethod] = useState("online");
  const [detail, setDetail] = useState("");
  const [declineReason, setDeclineReason] = useState("");
  const [modalType, setModalType] = useState("main");
  const [warningMessage, setWarningMessage] = useState("");
  const [ban, setBan] = useState(false);

  async function handleFinalAccept() {
    if (!detail.trim()) {
      return alert(
        method === "offline"
          ? "Vui lòng nhập địa điểm học!"
          : "Vui lòng nhập liên kết cuộc họp!"
      );
    }
    const content = { _id: slot._id, slotId: slot.slotId, type: method, detail };
    const url = "http://localhost:5000/tutor/response";
    await fetchAPI(url, "PUT", content, true);
    queryClient.invalidateQueries(["schedule"]);
    onClose();
  }

  async function handleDecline() {
    if (!declineReason.trim()) return alert("Vui lòng nhập lý do từ chối!");

    // Bắt đầu kiểm tra AI
    setModalType("checking");
    try {
      const res = await checkTutorReason(declineReason);
      const { error, message, ban } = res;

      if (error === "true" || error === true) {
        setWarningMessage(message);
        setBan(ban === "true" || ban === true);
        setModalType("error");
        return;
      }

      // Nếu hợp lệ 
      setModalType('successDecline');
      const content = {
        _id: slot._id,
        reason: declineReason,
        slotId: slot.slotId,
      };
      const url = "http://localhost:5000/tutor/decline";
      await fetchAPI(url, "DELETE", content, true);
      queryClient.invalidateQueries(["schedule"]);
    } catch (err) {
      console.error("Decline failed:", err);
      setWarningMessage("Lỗi hệ thống khi xử lý yêu cầu từ chối.");
      setModalType("error");
    }
  }

  // Nếu đang ở modal checking / error
  if (modalType === "checking") return <AIcheckingModal type="lý do từ chối" />;
  if (modalType === "error"){
    return (
      <AIwarningModal
        title={ban ? "Cảnh báo" : "Lý do không hợp lệ"}
        content={warningMessage}
        onClose={() => {
          setModalType("main");
          if (!ban) setStep("decline");
        }}
      />
    );
  }
  if (modalType === "successDecline"){
    return(
      <AIwarningModal 
        title={"Đã từ chối lịch học thành công"}
        content={"Vui lòng xóa hoặc cập nhật thời gian rảnh nếu không thể nhận lịch trong khoảng thời gian này."}
        success={true}
        onClose={()=>onClose()}
    />)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 max-w-md w-[92%] relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={22} />
        </button>

        {step === "info" && (
          <>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Yêu cầu đặt lịch
            </h3>
            <div className="mb-4 bg-gray-50 p-3 rounded-md border border-gray-100">
              <p className="text-sm">
                <strong>Học viên:</strong> {slot.studentName}
              </p>
              <p className="text-sm">
                <strong>Tên buổi học:</strong> {slot.title}
              </p>
              <p className="text-sm mt-2">
                <strong>Thời gian:</strong> {day}, {date} — {slot.time}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-9 py-2 rounded-md bg-gray-100 text-slate-700 hover:bg-gray-200"
              >
                Đóng
              </button>

              <button
                onClick={() => setStep("decline")}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
              >
                <XCircle size={18} /> Từ chối
              </button>

              <button
                onClick={() => setStep("chooseMethod")}
                className="px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 flex items-center gap-2"
              >
                <CheckCircle size={18} /> Chấp nhận
              </button>
            </div>
          </>
        )}

        {step === "decline" && (
          <>
            <h3 className="text-lg font-semibold text-red-600 mb-3">
              Xác nhận từ chối yêu cầu
            </h3>
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

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setStep("info")}
                className="px-4 py-2 rounded-md bg-gray-100 text-slate-700 hover:bg-gray-200"
              >
                Quay lại
              </button>
              <button
                onClick={handleDecline}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
              >
                <XCircle size={18} /> Xác nhận từ chối
              </button>
            </div>
          </>
        )}

        {step === "chooseMethod" && (
          <>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Chọn hình thức học
            </h3>

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
                      <Link size={14} /> Tạo link Google Meet
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
          </>
        )}
      </div>
    </div>
  );
}
