import { Clock } from "lucide-react";

export default function SlotButton({ slot, onClick }) {
  const slotClassByStatus = (status) => {
    if (status === "accepted") return "bg-emerald-500 border-emerald-500 text-white";
    if (status === "pending") return "bg-red-100 border-red-300 text-red-700";
    return "bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-400";
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 min-h-[60px] p-2 border-2 rounded-lg text-sm font-medium transition-all ${slotClassByStatus(
        slot.status
      )}`}
    >
      <div className="flex items-center gap-1">
        <Clock size={14} />
        <span className="text-xs">{slot.time}</span>
      </div>

      <div className="text-[11px] mt-1">
        {slot.status === "available" && <span>Trống</span>}
        {slot.status === "pending" && <span>Yêu cầu mới</span>}
        {slot.status === "accepted" && <span>Đã xác nhận</span>}
      </div>
    </button>
  );
}
