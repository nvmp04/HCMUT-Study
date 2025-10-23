export default function AIwarningModal({ title, content, onClose, success = false }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-[400px] w-[90%] text-center shadow-xl">
        <h3
          className={`text-lg font-semibold mb-3 ${
            success ? "text-gray-800" : "text-red-600"
          }`}
        >
          {title}
        </h3>

        <p className="text-sm text-gray-600 mb-4">{content}</p>

        <button
          onClick={onClose}
          className="px-4 py-2 mt-2 text-white rounded-lg transition bg-blue-600 hover:bg-blue-700"
        >
          {success ? "OK" : "Quay lại"}
        </button>
      </div>
    </div>
  );
}
