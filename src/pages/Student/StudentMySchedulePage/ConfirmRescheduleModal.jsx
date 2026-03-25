import { X } from "lucide-react";
import { useCancelBeforeAccept } from "../../../features/schedule/hooks/useCancelBeforeAccept";

export default function ConfirmRescheduleModal({ appointment, open, timeSlot, onClose }) {
  if (!open || !timeSlot) return null;
  const currentTime = appointment.slotId;
  const { slotId } = timeSlot;
  const {mutate} = useCancelBeforeAccept(appointment);
  async function handleConfirm(){
    mutate({
      onSuccess: onClose
    })
  }
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-[90%] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Xác nhận đổi lịch
        </h2>

        <p className="text-gray-700 mb-6">
          Bạn có chắc muốn đổi lịch từ <strong>{currentTime}</strong> sang <strong>{slotId}</strong>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Hủy
          </button>

          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
