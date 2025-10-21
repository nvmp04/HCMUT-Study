import { X } from "lucide-react";

export default function ReportModal({ onOpen, onClose, reports }) {
  if (!onOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl border border-blue-200 w-full max-w-2xl shadow-lg animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-blue-100">
          <h2 className="text-lg font-semibold text-slate-800">
            Biên bản buổi học
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 transition text-xl leading-none"
          >
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
          {reports && reports.length > 0 ? (
            reports.map((report, index) => (
              <div
                key={index}
                className="space-y-5 text-slate-700"
              >
                {/* Thông tin buổi học */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-slate-700">
                    <p>
                        <span className="font-medium">Thời gian:</span>{" "}
                        {report.slotId}
                    </p>
                </div>

                {/* Tình trạng tham gia */}
                <div>
                  <p className="font-medium text-slate-800">
                    Tình trạng tham gia:
                  </p>
                  <p className="mt-1">
                    {report.attendance === "present"
                      ? "Có mặt"
                      : report.attendance === "late"
                      ? "Đến trễ"
                      : "Vắng mặt"}
                  </p>
                </div>

                {/* Tóm tắt nội dung buổi học */}
                <div>
                  <p className="font-medium text-slate-800">
                    Tóm tắt nội dung buổi học:
                  </p>
                  <p className="mt-1 whitespace-pre-line">
                    {report.summary || "Không có nội dung"}
                  </p>
                </div>

                {/* Nhận xét */}
                <div>
                  <p className="font-medium text-slate-800">Nhận xét từ giảng viên:</p>
                  <p className="mt-1 whitespace-pre-line">
                    {report.notes || "Không có nhận xét"}
                  </p>
                </div>

                {/* Divider nếu có nhiều reports */}
                {index < reports.length - 1 && (
                  <div className="border-t border-blue-100 pt-4"></div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-slate-500 py-8 italic">
              Chưa có biên bản buổi học
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-blue-100 px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}