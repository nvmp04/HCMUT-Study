import { useState } from "react";

function ScheduleConflictModal({open, slotId, name, title, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]">
      <div className="bg-white border-2 border-red-500 rounded-2xl p-6 w-[90%] max-w-[380px] text-center shadow-lg">
        <h3 className="text-xl font-semibold text-red-600 mb-4">Thông báo</h3>
        <p className="text-gray-700">
          Trùng lịch học{" "}
          <strong className="text-gray-900">{title}</strong> với{" "}
          <strong className="text-gray-900">{name}</strong> vào{" "}
          <strong className="text-gray-900">{slotId}</strong>.
        </p>
        <div className="mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleConflictModal;
