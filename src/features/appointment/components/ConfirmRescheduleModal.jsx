import { X, Loader2, CalendarClock } from "lucide-react";
import { useReschedule } from "../../schedule/hooks/useReschedule";
import toast from "react-hot-toast";

export default function ConfirmRescheduleModal({ appointment, timeSlot, onClose }) {
  const { mutate, isPending } = useReschedule();

  if (!timeSlot) return null;

  const handleConfirm = () => {
    const toastId = toast.loading("Đang xử lý đổi lịch...");

    mutate(
      { appointment, timeSlot },
      {
        onSuccess: (result) => {
          if (result?.success) {
            toast.success(result.message || "Đổi lịch thành công!", {
              id: toastId,
              duration: 3000,
            });
            onClose();
          } else {
            toast.error(
              result?.message || "Khung giờ này không còn trống, vui lòng chọn giờ khác!",
              { id: toastId, duration: 4000 }
            );
          }
        },
        onError: (error) => {
          let errorMessage = "Lỗi kết nối server. Vui lòng thử lại sau!";

          if (error?.message) {
            const match = error.message.match(/\d{3} - (.+)$/);
            if (match) {
              try {
                const parsed = JSON.parse(match[1]);
                errorMessage = parsed.error || parsed.message || errorMessage;
              } catch {
                errorMessage = match[1];
              }
            }
          }

          toast.error(errorMessage, { id: toastId, duration: 4000 });
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          disabled={isPending}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 disabled:opacity-20 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4">
            <CalendarClock size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Xác nhận đổi lịch</h2>
          <p className="text-sm text-gray-500 mb-6">
            Bạn muốn đổi sang lúc{" "}
            <span className="font-semibold text-blue-600">{timeSlot.time}</span> ngày{" "}
            <span className="font-semibold text-blue-600">{timeSlot.date}</span>?
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            type="button"
            disabled={isPending}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Để sau
          </button>
          <button
            onClick={handleConfirm}
            type="button"
            disabled={isPending}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:bg-blue-300"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Đang xử lý</span>
              </>
            ) : (
              "Xác nhận"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}