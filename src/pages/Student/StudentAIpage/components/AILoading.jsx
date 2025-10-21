import { Brain, Loader, CheckCircle } from "lucide-react"

export default function AILoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Brain className="w-12 h-12 text-blue-600 animate-spin-slow" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Loader className="w-5 h-5 text-blue-600 animate-spin" />
          <h3 className="text-2xl font-bold text-gray-900">AI đang phân tích...</h3>
        </div>

        <p className="text-gray-600 mb-8">
          Đang tạo lộ trình học tập tối ưu cho bạn. Vui lòng chờ trong giây lát.
        </p>

        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Phân tích thông tin cá nhân
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Xây dựng lộ trình học tập
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <Loader className="w-5 h-5 text-blue-600 animate-spin" />
            Tìm kiếm gia sư phù hợp...
          </div>
        </div>
      </div>

      {/* CSS tùy chỉnh nhỏ cho hiệu ứng quay chậm */}
      <style>
        {`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 6s linear infinite;
          }
        `}
      </style>
    </div>
  )
}
