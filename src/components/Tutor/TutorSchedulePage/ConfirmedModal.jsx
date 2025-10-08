import { X, XCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";
import CancelWarning from "./CancelWarning";
import { useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/fetchAPI";
export default function ConfirmedModal({ slot, day, date, onClose }) {
  const queryClient = useQueryClient();
  const [reason, setReason] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [warning, setWarning] = useState(false);
  const [superWarning, setSuperWarning] = useState(false);
  const [end, setEnd] = useState(false);
  function handleCancel(){
    const today = new Date();
    const formated = today.toLocaleDateString("vi-VN",{
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
    })
    if(formated === date){
      const startTime = slot.time.split(' - ')[0];
      const [hours, minutes] = startTime.split(":").map(Number);
      const startDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
      const minute = (startDateTime - today)/1000/60;
      if(minute<=0) {
        setSuperWarning(true);
        return;
      }
      if(minute <= 60) setWarning(true);
      else setShowForm(true);
    }
    else setShowForm(true);
  }
  async function handleFinalCancel(){
    const content = {status:'cancelled', slotId: slot.id, reason};
    const url = 'http://localhost:5000/tutor/response';
    await fetchAPI(url, 'PUT', content, true);
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

        <h3 className="text-lg font-semibold text-slate-800 mb-3">Lịch đã xác nhận</h3>
        <div className="mb-4 bg-gray-50 p-3 rounded-md border border-gray-100">
          <p className="text-sm"><strong>Học viên:</strong> {slot.studentName}</p>
          <p className="text-sm"><strong>Tên buổi học:</strong> {slot.title}</p>
          <p className="text-sm mt-2"><strong>Thời gian:</strong> {day}, {date} — {slot.time}</p>
        </div>

        {!showForm ? (
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-slate-700 rounded-md hover:bg-gray-200"
            >
              Đóng
            </button>
            <button
              onClick={() => handleCancel()}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
            >
              <XCircle size={18} /> Hủy lịch
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              className="w-full p-2 border rounded-md text-sm"
              placeholder="Nhập lý do hủy..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-md">Đóng</button>
              <button
                onClick={() => handleFinalCancel()}
                disabled={!reason}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-300"
              >
                Gửi hủy lịch
              </button>
            </div>
          </div>
        )}
        {warning && <CancelWarning info={slot} onClose={onClose} setWarning={setWarning}/>}
        {superWarning && <WarningModal phone={slot.studentPhone} onClose={()=>setSuperWarning(false)}/>}
        {end && <SessionEndedModal onClose={()=>setEnd(false)}/>}
      </div>
    </div>
  );
}

function WarningModal({ onClose, phone }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-900/40 backdrop-blur-sm">
      <div className="bg-white border-4 border-red-600 rounded-2xl p-8 max-w-md w-[90%] shadow-2xl text-center animate-pulse-slow relative">
        <div className="flex justify-center mb-5">
          <div className="animate-pulse-glow">
            <AlertTriangle size={80} className="text-red-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-red-700 mb-3 uppercase">
          Buổi học đang diễn ra
        </h2>
        <p className="text-gray-700 text-lg font-medium mb-6">
          Vui lòng liên hệ học viên: <strong>{phone}</strong>
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold shadow-md"
        >
          Đã Hiểu
        </button>
      </div>
      <style>{`
        @keyframes glow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
        .animate-pulse-glow {
          animation: glow 1.2s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}

