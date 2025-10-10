import {CheckCircle} from 'lucide-react'
export function EndModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-[90%] text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle size={64} className="text-emerald-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Buổi học đã kết thúc
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Cảm ơn bạn đã tham gia buổi học hôm nay. Hãy phản hồi nếu có bất kỳ thắc mắc nào.
        </p>
        <button
          onClick={onClose}
          className="px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-medium"
        >
          Đã hiểu
        </button>
      </div>
    </div>
  );
}