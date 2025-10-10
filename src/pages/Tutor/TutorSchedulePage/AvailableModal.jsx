import { X } from "lucide-react";

export default function AvailableModal({ slot, day, date, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-[92%] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={22} />
        </button>

        <h3 className="text-lg font-semibold text-slate-800 mb-3">Khung rảnh</h3>
        <div className="mb-4 text-sm text-slate-600">
          Khung: <strong>{slot.time}</strong> — {day}, {date}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-100 text-slate-700 hover:bg-gray-200"
          >
            Đóng
          </button>

          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Xóa khung rảnh
          </button>
        </div>
      </div>
    </div>
  );
}
