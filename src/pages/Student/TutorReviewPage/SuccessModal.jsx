function SuccessModal({ tutor, timeSlot, onClose}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-[400px] w-[90%] text-center shadow-lg">
        <h3 className="text-xl font-semibold text-green-600 mb-4">
          Đặt lịch thành công!
        </h3>
        <p className="text-gray-600 mb-6">
          Bạn đã đặt lịch với{" "}
          <strong className="text-gray-900">{tutor?.name}</strong>
          <br />
          Vào lúc:{" "}
          <strong className="text-gray-900">
            {timeSlot?.day}, {timeSlot?.date} - {timeSlot?.time}
          </strong>
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
