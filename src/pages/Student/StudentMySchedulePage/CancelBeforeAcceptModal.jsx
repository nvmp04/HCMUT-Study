import React from "react";
import { fetchAPI } from "../../../utils/fetchAPI";
import { useQueryClient } from "@tanstack/react-query";

export default function CancelBeforeAcceptModal({ slot, open, onClose }) {
  const queryClient = useQueryClient();

  if (!open) return null;

  async function handleSubmit() {
    const content = { _id: slot._id, slotId: slot.slotId };
    const url = "http://localhost:5000/student/cancelbeforeaccept";
    await fetchAPI(url, "DELETE", content, true);
    queryClient.invalidateQueries(["studentschedule"]);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Hủy buổi học
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          Bạn có chắc chắn muốn hủy buổi học{' '}
          <span className="font-medium text-slate-800">{slot.title}</span>?
          (Hành động này không thể hoàn tác)
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200 transition"
          >
            Đóng
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md text-sm text-white bg-red-500 hover:bg-red-600 transition"
          >
            Xác nhận hủy
          </button>
        </div>
      </div>
    </div>
  );
}
