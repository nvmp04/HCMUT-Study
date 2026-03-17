import { Loader2 } from "lucide-react";

export default function AIcheckingModal({type}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[360px] shadow-2xl text-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <h3 className="text-lg font-semibold text-gray-800">
            AI đang kiểm tra {type} hợp lệ...
          </h3>
          <p className="text-sm text-gray-500">
            Vui lòng chờ trong giây lát, hệ thống đang phân tích dữ liệu.
          </p>
        </div>
      </div>
    </div>
  );
}
