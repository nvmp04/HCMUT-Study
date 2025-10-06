import React, { useState } from "react";

export default function RescheduleModal({ open, session, onClose, onSubmit }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (date && time) {
      onSubmit({ ...session, newDate: date, newTime: time });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Đổi lịch buổi học
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Chọn ngày và giờ mới cho buổi học{" "}
          <span className="font-medium text-slate-800">
            {session?.subject}
          </span>
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Ngày mới
          </label>
          <input
            type="date"
            className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Giờ mới
          </label>
          <input
            type="time"
            className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={!date || !time}
            className={`px-4 py-2 rounded-md text-sm text-white ${
              date && time
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Xác nhận đổi
          </button>
        </div>
      </div>
    </div>
  );
}
