export default function ExpiredTimeModal({onClose}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-[400px] w-[90%] text-center shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Thời gian đã trôi qua
        </h3>

        <p className="text-gray-600 mb-6">
          Buổi học này đã <strong>quá thời gian bắt đầu</strong>.  
          Vui lòng chọn một khung giờ khác phù hợp hơn.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}